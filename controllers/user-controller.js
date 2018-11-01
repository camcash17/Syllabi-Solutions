const User = require('../models/user');

const userController = {};

userController.index = (req, res) => {
  User.findAll()
    .then(user => {
      res.json({
        message: 'ok',
        data: user,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

userController.show = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json({
        message: 'ok',
        data: user,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

userController.create = (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middle: req.body.middle,
    suffix: req.body.suffix,
    degree: req.body.degree,
    university: req.body.university,
    college: req.body.college,
    department: req.body.department
  })
    .then(user => {
      res.json({
        message: 'ok',
        data: user,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

userController.update = (req, res) => {
  User.update(
    {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middle: req.body.middle,
        suffix: req.body.suffix,
        degree: req.body.degree,
        university: req.body.university,
        college: req.body.college,
        department: req.body.department
    },
    req.params.id,
  )
    .then(user => {
      res.json({
        message: 'ok',
        data: user,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

userController.destroy = (req, res) => {
  User.destroy(req.params.id)
    .then(user => {
      res.json({
        message: 'ok',
        data: user,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

module.exports = userController;