DROP DATABASE IF EXISTS photos;

CREATE DATABASE photos;

USE photos;

CREATE TABLE restaurants (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(55)
);

CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(40),
  friends int NOT NULL,
  elite boolean NOT NULL,
  reviews int NOT NULL,
  avatar varchar(80)
);

CREATE TABLE pictures (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url varchar(80) NOT NULL,
  postdate varchar(30),
  caption varchar(100),
  user int NOT NULL,
  restaurant int NOT NULL,
  FOREIGN KEY (user) REFERENCES users(user_id),
  FOREIGN KEY (restaurant) REFERENCES restaurants(id)
);
