const errorhandler = (err, req, res, next) => {
  console.log(err, '<<<<<<<<<<<<<<<<<< ERROR HANDLER');
  if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
    const msg = err.errors[0].message;
    return res.status(400).json({ message: msg });
  }
  if (err.name === 'bad request') {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === 'unauthorized') {
    return res.status(401).json({ message: err.message });
  }
  if (err.name === 'forbidden') {
    return res.status(403).json({ message: err.message });
  }
  if (err.name === 'not found') {
    return res.status(404).json({ message: err.message });
  }
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ message: 'Database error' });
  }
  if (err.name === 'Error') {
    return res.status(500).json({ message: err.message });
  }
  if (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  next();
};

module.exports = errorhandler;
