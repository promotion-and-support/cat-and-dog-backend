DROP DATABASE IF EXISTS cat_and_dog;
DROP USER IF EXISTS cat_and_dog;
CREATE USER cat_and_dog WITH PASSWORD 'cat_and_dog';
CREATE DATABASE cat_and_dog WITH
    OWNER = cat_and_dog
    TEMPLATE = template0
    LC_COLLATE = 'C'
    LC_CTYPE = 'C';
