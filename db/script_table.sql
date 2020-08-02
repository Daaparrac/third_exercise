CREATE TABLE Employee
(
    id_employee int(11) NOT NULL PRIMARY KEY,
    fullname varchar(200) NOT NULL,
    funcion varchar(200) NOT NULL
);

create table Employees
(
    id_employee int(11) not null primary key,
    fullname varchar(50),
    funcion varchar(50),
    id_jefe int(11),
    constraint jefe_fk foreign key (id_jefe) references personal (id_personal)
);

INSERT INTO Employee
    (fullname,funcion)
VALUES
    (1, 'Empleado1', 'funcion', 1),
    (2, 'Empleado2', 'funcion', 2),
    (3, 'Empleado3', 'funcion', 1),
    (4, 'Empleado4', 'funcion', 3),
    (5, 'Empleado5', 'funcion', 1),
    (6, 'Empleado6', 'funcion', 1),
    (7, 'Empleado7', 'funcion', null),
    (8, 'Empleado8', 'funcion', 1);