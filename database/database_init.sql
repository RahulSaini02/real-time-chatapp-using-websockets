--Create database
CREATE DATABASE chatapp_db;

--create user
CREATE USER chatapp_admin WITH PASSWORD '*****'; -- password
CREATE USER chatapp_user WITH PASSWORD '*****'; -- password

-- create schema
CREATE SCHEMA chatapp AUTHORIZATION chatapp_admin;

--GRANTS
GRANT ALL PRIVILEGES ON DATABASE chatapp_db TO chatapp_admin;

--To Connect to database
GRANT CONNECT ON DATABASE chatapp_db TO chatapp_admin;
GRANT CONNECT ON DATABASE chatapp_db TO chatapp_user;

--Schema Usage
GRANT USAGE ON SCHEMA public TO chatapp_admin;
GRANT USAGE ON SCHEMA public TO chatapp_user;

--To access Tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO chatapp_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO chatapp_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA chatapp TO chatapp_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA chatapp TO chatapp_user;
