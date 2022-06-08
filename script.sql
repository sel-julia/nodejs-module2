CREATE TABLE IF NOT EXISTS "Users" (
    "id" UUID NOT NULL UNIQUE , 
    "login" VARCHAR(255) NOT NULL UNIQUE, 
    "password" VARCHAR(255) NOT NULL, 
    "age" INTEGER NOT NULL, 
    "isDeleted" BOOLEAN NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id")
);


INSERT INTO "Users" (id, login, password, age, "isDeleted", "createdAt", "updatedAt") VALUES       
('184634ba-df39-41c7-b6d2-49f36c8733df', 'login2', 'password 2', 129, true, '2022-06-08T20:18:33.403Z', '2022-06-08T20:18:33.403Z'),
('284634ba-df39-41c7-b6d2-49f36c8733df', 'login3', 'password 3', 1, true, '2022-06-08T20:18:33.403Z', '2022-06-08T20:18:33.403Z'),
('384634ba-df39-41c7-b6d2-49f36c8733df', 'login4', 'password 4', 9, true, '2022-06-08T20:18:33.403Z', '2022-06-08T20:18:33.403Z'),
('484634ba-df39-41c7-b6d2-49f36c8733df', 'login5', 'password 5', 29, true, '2022-06-08T20:18:33.403Z', '2022-06-08T20:18:33.403Z'),
('584634ba-df39-41c7-b6d2-49f36c8733df', 'login6', 'password 6', 29, true, '2022-06-08T20:18:33.403Z', '2022-06-08T20:18:33.403Z');