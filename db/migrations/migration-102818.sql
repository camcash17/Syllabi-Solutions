\c syllabi;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  middle VARCHAR(255),
  suffix VARCHAR(255),
  degree VARCHAR(255),
  university VARCHAR(255),
  college VARCHAR(255),
  department VARCHAR(255)
);