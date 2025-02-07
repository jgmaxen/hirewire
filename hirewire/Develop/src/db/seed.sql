DO $$

DECLARE 

BEGIN

INSERT INTO Department (id, name) 
VALUES 
       (1, 'Sales'),
       (2, 'Legal'),
       (3, 'Finance'),
       (4, 'Engineering');
INSERT INTO Role (id, title, salary, department_id) 
VALUES 
       (102, 'Lead', 100000, 1),
       (205, 'Engineer', 80000, 4),
       (303, 'Analyst', 70000, 3),
       (405, 'Lawyer', 60000, 2);
INSERT INTO Employee (id, first_name, last_name, role_id, manager_id,)
VALUES 
       (1001, 'Lisa', 'Vanderpump', 102, NULL),
       (2002, 'Heather', 'Gay', 205, 1001),
       (3003, 'Sonja', 'Morgan', 303, 1001),
       (4004, 'Ramona', 'Singer', 405, 1001);

RAISE NOTICE 'Database seeded successfully';

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Database seeding failed: %:', SQLERRM;
        ROLLBACK;
END $$;
