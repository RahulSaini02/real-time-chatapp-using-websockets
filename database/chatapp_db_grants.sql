--Schema Usage
GRANT USAGE ON SCHEMA public TO chatapp_admin;

GRANT USAGE ON SCHEMA public TO chatapp_user;

GRANT USAGE ON SCHEMA chatapp TO chatapp_admin;

GRANT USAGE ON SCHEMA chatapp TO chatapp_user;

--To access Tables
GRANT
SELECT
,
INSERT
,
UPDATE
,
  DELETE ON ALL TABLES IN SCHEMA public TO chatapp_admin;

GRANT
SELECT
,
INSERT
,
UPDATE
,
  DELETE ON ALL TABLES IN SCHEMA public TO chatapp_user;

GRANT
SELECT
,
INSERT
,
UPDATE
,
  DELETE ON ALL TABLES IN SCHEMA chatapp TO chatapp_admin;

GRANT
SELECT
,
INSERT
,
UPDATE
,
  DELETE ON ALL TABLES IN SCHEMA chatapp TO chatapp_user;