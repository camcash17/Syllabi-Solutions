const db = require('../db/config');

const User = {};

User.findAll = () => {
  return db.query(`SELECT * FROM users`);
};

User.findById = id => {
  return db.oneOrNone(
    `
    SELECT * FROM users
    WHERE id = $1
  `,
    [id]
  );
};

User.create = user => {
  return db.one(
    `
    INSERT INTO users
    (firstName, lastName, middle, suffix, degree, university, college, department)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `,
    [user.firstName, user.lastName, user.middle, user.suffix, user.degree, user.university, user.college, user.department]
  );
};

User.update = (user, id) => {
  return db.one(
    `
    UPDATE users SET
      firstName = $1,
      lastName = $2,
      middle = $3,
      suffix = $4,
      degree = $5,
      university = $6,
      college = $7,
      department = $8
    WHERE id = $9
    RETURNING *
  `,
    [user.firstName, user.lastName, user.middle, user.suffix, user.degree, user.university, user.college, user.department, id]
  );
};

User.destroy = id => {
  return db.none(
    `
    DELETE FROM users
    WHERE id = $1
  `,
    [id]
  );
};

module.exports = User;