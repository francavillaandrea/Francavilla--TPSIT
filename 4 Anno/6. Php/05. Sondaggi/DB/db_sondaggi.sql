-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Creato il: Ott 18, 2016 alle 22:36
-- Versione del server: 10.1.10-MariaDB
-- Versione PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbsondaggi`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `sondaggi`
--

CREATE TABLE `sondaggi` (
  `id` int(11) NOT NULL,
  `titolo` varchar(30) NOT NULL,
  `domanda` varchar(100) NOT NULL,
  `img` varchar(50) NOT NULL,
  `nSi` int(10) UNSIGNED NOT NULL,
  `nNo` int(10) UNSIGNED NOT NULL,
  `nNS` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `sondaggi`
--

INSERT INTO `sondaggi` (`id`, `titolo`, `domanda`, `img`, `nSi`, `nNo`, `nNS`) VALUES
(1, 'Tecnologia', 'Sei d''accordo con lo sviluppo della tecnologia ?', 'tecnologia.jpg', 90, 10, 20),
(2, 'Medicina', 'Sei d''accordo con lo sviluppo della medicina ?', 'medicina.jpg', 90, 10, 20),
(3, 'Scienza', 'Sei d''accordo con lo sviluppo della scienza ?', 'scienza.jpg', 90, 10, 20);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `sondaggi`
--
ALTER TABLE `sondaggi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `sondaggi`
--
ALTER TABLE `sondaggi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
