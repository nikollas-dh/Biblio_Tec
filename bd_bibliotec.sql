-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.0.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para bd_bibliotec
CREATE DATABASE IF NOT EXISTS `bd_bibliotec` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `bd_bibliotec`;

-- Copiando estrutura para tabela bd_bibliotec.avaliacoes
CREATE TABLE IF NOT EXISTS `avaliacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `livro_id` int(11) NOT NULL,
  `nota` decimal(3,1) DEFAULT NULL,
  `comentario` text DEFAULT NULL,
  `data_avaliacao` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `livro_id` (`livro_id`),
  CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `avaliacoes_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bd_bibliotec.avaliacoes: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela bd_bibliotec.favoritos
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `livro_id` int(11) NOT NULL,
  `data_favoritado` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `livro_id` (`livro_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bd_bibliotec.favoritos: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela bd_bibliotec.livros
CREATE TABLE IF NOT EXISTS `livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `genero` varchar(100) DEFAULT NULL,
  `editora` varchar(100) DEFAULT NULL,
  `ano_publicacao` date DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `idioma` varchar(50) DEFAULT 'Português',
  `formato` enum('Físico','E-book','Audiobook') DEFAULT 'Físico',
  `caminho_capa` varchar(2000) DEFAULT NULL,
  `sinopse` text DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bd_bibliotec.livros: ~3 rows (aproximadamente)
INSERT IGNORE INTO `livros` (`id`, `titulo`, `autor`, `genero`, `editora`, `ano_publicacao`, `isbn`, `idioma`, `formato`, `caminho_capa`, `sinopse`, `ativo`, `criado_em`, `atualizado_em`) VALUES
	(1, 'APRENDA C# - Edição 2025: Domine o Desenvolvimento Escalável com Programação Moderna. Dos Fundamentos às Aplicações Práticas: 1', 'Diego Rodrigues', 'Tecnologia', 'Studio21 Smart Tech  Content', '2025-05-02', NULL, 'Português', 'Físico', 'https://m.media-amazon.com/images/I/51+rSFDkBXL._SY466_.jpg', 'Este livro é ideal para desenvolvedores e estudantes que desejam dominar C# com foco prático e aplicações reais. Você aprenderá a desenvolver soluções robustas, escaláveis e multiplataforma usando C# e .NET, desde a configuração do ambiente até integrações avançadas com APIs, bancos de dados e dispositivos IoT. Explore conceitos essenciais como programação orientada a objetos, LINQ, programação assíncrona e desenvolvimento web e mobile.', 1, '2025-12-06 00:14:29', '2025-12-06 00:19:00'),
	(2, 'Dom Casmurro', 'Machado de Assis', 'Romance', NULL, '2019-05-02', NULL, 'Português', 'Físico', 'https://m.media-amazon.com/images/I/61x1ZHomWUL._SY466_.jpg', 'm Dom Casmurro, o narrador Bento Santiago retoma a infância que passou na Rua de Matacavalos e conta a história do amor e das desventuras que viveu com Capitu, uma das personagens mais enigmáticas e intrigantes da literatura brasileira. Nas páginas deste romance, encontra-se a versão de um homem perturbado pelo ciúme, que revela aos poucos sua psicologia complexa e enreda o leitor em sua narrativa ambígua acerca do acontecimento ou não do adultério da mulher com olhos de ressaca, uma das maiores polêmicas da literatura brasileira.', 1, '2025-12-06 01:05:48', '2025-12-06 01:06:32'),
	(3, 'Diário de um Banana 1', 'Jeff Kinney', 'Comédia', NULL, '2008-05-19', NULL, 'Português', 'Físico', 'https://m.media-amazon.com/images/I/71fWaI5myqL._SY466_.jpg', 'Não é fácil ser criança. E ninguém sabe disso melhor do que Greg Heffley, que se vê mergulhado no mundo do ensino fundamental, onde fracotes são obrigados a dividir os corredores com garotos mais altos, mais malvados e que já se barbeiam. Em Diário de um Banana, o autor e ilustrados Jeff Kinney nos apresenta um herói improvável. Como Greg diz em seu diário. Só não espere que seja todo Querido Diário isso, Querido Diário aquilo. Para nossa sorte, o que Greg Heffley diz que fará e o que ele realmente faz são duas coisas bem diferentes.', 1, '2025-12-06 01:26:16', '2025-12-06 01:26:16');

-- Copiando estrutura para tabela bd_bibliotec.reservas
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `livro_id` int(11) NOT NULL,
  `data_retirada` date NOT NULL,
  `data_devolucao` date NOT NULL,
  `confirmado_email` tinyint(1) DEFAULT 0,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `livro_id` (`livro_id`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bd_bibliotec.reservas: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela bd_bibliotec.tabela_curso
CREATE TABLE IF NOT EXISTS `tabela_curso` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bd_bibliotec.tabela_curso: ~14 rows (aproximadamente)
INSERT IGNORE INTO `tabela_curso` (`id`, `nome`) VALUES
	(1, 'Engenharia de Fundição'),
	(2, 'Engenharia de Soldagem'),
	(3, 'Superior de Tecnologia em Processos Metalúrgicos'),
	(4, 'Técnico em Metalurgia'),
	(5, 'Técnico em Desenvolvimento de Sistemas'),
	(6, 'Técnico em Administração'),
	(7, 'Construtor de Moldes e Ferramentas para Fundição'),
	(8, 'Projetista de Moldes e Ferramentas para Fundição'),
	(9, 'Assistente Administrativo'),
	(10, 'Auxiliar de Linha de Produção'),
	(11, 'Eletricista de Manutenção Eletroeletrônica'),
	(12, 'Instalador e Reparador de Equipamentos de Telecomunicações'),
	(13, 'Mecânico de Manutenção'),
	(14, 'Soldador');

-- Copiando estrutura para tabela bd_bibliotec.tabela_turma
CREATE TABLE IF NOT EXISTS `tabela_turma` (
  `id` int(11) NOT NULL,
  `turma` varchar(50) NOT NULL,
  `curso_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `tabela_turma_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `tabela_curso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bd_bibliotec.tabela_turma: ~33 rows (aproximadamente)
INSERT IGNORE INTO `tabela_turma` (`id`, `turma`, `curso_id`) VALUES
	(1, 'PEF-03-FUA', 1),
	(2, 'PES-04-EJS', 2),
	(3, 'CSTPME225N1', 3),
	(4, 'CSTPME124N4', 3),
	(5, '1NA', 4),
	(6, '2DS', 5),
	(7, '2NA', 4),
	(8, 'ADM1A-SESI', 6),
	(9, 'ADM2A-SESI', 6),
	(10, 'ADM2B-SESI', 6),
	(11, 'DS1A-SESI', 5),
	(12, 'DS1B-SESI', 5),
	(13, 'DS2A-SESI', 5),
	(14, 'DS2B-SESI', 5),
	(15, 'MT1A-SESI', 4),
	(16, 'MT1B-SESI', 4),
	(17, 'MT1-SEDUC', 4),
	(18, 'MT2-SESI', 4),
	(19, 'I1CMFF', 7),
	(20, 'I1PMFF', 8),
	(21, 'M1ADM', 9),
	(22, 'M1ALP', 10),
	(23, 'M1EME', 11),
	(24, 'M2IRET', 12),
	(25, 'M2MM', 13),
	(26, 'M4MM', 13),
	(27, 'T1ADM', 9),
	(28, 'T1EME', 11),
	(29, 'T1SOL', 14),
	(30, 'T2ALP', 10),
	(31, 'T2MM', 13),
	(32, 'T3EME', 11),
	(33, 'T4MM', 13);

-- Copiando estrutura para tabela bd_bibliotec.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `curso` varchar(100) DEFAULT NULL,
  `perfil` enum('Aluno','Admin') DEFAULT 'Aluno',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bd_bibliotec.usuarios: ~6 rows (aproximadamente)
INSERT IGNORE INTO `usuarios` (`id`, `nome`, `email`, `senha`, `data_nascimento`, `celular`, `curso`, `perfil`) VALUES
	(1, 'Vitor Lima', 'vitor.lima@email.com', '1234', NULL, NULL, NULL, 'Admin'),
	(2, 'Pedro Campos', 'pedro.campos@email.com', 'abcd', NULL, NULL, NULL, 'Aluno'),
	(3, 'Pedro Gabriel', 'pedro.gabriel@email.com', 'senha123', NULL, NULL, NULL, 'Aluno'),
	(4, 'Davi Guedes', 'davi.guedes@email.com', 'teste123', NULL, NULL, NULL, 'Aluno'),
	(5, 'Matheus Lima', 'matheus.lima@email.com', '3210', NULL, NULL, NULL, 'Aluno'),
	(17, 'Pedro Leitão', 'campos2007@icloud.com', 'Senai2025', NULL, NULL, NULL, 'Aluno');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
