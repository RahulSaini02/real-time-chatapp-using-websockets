--Create database
CREATE DATABASE chatapp_db;

--create user
CREATE USER chatapp_admin WITH PASSWORD '*****';

-- password
CREATE USER chatapp_user WITH PASSWORD '*****';

--GRANTS
GRANT ALL PRIVILEGES ON DATABASE chatapp_db TO chatapp_admin;