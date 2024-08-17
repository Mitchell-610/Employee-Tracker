INSERT INTO department (department_name)
VALUES 
('Sales'),
('Engineering'),
('HR'),
('Marketing'),
('Finance');


-- Insert into role table
INSERT INTO role (title, salary, department_id)
VALUES 
('Sales Manager', 70000, 1),
('Software Engineer', 90000, 2),
('HR Specialist', 60000, 3), 
('Marketing Coordinator', 65000, 4),
('Financial Analyst', 70000, 5);  



-- Insert into employee table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),          
('Jane', 'Smith', 2, 1),          
('Bob', 'Johnson', 3, NULL),      
('Alice', 'Williams', 4, 1),       
('Charlie', 'Brown', 5, 2);        