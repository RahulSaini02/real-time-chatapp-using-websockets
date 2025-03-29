-- create schema
-- run inside chatapp_db
CREATE SCHEMA chatapp AUTHORIZATION chatapp_admin;

--To Connect to database
GRANT CONNECT ON DATABASE chatapp_db TO chatapp_admin;

GRANT CONNECT ON DATABASE chatapp_db TO chatapp_user;


