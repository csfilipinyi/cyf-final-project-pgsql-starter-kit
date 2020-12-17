
drop table if exists user;
drop table if exists user_type;
drop table if exists attendance;
drop table if exists session;
drop table if exists class;
drop table if exists location;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NULL DEFAULT NULL,
    password VARCHAR(50) NULL  NULL,
    name VARCHAR(50) NULL  NULL ,
    user_type INT NOT NULL,
    class_id INT
);
CREATE TABLE user_type (
    id SERIAL PRIMARY KEY,
    type VARCHAR(30)

);
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    session_id INT NOT NULL
);

CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NULL  NULL,
    session_date DATE NOT NULL,
    class_id INT NOT NULL
);

CREATE TABLE class (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NULL  NULL,
    location_id INT NOT NULL
);
CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NULL  NULL
);

INSERT INTO users(email,password, name, user_type,class_id) VALUES ('guy.crawford@email.com','IwasBorn1965','Guy Crawford',1,1);
INSERT INTO users(email,password, name, user_type,class_id) VALUES ('jamal@email.com','IwasBorn1965','Jamal',2,2);
INSERT INTO users(email,password, name, user_type,class_id) VALUES ('sara2@email.com','IwasBorn1965','Sara',3,1);

INSERT INTO user_type(type) VALUES('Admin');
INSERT INTO user_type(type) VALUES('Teacher');
INSERT INTO user_type(type) VALUES('Student');

INSERT INTO attendance(user_id,session_id) VALUES(1,5);
INSERT INTO attendance(user_id,session_id) VALUES(2,3);
INSERT INTO attendance(user_id,session_id) VALUES(4,2);

INSERT INTO session(name,session_date,class_id) VALUES('JS','12/08/2020',2);
INSERT INTO session(name,session_date,class_id) VALUES('React','06/09/2020',3);
INSERT INTO session(name,session_date,class_id) VALUES('SQL','25/11/2020',2);

INSERT INTO class(name,location_id) VALUES('WestMidland',2);
INSERT INTO class(name,location_id) VALUES('London',1);
INSERT INTO class(name,location_id) VALUES('Manchester',3);


INSERT INTO location(name) VALUES('Manchester');
INSERT INTO location(name) VALUES('London');
INSERT INTO location(name) VALUES('WestMidland');

//class selection 
select users.name, user_type.type, location.name, class.name, session.name from users, user_type, location, class,session where user_type.id=users.user_type and location.id = class.location_id and class.id = session.class_id and users.id = 3;
