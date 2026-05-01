CREATE DATABASE Ayurveda;
USE Ayurveda;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, role)
VALUES (
'admin',
'$2b$10$/EATq2JNzPmPYFChVzqJvuUNkkn4DYq0M0DBttHvVXYEc4KDCivOe',
'admin'
);

SELECT * FROM users;