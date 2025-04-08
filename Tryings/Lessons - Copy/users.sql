use abdo;

INSERT INTO users (id, username, email, age) 
VALUES (1, 'Abdo', 'abdo@example.com', 30)
ON DUPLICATE KEY UPDATE username='Abdo', email='abdo@example.com', age=30;