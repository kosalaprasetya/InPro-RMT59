const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');

let validToken;
let createdScheduleId;

beforeAll(async () => {
  // Run migrations and seed the database
  await queryInterface.sequelize.sync({ force: true });
  const seedData = require('../seeders/20250325042456-data');
  await seedData.up(queryInterface, sequelize);

  // Generate a valid token for testing
  validToken = signToken({ id: 1, email: 'admin@mail.com' });
});

afterAll(async () => {
  // Clean up the database
  await queryInterface.dropAllTables();
  await sequelize.close();
});

describe('Users Endpoints', () => {
  test('POST /auth/register - should register a new user', async () => {
    const response = await request(app).post('/auth/register').send({
      fullName: 'Test User',
      email: 'testuser@mail.com',
      password: 'password123',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', 'testuser@mail.com');
  });

  test('POST /auth/login - should login a user', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'admin@mail.com',
      password: 'admin',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
  });

  test('GET /users/all - should get all users', async () => {
    const response = await request(app).get('/users/all').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /users/:id - should get a user by ID', async () => {
    const response = await request(app).get('/users/1').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('PUT /users/:id/update - should update a user', async () => {
    const response = await request(app).put('/users/1/update').set('Authorization', `Bearer ${validToken}`).send({
      fullName: 'Updated User',
      email: 'updateduser@mail.com',
      password: 'newpassword123',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  test('DELETE /users/:id/delete - should delete a user', async () => {
    const response = await request(app).delete('/users/2/delete').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});

describe('Stations Endpoints', () => {
  test('GET /stations - should get all stations', async () => {
    const response = await request(app).get('/stations').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /stations - should create a new station', async () => {
    const response = await request(app)
      .post('/stations')
      .send({
        stationName: 'New Station',
        stationCode: 'NS',
        stationOperationalArea: 'DAOP9',
        stationRegion: 'New Region',
        stationClass: 1,
      })
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('stationCode', 'NS');
  });

  test('GET /stations/:stationCode - should get a station by code', async () => {
    const response = await request(app).get('/stations/NS').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('stationCode', 'NS');
  });

  test('PUT /stations/:stationCode - should update a station', async () => {
    const response = await request(app)
      .put('/stations/NS')
      .send({
        stationName: 'new station updated',
        stationCode: 'ns',
        stationOperationalArea: 'daop8',
        stationRegion: 'new region updated',
        stationClass: '1',
      })
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Station updated successfully');
  });

  test('DELETE /stations/:stationCode - should delete a station', async () => {
    const response = await request(app).delete('/stations/NS').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Station deleted successfully');
  });
});

describe('Trains Endpoints', () => {
  let trainNumber;

  test('GET /trains - should get all trains', async () => {
    const response = await request(app).get('/trains').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /trains - should create a new train', async () => {
    const response = await request(app)
      .post('/trains')
      .send({
        trainNumber: '999',
        trainName: 'Test Train',
        from: 'SGU',
        to: 'KTG',
      })
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('trainNumber', '999');
    trainNumber = response.body.trainNumber;
  });

  test('GET /trains/:trainNumber - should get a train by number', async () => {
    const response = await request(app).get(`/trains/${trainNumber}`).set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('trainNumber', trainNumber);
  });

  test('PUT /trains/:trainNumber - should update a train', async () => {
    const response = await request(app)
      .put(`/trains/${trainNumber}`)
      .send({
        trainName: 'Updated Train',
        trainNumber: `${trainNumber || 88}`,
        from: 'PSE',
        to: 'SMC',
      })
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Train updated successfully');
  });

  test('DELETE /trains/:trainNumber - should delete a train', async () => {
    const response = await request(app).delete(`/trains/${trainNumber}`).set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Train deleted successfully');
  });
});

describe('Schedules Endpoints', () => {
  // Create a train and station for schedule tests
  let testTrainId, testStationId;

  beforeAll(async () => {
    // Create a test train
    const trainResponse = await request(app)
      .post('/trains')
      .send({
        trainNumber: '888',
        trainName: 'Schedule Test Train',
        from: 'Origin',
        to: 'Destination',
      })
      .set('Authorization', `Bearer ${validToken}`);
    testTrainId = trainResponse.body.id;

    // Create a test station
    const stationResponse = await request(app)
      .post('/stations')
      .send({
        stationName: 'Schedule Test Station',
        stationCode: 'STS',
        stationOperationalArea: 'DAOP1',
        stationRegion: 'Test Region',
        stationClass: 1,
      })
      .set('Authorization', `Bearer ${validToken}`);
    testStationId = stationResponse.body.id;
  });

  test('GET /schedules - should get all schedules', async () => {
    const response = await request(app).get('/schedules').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /schedules - should create a new schedule', async () => {
    const response = await request(app)
      .post('/schedules')
      .send({
        arrival: '10:00:00',
        departure: '10:30:00',
        isPassingOnly: false,
        isTerminus: false,
        stationId: testStationId || 1,
        trainId: testTrainId || 1,
      })
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('schedule');
    createdScheduleId = 1;
  });

  test('GET /schedules/:id - should get a schedule by ID', async () => {
    const response = await request(app)
      .get(`/schedules/${createdScheduleId || 1}`)
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('arrival');
  });

  // The following tests depend on the implementation of updateSchedule and deleteSchedule
  // which are not shown in the provided controller code
  test('PUT /schedules/:id - should update a schedule', async () => {
    const response = await request(app)
      .put(`/schedules/${createdScheduleId || 1}`)
      .send({
        arrival: '11:00:00',
        departure: '11:30:00',
        stationId: testStationId || 1,
        trainId: testTrainId || 1,
      })
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    // Adjust expectation based on actual implementation
    expect(response.body).toHaveProperty('message', 'Schedule updated successfully');
  });

  test('DELETE /schedules/:id - should delete a schedule', async () => {
    const response = await request(app)
      .delete(`/schedules/${createdScheduleId || 2}`)
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    // Adjust expectation based on actual implementation
    expect(response.body).toHaveProperty('message', 'Schedule deleted successfully');
  });

  // These tests might need to be adjusted based on actual implementation
  test('GET /schedules/train/:trainNumber - should get schedules by train', async () => {
    const response = await request(app).get('/schedules/train/888').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /schedules/station/:stationCode - should get schedules by station', async () => {
    const response = await request(app).get('/schedules/station/STS').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
