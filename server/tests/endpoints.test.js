const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

beforeAll(async () => {
  // Run migrations and seed the database
  await queryInterface.sequelize.sync({ force: true });
  const seedData = require('../seeders/20250325042456-data');
  await seedData.up(queryInterface, sequelize);
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
    const token = '<VALID_TOKEN>'; // Replace with a valid token
    const response = await request(app).get('/users/all').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  test('GET /users/:id - should get a user by ID', async () => {
    const response = await request(app).get('/users/1').set('Authorization', 'Bearer <TOKEN>');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('PUT /users/:id/update - should update a user', async () => {
    const response = await request(app).put('/users/1/update').send({
      fullName: 'Updated User',
      email: 'updateduser@mail.com',
      password: 'newpassword123',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  test('DELETE /users/:id/delete - should delete a user', async () => {
    const response = await request(app).delete('/users/2/delete').set('Authorization', 'Bearer <TOKEN>');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 2);
  });
});

describe('Stations Endpoints', () => {
  test('GET /stations - should get all stations', async () => {
    const response = await request(app).get('/stations');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /stations - should create a new station', async () => {
    const response = await request(app).post('/stations').send({
      stationName: 'New Station',
      stationCode: 'NS',
      stationOperationalArea: 'DAOP9',
      stationRegion: 'New Region',
      stationClass: 1,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('stationCode', 'NS');
  });

  test('GET /stations/:stationCode - should get a station by code', async () => {
    const response = await request(app).get('/stations/NS');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('stationCode', 'NS');
  });

  test('PUT /stations/:stationCode - should update a station', async () => {
    const response = await request(app).put('/stations/NS').send({
      stationName: 'Updated Station',
      stationRegion: 'Updated Region',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Station updated');
  });

  test('DELETE /stations/:stationCode - should delete a station', async () => {
    const response = await request(app).delete('/stations/NS');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('stationCode', 'NS');
  });
});

describe('Trains Endpoints', () => {
  test('GET /trains - should get all trains', async () => {
    const response = await request(app).get('/trains');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /trains - should create a new train', async () => {
    const response = await request(app).post('/trains').send({
      trainNumber: '999',
      trainName: 'Test Train',
      from: 'SGU',
      to: 'KTG',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('trainNumber', '999');
  });

  test('GET /trains/:trainNumber - should get a train by number', async () => {
    const response = await request(app).get('/trains/999');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('trainNumber', '999');
  });

  test('PUT /trains/:trainNumber - should update a train', async () => {
    const response = await request(app).put('/trains/999').send({
      trainName: 'Updated Train',
      from: 'Updated From',
      to: 'Updated To',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Train updated');
  });

  test('DELETE /trains/:trainNumber - should delete a train', async () => {
    const response = await request(app).delete('/trains/999');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('trainNumber', '999');
  });
});

describe('Schedules Endpoints', () => {
  test('GET /schedules - should get all schedules', async () => {
    const response = await request(app).get('/schedules');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /schedules - should create a new schedule', async () => {
    const response = await request(app).post('/schedules').send({
      arrival: '10:00:00',
      departure: '10:30:00',
      isPassingOnly: false,
      isTerminus: false,
      stationId: 1,
      trainId: 1,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('schedule');
  });

  test('GET /schedules/:id - should get a schedule by ID', async () => {
    const response = await request(app).get('/schedules/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('PUT /schedules/:id - should update a schedule', async () => {
    const response = await request(app).put('/schedules/1').send({
      arrival: '11:00:00',
      departure: '11:30:00',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Schedule updated');
  });

  test('DELETE /schedules/:id - should delete a schedule', async () => {
    const response = await request(app).delete('/schedules/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('GET /schedules/train/:trainNumber - should get schedules by train', async () => {
    const response = await request(app).get('/schedules/train/999');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /schedules/station/:stationCode - should get schedules by station', async () => {
    const response = await request(app).get('/schedules/station/NS');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
