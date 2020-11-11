-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 11-Nov-2020 às 22:31
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projetox`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `apontamentos`
--

CREATE TABLE `apontamentos` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL DEFAULT '0',
  `id_car` int(11) NOT NULL DEFAULT '0',
  `km_inicial` int(11) DEFAULT NULL,
  `km_final` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `local` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `apontamentos`
--

INSERT INTO `apontamentos` (`id`, `id_user`, `id_car`, `km_inicial`, `km_final`, `data`, `local`) VALUES
(1, 1, 2, 100, 200, '2020-11-11', 'Quitanda'),
(2, 2, 1, 100, 200, '2020-11-11', 'Quitanda');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `carro` text,
  `placa` text,
  `cor` text,
  `foto` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cars`
--

INSERT INTO `cars` (`id`, `carro`, `placa`, `cor`, `foto`) VALUES
(1, 'GOL', 'abc 1234', 'preto', 'foto.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cars_users`
--

CREATE TABLE `cars_users` (
  `id` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `car` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cars_users`
--

INSERT INTO `cars_users` (`id`, `user`, `car`) VALUES
(1, 2, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nome` text,
  `usuario` text,
  `senha` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `nome`, `usuario`, `senha`) VALUES
(1, 'teste', 'teste', '123'),
(2, 'Juan Garcia', 'juan', '123'),
(5, 'Paulo', 'paulo', '123'),
(6, 'Gustavo', 'gustavo', '123'),
(7, 'Paulo', 'paulo2', '123'),
(8, 'Gustavo', 'gustavo', '123'),
(9, 'Emilio', 'emilio', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apontamentos`
--
ALTER TABLE `apontamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cars_users`
--
ALTER TABLE `cars_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apontamentos`
--
ALTER TABLE `apontamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cars_users`
--
ALTER TABLE `cars_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
