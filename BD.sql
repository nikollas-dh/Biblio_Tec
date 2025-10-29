-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.8.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para biblioteca
CREATE DATABASE IF NOT EXISTS `biblioteca` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `biblioteca`;

-- Copiando estrutura para tabela biblioteca.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL DEFAULT '0',
  `cpf` char(11) NOT NULL DEFAULT '0',
  `curso` varchar(50) DEFAULT '0',
  `email` varchar(100) NOT NULL DEFAULT '0',
  `senha` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela biblioteca.alunos: ~3 rows (aproximadamente)
INSERT IGNORE INTO `alunos` (`id`, `nome`, `cpf`, `curso`, `email`, `senha`) VALUES
	(1, 'Pedro Campos', '12345678910', 'DS', 'pedrocampos@gmail.com', 'senai2025'),
	(2, 'Nikollas Dheyvis', '12345678911', 'DS', 'nikollasdheyvis@gmail.com', 'senai2025'),
	(3, 'Vinicius Ribeiro', '12345678912', 'DS', 'viniciusribeiro@gmail.com', 'senai2025');

-- Copiando estrutura para tabela biblioteca.livros
CREATE TABLE IF NOT EXISTS `livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `disponivel` tinyint(1) NOT NULL DEFAULT 1,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela biblioteca.livros: ~6 rows (aproximadamente)
INSERT IGNORE INTO `livros` (`id`, `titulo`, `autor`, `disponivel`, `url`) VALUES
	(1, 'Sistemas de Banco de Dados', 'Elmasri - Navathe', 1, NULL),
	(2, 'Aprenda C Sharp', 'Diego Rodrigues', 1, NULL),
	(3, 'HTML & CSS', 'Jon Duckett', 1, NULL),
	(4, 'JavaScript //Exercicios com respostas', 'S.O.S Facul', 1, NULL),
	(5, 'Mastering Python', 'Dan Brown', 1, NULL),
	(6, 'SCRUM', 'Jeff Sutherland', 1, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
