-- the password hash is generated by BCrypt Calculator Generator(https://www.dailycred.com/article/bcrypt-calculator)
INSERT INTO user (id, username, password, firstname, lastname, calories) VALUES (1, 'user', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Angel', 'Colorado', 800);
INSERT INTO user (id, username, password, firstname, lastname, calories) VALUES (3, 'manager', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Ivan', 'Colorado', 750);
INSERT INTO user (id, username, password, firstname, lastname, calories) VALUES (2, 'admin', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Cristian', 'Colorado', 540);

INSERT INTO authority (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO authority (id, name) VALUES (2, 'ROLE_MANAGER');
INSERT INTO authority (id, name) VALUES (3, 'ROLE_ADMIN');

INSERT INTO user_authority (user_id, authority_id) VALUES (1, 1);
INSERT INTO user_authority (user_id, authority_id) VALUES (2, 3);
INSERT INTO user_authority (user_id, authority_id) VALUES (3, 2);


INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 1, 'Pasta', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 2, 'Pollo', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 3, 'Brocoli', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 4, 'Ensalada', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 5, 'Torta', 123, TO_DATE('17/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 6, 'Pizza', 123, TO_DATE('17/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 7, 'Subway Light', 123, TO_DATE('17/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 8, 'Atun', 123, TO_DATE('18/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 9, 'Arroz', 123, TO_DATE('18/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 10, 'Ensalada', 123, TO_DATE('18/09/2017', 'DD/MM/YYYY'));

INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 11, 'Pasta', 123, TO_DATE('19/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 12, 'Pollo', 123, TO_DATE('19/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 13, 'Brocoli', 123, TO_DATE('19/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 14, 'Ensalada', 123, TO_DATE('19/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 15, 'Torta', 123, TO_DATE('20/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 16, 'Pizza', 123, TO_DATE('20/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 17, 'Subway Light', 123, TO_DATE('20/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 18, 'Atun', 123, TO_DATE('20/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 19, 'Arroz', 123, TO_DATE('20/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 20, 'Ensalada', 123, TO_DATE('21/09/2017', 'DD/MM/YYYY'));


INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 21, 'Pasta', 123, TO_DATE('21/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 22, 'Pollo', 123, TO_DATE('21/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 23, 'Brocoli', 123, TO_DATE('21/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 24, 'Ensalada', 123, TO_DATE('22/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 25, 'Torta', 123, TO_DATE('22/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 26, 'Pizza', 123, TO_DATE('22/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 27, 'Subway Light', 123, TO_DATE('22/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 28, 'Atun', 123, TO_DATE('23/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 29, 'Arroz', 123, TO_DATE('23/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 30, 'Ensalada', 123, TO_DATE('23/09/2017', 'DD/MM/YYYY'));


INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 31, 'Pasta', 123, TO_DATE('24/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 32, 'Pollo', 123, TO_DATE('24/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 33, 'Brocoli', 123, TO_DATE('24/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 34, 'Ensalada', 123, TO_DATE('25/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 35, 'Torta', 123, TO_DATE('25/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 36, 'Pizza', 123, TO_DATE('25/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 37, 'Subway Light', 123, TO_DATE('25/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 38, 'Atun', 123, TO_DATE('26/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 39, 'Arroz', 123, TO_DATE('26/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (1, 40, 'Ensalada', 123, TO_DATE('27/09/2017', 'DD/MM/YYYY'));


INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 41, 'Pasta', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 42, 'Pollo', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 43, 'Brocoli', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 44, 'Ensalada', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 45, 'Torta', 123, TO_DATE('17/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 46, 'Pizza', 123, TO_DATE('17/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 47, 'Subway Light', 123, TO_DATE('17/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 48, 'Atun', 123, TO_DATE('18/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 49, 'Arroz', 123, TO_DATE('18/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (2, 50, 'Ensalada', 123, TO_DATE('18/09/2017', 'DD/MM/YYYY'));


INSERT INTO meal (user_id, id, name, calories, consumed_date) values (3, 51, 'Pasta', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (3, 52, 'Pollo', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (3, 53, 'Brocoli', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (3, 54, 'Ensalada', 123, TO_DATE('16/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (3, 55, 'Torta', 123, TO_DATE('17/09/2017', 'DD/MM/YYYY'));
INSERT INTO meal (user_id, id, name, calories, consumed_date) values (3, 56, 'Pizza', 123, TO_DATE('17/09/2017', 'DD/MM/YYYY'));
