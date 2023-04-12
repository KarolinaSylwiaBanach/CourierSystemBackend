-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 12 Kwi 2023, 21:14
-- Wersja serwera: 10.4.22-MariaDB
-- Wersja PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `megak_courier_system`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `couriers`
--

CREATE TABLE `couriers` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `name` varchar(25) NOT NULL,
  `lastname` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `couriers`
--

INSERT INTO `couriers` (`id`, `name`, `lastname`) VALUES
('2ce3db63-1f8e-4cff-b25f-2cfd5ac26852', 'Kamil', 'Kowalski'),
('4fb1c213-f22a-4806-8184-7408a9e4fbe3', 'Tadeusz', 'Mrozu'),
('505f12da-ba6b-41b4-8a89-6692271f69d5', 'Katarzyna', 'Nowak'),
('53d1eec8-a637-4715-9760-6c4b55569370', 'Joanna', 'Nos');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `package`
--

CREATE TABLE `package` (
  `id` varchar(36) NOT NULL,
  `size` varchar(10) NOT NULL,
  `nameSender` varchar(50) NOT NULL,
  `nameRecipient` varchar(50) NOT NULL,
  `addressSender` varchar(50) NOT NULL,
  `addressRecipient` varchar(50) NOT NULL,
  `status` varchar(15) NOT NULL,
  `courierId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `package`
--

INSERT INTO `package` (`id`, `size`, `nameSender`, `nameRecipient`, `addressSender`, `addressRecipient`, `status`, `courierId`) VALUES
('00512276-7357-4a06-8847-30a32c552649', 'big', 'Amadeusz Mazurek', 'Paula Kowalska', '70-742 Szczecin, Krzemienna 14/1', '82-300 Elbląg, Słowiański 107/16', 'w dostawie', '4fb1c213-f22a-4806-8184-7408a9e4fbe3'),
('09b9f300-0a3d-4269-9a17-09e64f03e0ea', 'medium', 'Jakub Piotrowski', 'Diana Maciejewska', '81-847 Sopot, Conrada Józefa 40/5', '85-456 Bydgoszcz, Indycza 33/10', 'nadana', '505f12da-ba6b-41b4-8a89-6692271f69d5'),
('651901f4-3047-4566-b904-da5e370b455f', 'big', 'Jan Nowakowski', 'Joanna Misztal', '20-583 Lublin, Kwarcowa 12/23', '03-984 Warszawa, Samolotowa 3/12', 'nadana', '2ce3db63-1f8e-4cff-b25f-2cfd5ac26852'),
('6add7726-26ce-4633-8afd-f97e7c617aca', 'small', 'Karol Jakubik', 'Mateusz Nowak', '20-576 Lublin, Bursztynowa 22/13', '20-583 Lublin, Koralowa 2/13', 'w dostwie', '2ce3db63-1f8e-4cff-b25f-2cfd5ac26852'),
('7354da27-68f0-4580-8423-593ad854e274', 'small', 'Diana Maciejewska', 'Dorota Nowak', '02-798 Warszawa, Rzekotki 137/10', '04-650 Warszawa, Stylowa 135/15', 'w dostawie', '53d1eec8-a637-4715-9760-6c4b55569370'),
('7bc2f956-d048-4425-95f2-d2a12c12ddca', 'medium', 'Anita Wysocka', 'Krystyna Sobczak', '81-589 Gdynia, Poziomkowa 138/10', '04-650 Warszawa, Stylowa 135/1', 'dostarczona', '53d1eec8-a637-4715-9760-6c4b55569370'),
('8e76ff53-db29-4a09-a138-67c267aa338e', 'big', 'Mateusz Grin', 'Kamil Kamilowy', '62-200 Gniezno, Cicha 132/16', '12-043 Nowy, Testowa 123', 'dostarczona', '4fb1c213-f22a-4806-8184-7408a9e4fbe3'),
('931887a8-a048-4095-a569-4e288a653e9d', 'small', 'Katarzyna Cichopek', 'Karol Cichopek', '00-712 Warszawa, Melomanów 4', '24-120 Rzeczyca-Kolonia, Rzeczyca-Kolonia 56', 'w dostawie', '4fb1c213-f22a-4806-8184-7408a9e4fbe3'),
('a2aa086d-881a-11ec-8433-00215cbb03cc', 'medium', 'Borys Rutkowski', 'Anatol Mazur', '44-251 Rybnik, Debowa 41', '40-676 Katowice, Sowia 103', 'w dostawie', '53d1eec8-a637-4715-9760-6c4b55569370'),
('a9f6b62b-881a-11ec-8433-00215cbb03cc', 'big', 'Kaja Borkowska', 'Dominika Kaczmarczyk', '20-085 Lublin, Lubartowska 106/12', '20-502 Lublin, Wigilijna 134', 'nadana', '2ce3db63-1f8e-4cff-b25f-2cfd5ac26852'),
('d38ec913-279a-4665-bcff-0c9f29bdb74a', 'medium', 'Olga Tomaszewska', 'Blanka Kalinowska', '42-400 Zawiercie, Amatorska 83', '20-085 Lublin, Lubartowska 105', 'w dostawie', '505f12da-ba6b-41b4-8a89-6692271f69d5'),
('dd70c870-002b-4b06-9e07-91b3c3929d81', 'small', 'Norbert Kowalski', 'Alan Baran', '85-790 Bydgoszcz, Kapeluszników 61', '85-375 Bydgoszcz, Przemyska 83', 'w dostawie', '2ce3db63-1f8e-4cff-b25f-2cfd5ac26852'),
('f2f29f9c-fb77-4959-8990-da8813aa0210', 'medium', 'Franciszek Kwiatkowski', 'Lidia Zawadzka', '85-034 Bydgoszcz, Pod Blankami 131/87', '20-620 Lublin, Plażowa 143/54', 'dostarczona', '505f12da-ba6b-41b4-8a89-6692271f69d5');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `couriers`
--
ALTER TABLE `couriers`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courierId` (`courierId`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `package`
--
ALTER TABLE `package`
  ADD CONSTRAINT `package_ibfk_1` FOREIGN KEY (`courierId`) REFERENCES `couriers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
