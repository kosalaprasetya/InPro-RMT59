class Controller {
  static home(req, res) {
    res.status(200).json({ message: 'server is running, read the API docs for further references' });
  }
}

module.exports = Controller;
