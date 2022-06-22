CREATE TABLE IF NOT EXISTS "Users" (
    "id" UUID NOT NULL UNIQUE , 
    "login" VARCHAR(255) NOT NULL UNIQUE, 
    "password" VARCHAR(255) NOT NULL, 
    "age" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);


INSERT INTO "Users" (id, login, password, age) VALUES
('184634ba-df39-41c7-b6d2-49f36c8733df', 'login2', 'password 2', 129),
('284634ba-df39-41c7-b6d2-49f36c8733df', 'login3', 'password 3', 1),
('384634ba-df39-41c7-b6d2-49f36c8733df', 'login4', 'password 4', 9),
('484634ba-df39-41c7-b6d2-49f36c8733df', 'login5', 'password 5', 29),
('584634ba-df39-41c7-b6d2-49f36c8733df', 'login6', 'password 6', 29);

CREATE TYPE "public"."enum_Groups_permissions" AS ENUM(
    'READ', 
    'WRITE', 
    'DELETE', 
    'SHARE', 
    'UPLOAD_FILES'
);

CREATE TABLE IF NOT EXISTS "Groups" (
    "id" UUID NOT NULL UNIQUE , 
    "name" VARCHAR(255) NOT NULL, 
    "permissions" "public"."enum_Groups_permissions"[], 
    PRIMARY KEY ("id")
);

INSERT INTO "Groups" ("id","name","permissions") VALUES 
('5138b2f1-8a11-4fe3-ad89-b5b87a656e8a', 'first group', '{READ, WRITE}'),
('1138b2f1-8a11-4fe3-ad89-b5b87a656e1a', 'second group', '{DELETE, WRITE}');


CREATE TABLE IF NOT EXISTS "UserGroups" (
    "UserId" UUID  REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "GroupId" UUID  REFERENCES "Groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    PRIMARY KEY ("UserId","GroupId")
);

INSERT INTO "UserGroups" ("UserId","GroupId") VALUES 
('184634ba-df39-41c7-b6d2-49f36c8733df','5138b2f1-8a11-4fe3-ad89-b5b87a656e8a');

