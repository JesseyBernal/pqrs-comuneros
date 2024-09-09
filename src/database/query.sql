CREATE DATABASE pqrsd;

USE pqrsd;

BEGIN;
CREATE TABLE IF NOT EXISTS cargos (
	id_cargo INT AUTO_INCREMENT,
	nombre_cargo VARCHAR(255),
	descripcion_cargo TEXT,
	PRIMARY KEY (id_cargo)
);
CREATE TABLE IF NOT EXISTS categorias (
	id_categoria INT AUTO_INCREMENT,
	nombre_categoria VARCHAR(255),
	descripcion_categoria TEXT,
	PRIMARY KEY (id_categoria)
);
CREATE TABLE IF NOT EXISTS empresas (
	id_empresa INT AUTO_INCREMENT,
	nombre_empresa VARCHAR(255),
	descripcion_empresa TEXT,
	telefono_empresa VARCHAR(255),
	correo_empresa VARCHAR(255),
	PRIMARY KEY (id_empresa)
);
CREATE TABLE IF NOT EXISTS estados (
	id_estado INT AUTO_INCREMENT,
	nombre_estado VARCHAR(255),
	descripcion_estado TEXT,
	PRIMARY KEY (id_estado)
);
CREATE TABLE IF NOT EXISTS pqrsds (
	id_pqrsd INT,
	id_usuario INT,
	id_categoria INT,
	id_estado INT,
	fecha VARCHAR(255),
	asunto TEXT,
	PRIMARY KEY (id_pqrsd),
	FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
	FOREIGN KEY (id_estado) REFERENCES estados(id_estado),
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
CREATE TABLE IF NOT EXISTS usuarios (
	id_usuario INT,
	id_empresa INT,
	id_cargo INT,
	nombre_usuario VARCHAR(255),
	telefono_usuario VARCHAR(255),
	correo_usuario VARCHAR(255),
	PRIMARY KEY (id_usuario),
	FOREIGN KEY (id_cargo) REFERENCES cargos(id_cargo),
	FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);
COMMIT;


SELECT * FROM usuarios;

INSERT INTO cargos VALUES (1,'cliente','dirige un local');
INSERT INTO cargos VALUES (2,'administrador','administra una zona');
INSERT INTO cargos VALUES (3,'contador','realiza la contabilidad');
INSERT INTO cargos VALUES (4,'secretario','apoyo a los directivos u otros');
INSERT INTO cargos VALUES (8,'Gatisimo','Gatooooo');

INSERT INTO categorias VALUES (1,'Peticion','Solicitud verbal o escrita que presenta una persona natural o juridica');
INSERT INTO categorias VALUES (2,'Quejas','Inconformidad por parte de una persona, ya sea de carácter administrativa o por conductas no deseables de los colaboradores');
INSERT INTO categorias VALUES (3,'Reclamos','Inconformidad sobre la prestación de un servicio');
INSERT INTO categorias VALUES (4,'Sugerencias','Es la propuesta que presenta el usuario para el mejoramiento de un proceso');
INSERT INTO categorias VALUES (5,'Denuncias','Manifestación de inconformidad que considera irregular de uno o varios servidores públicos en desarrollo de sus funciones.');

INSERT INTO empresas VALUES (1,'Comuneros','Centro Comercial',3112020869,'ccpopularloscomuneros@gmail.com');
INSERT INTO empresas VALUES (2,'Electrohuila','Central Electrical del Huila',6088664600,'radicacion@electrohuila.co');
INSERT INTO empresas VALUES (3,'Seguros Bolivar','Empresa de seguros',3223322322,'notificaciones@segurosbolivar.com');
INSERT INTO empresas VALUES (4,'Ciudad Limpia','Empresa tratamiento de residuos',6088664464,'jgiraldo.eco@ciudadlimpia.com');

INSERT INTO estados VALUES (1,'Abierto','Llega un nuevo pqrsd');
INSERT INTO estados VALUES (2,'Pendiente','Aun no se responde el pqrsd');
INSERT INTO estados VALUES (3,'En espera','Esperando respuesta de un ente externo');
INSERT INTO estados VALUES (4,'Resuelto','Resuelto el pqrsd');

INSERT INTO pqrsds VALUES (54,36148159,2,2,'2024-08-22','Queja de precio');
INSERT INTO pqrsds VALUES (987,38231313,4,3,'2024-08-22','Sugiere horario de cierre');
INSERT INTO pqrsds VALUES (2134,26427749,1,1,'2024-08-22','Solicita activacion de electricidad');
INSERT INTO pqrsds VALUES (32547,1075223106,3,3,'2024-08-22','Reclama falta de aseo');

INSERT INTO usuarios VALUES (26427749,1,1,'REBECA MOSQUERA MEDINA',3208146410,'rebeca@gmail.com');
INSERT INTO usuarios VALUES (36148159,1,1,'MIRYAM MADRIGAL DE SANTOS',3281464100,'miryam@gmail.com');
INSERT INTO usuarios VALUES (38231313,1,2,'FLOR ALBA ROJAS DE CANDIL',3264100814,'alba@gmail.com');
INSERT INTO usuarios VALUES (42132212,1,1,'REBECA MOSQUERAS ',3208146410,'rebeca@gmail.com');
INSERT INTO usuarios VALUES (1075223106,1,1,'EVA CAROLINA CARVAJAL ROJAS ',3214641008,'eva@gmail.com');

UPDATE pqrsds SET id_categoria = 1 WHERE id_pqrsd = 54;

SELECT id_pqrsd, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto, nombre_empresa FROM pqrsds 
INNER JOIN usuarios ON pqrsds.id_usuario = usuarios.id_usuario
INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria 
INNER JOIN estados ON pqrsds.id_estado = estados.id_estado
INNER JOIN empresas ON usuarios.id_empresa = empresas.id_empresa;

SELECT id_pqrsd, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds 
INNER JOIN usuarios ON pqrsds.id_usuario = usuarios.id_usuario 
INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria 
INNER JOIN estados ON pqrsds.id_estado = estados.id_estado;

SELECT nombre_empresa FROM pqrsds 
INNER JOIN usuarios ON pqrsds.id_usuario = usuarios.id_usuario
INNER JOIN empresas ON usuarios.id_empresa = empresas.id_empresa;
