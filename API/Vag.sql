-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 29, 2016 at 10:27 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.5.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Vag`
--

-- --------------------------------------------------------

--
-- Table structure for table `Foto`
--

CREATE TABLE `Foto` (
  `idFoto` int(255) UNSIGNED NOT NULL,
  `urlFoto` varchar(500) NOT NULL,
  `ancho` varchar(500) NOT NULL,
  `alto` varchar(500) NOT NULL,
  `proporcion` float NOT NULL,
  `idFbFoto` varchar(500) NOT NULL,
  `ranking` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `FotoTag`
--

CREATE TABLE `FotoTag` (
  `idFotoF` int(255) UNSIGNED NOT NULL,
  `idTagF` int(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `Perfil`
--

CREATE TABLE `Perfil` (
  `idPerfil` int(10) UNSIGNED NOT NULL,
  `urlFb` varchar(500) NOT NULL,
  `nombrePerfil` varchar(500) NOT NULL,
  `ImgPerfil` varchar(500) NOT NULL,
  `idFb` varchar(500) NOT NULL,
  `insta` varchar(500) NOT NULL,
  `ranking` int(10) UNSIGNED NOT NULL,
  `vistas` int(255) UNSIGNED NOT NULL,
  `descripcion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `Perfil`
--

INSERT INTO `Perfil` (`idPerfil`, `urlFb`, `nombrePerfil`, `ImgPerfil`, `idFb`, `insta`, `ranking`, `vistas`, `descripcion`) VALUES
(1, 'https://www.facebook.com/profile.php?id=100007504728187', 'Cynthia Juarez', '', '', '', 0, 0, ''),
(2, 'https://www.facebook.com/angelgarciamty', 'Angel Garcia', '', '', '', 0, 0, ''),
(3, 'https://www.facebook.com/sagrario.carolina?fref=ts', 'Sagrario Cavazos', '', '', '', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `PerfilFoto`
--

CREATE TABLE `PerfilFoto` (
  `idPerfil` int(10) UNSIGNED NOT NULL,
  `idFoto` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `PerfilTag`
--

CREATE TABLE `PerfilTag` (
  `idPerfil` int(10) UNSIGNED NOT NULL,
  `idTag` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `PerfilTag`
--

INSERT INTO `PerfilTag` (`idPerfil`, `idTag`) VALUES
(1, 1),
(2, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Tag`
--

CREATE TABLE `Tag` (
  `idTag` int(255) UNSIGNED NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `tipoTag` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `Tag`
--

INSERT INTO `Tag` (`idTag`, `nombre`, `tipoTag`) VALUES
(1, 'delgada', ''),
(2, 'gorda', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Foto`
--
ALTER TABLE `Foto`
  ADD PRIMARY KEY (`idFoto`);

--
-- Indexes for table `FotoTag`
--
ALTER TABLE `FotoTag`
  ADD KEY `idFotoF` (`idFotoF`),
  ADD KEY `idTagF` (`idTagF`),
  ADD KEY `idFotoF_2` (`idFotoF`,`idTagF`);

--
-- Indexes for table `Perfil`
--
ALTER TABLE `Perfil`
  ADD PRIMARY KEY (`idPerfil`);

--
-- Indexes for table `PerfilFoto`
--
ALTER TABLE `PerfilFoto`
  ADD KEY `idPerfil` (`idPerfil`),
  ADD KEY `idFoto` (`idFoto`),
  ADD KEY `idPerfil_2` (`idPerfil`,`idFoto`);

--
-- Indexes for table `PerfilTag`
--
ALTER TABLE `PerfilTag`
  ADD KEY `idPerfil` (`idPerfil`,`idTag`),
  ADD KEY `Const_PerfilTag_idTag` (`idTag`);

--
-- Indexes for table `Tag`
--
ALTER TABLE `Tag`
  ADD PRIMARY KEY (`idTag`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Foto`
--
ALTER TABLE `Foto`
  MODIFY `idFoto` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Perfil`
--
ALTER TABLE `Perfil`
  MODIFY `idPerfil` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Tag`
--
ALTER TABLE `Tag`
  MODIFY `idTag` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `FotoTag`
--
ALTER TABLE `FotoTag`
  ADD CONSTRAINT `Const_FotoTag_idFoto` FOREIGN KEY (`idFotoF`) REFERENCES `Foto` (`idFoto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Const_FotoTag_idTag` FOREIGN KEY (`idTagF`) REFERENCES `Tag` (`idTag`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PerfilFoto`
--
ALTER TABLE `PerfilFoto`
  ADD CONSTRAINT `Const_PerfilFoto_idFoto` FOREIGN KEY (`idFoto`) REFERENCES `Foto` (`idFoto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Const_PerfilFoto_idPerfil` FOREIGN KEY (`idPerfil`) REFERENCES `Perfil` (`idPerfil`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PerfilTag`
--
ALTER TABLE `PerfilTag`
  ADD CONSTRAINT `Const_PerfilTag_idPerfil` FOREIGN KEY (`idPerfil`) REFERENCES `Perfil` (`idPerfil`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Const_PerfilTag_idTag` FOREIGN KEY (`idTag`) REFERENCES `Tag` (`idTag`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
