CREATE TABLE PUBLIC.employees (
	ID SERIAL NOT NULL,
	status TEXT NOT NULL DEFAULT 'a',
	birth_date timestamptz NULL,
	first_name TEXT NULL,
	last_name TEXT NULL,
	gender TEXT NULL,
	hire_date timestamptz NULL,
	CONSTRAINT employees_pkey PRIMARY KEY ( ID ) 
);
CREATE TABLE PUBLIC.locations (
	ID SERIAL NOT NULL,
	address TEXT NULL,
	postal_code TEXT NULL,
	status TEXT NOT NULL DEFAULT 'a',
	city TEXT NOT NULL,
	country TEXT NOT NULL,
	CONSTRAINT locations_pkey PRIMARY KEY ( ID ) 
);
CREATE TABLE departments (
	ID SERIAL NOT NULL,-- in the form of department
	NAME TEXT NULL,
	status TEXT NOT NULL DEFAULT 'a',
	LOCATION INT NOT NULL,
	PRIMARY KEY ( ID ),-- Index built automatically
	FOREIGN KEY ( LOCATION ) REFERENCES locations ( ID ) ON DELETE CASCADE 
);
CREATE TABLE department_employee (
	employee INT NOT NULL,
	department INT NOT NULL,
	status TEXT NOT NULL DEFAULT 'a',
	from_date DATE NOT NULL,
	to_date DATE NOT NULL,
-- Build INDEX on this non-unique-value column
-- Build INDEX on this non-unique-value column
	FOREIGN KEY ( employee ) REFERENCES employees ( ID ) ON DELETE CASCADE,
-- Cascade DELETE from parent table 'employee' to this child table
-- If an emp_no is deleted from parent 'employee', all records
--  involving this emp_no in this child table are also deleted
-- ON UPDATE CASCADE??
	FOREIGN KEY ( department ) REFERENCES departments ( ID ) ON DELETE CASCADE,
-- ON UPDATE CASCADE??
	PRIMARY KEY ( employee, department ) -- Might not be unique?? Need to include from_date
	
);
CREATE TABLE department_manager (
	manager INT NOT NULL,
	department INT NOT NULL,
	status STATUS NOT NULL DEFAULT 'a',
	from_date DATE NOT NULL,
	to_date DATE NOT NULL,
	FOREIGN KEY ( manager ) REFERENCES employees ( ID ) ON DELETE CASCADE,
-- Cascade DELETE from parent table 'employee' to this child table
-- If an emp_no is deleted from parent 'employee', all records
--  involving this emp_no in this child table are also deleted
-- ON UPDATE CASCADE??
	FOREIGN KEY ( department ) REFERENCES departments ( ID ) ON DELETE CASCADE,
	PRIMARY KEY ( manager, department ) -- might not be unique?? Need from_date
	
);
CREATE TABLE titles (
	ID INT NOT NULL,
	department INT NOT NULL,
	employee INT NOT NULL,
	title VARCHAR ( 50 ) NOT NULL,
	status TEXT NOT NULL DEFAULT 'a',
	from_date DATE NOT NULL,
	to_date DATE,
	FOREIGN KEY ( employee ) REFERENCES employees ( ID ) ON DELETE CASCADE,
	FOREIGN KEY ( department ) REFERENCES departments ( ID ) ON DELETE CASCADE,
-- ON UPDATE CASCADE??
	PRIMARY KEY ( ID ),
	UNIQUE ( employee, title, from_date ) -- This ensures unique combination.
-- An employee may hold the same title but at different period
	
);
CREATE TABLE salaries (
	employee INT NOT NULL,
	salary INT NOT NULL,
	from_date DATE NOT NULL,
	status TEXT NOT NULL DEFAULT 'a',
	to_date DATE NOT NULL,
	FOREIGN KEY ( employee ) REFERENCES employees ( ID ) ON DELETE CASCADE,
	PRIMARY KEY ( employee, from_date ) 
);
CREATE TABLE title_changes (
	employee INT NOT NULL,
	old_title INT NOT NULL,
	new_title INT NOT NULL,
	status TEXT NOT NULL DEFAULT 'a',
	from_date DATE NOT NULL,
	to_date DATE NOT NULL,
	FOREIGN KEY ( employee ) REFERENCES employees ( ID ) ON DELETE CASCADE,
	FOREIGN KEY ( old_title ) REFERENCES titles ( ID ) ON DELETE CASCADE,
	FOREIGN KEY ( new_title ) REFERENCES titles ( ID ) ON DELETE CASCADE,
PRIMARY KEY ( employee, from_date, to_date ) 
);