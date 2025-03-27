class Controller {
  static home(req, res, next) {
    try {
      res.status(200).json({ message: 'server is running, read the API docs for further references' });
    } catch (error) {
      next(error); // Ensure error handling for unexpected scenarios
    }
  }
}

module.exports = Controller;
