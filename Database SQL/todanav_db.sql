-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2025 at 07:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todanav_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('USER','RIDER','ADMIN') NOT NULL DEFAULT 'USER',
  `user_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password_hash`, `role`, `user_id`) VALUES
(1, 'User the Bob', 'bob@gmail.com', 'scrypt:32768:8:1$aQ1xDmzY4ZEnIRVy$a1ca69fd6dba984111c146cf775c8b7ce4738520b2f86b158d8942f06e3a167916b409457944c76fa34f75dd0b0221ba7bcf3f1a129e603b32fdf5dfbfb783f8', 'USER', '2025_0001'),
(2, 'Bill the Rider', 'bill@gmail.com', 'scrypt:32768:8:1$5bIGKPyxEjFLus17$d6998c3e093b3555fb713a1831eaeffe1de2f484b934a9b008fc51ed5466222dce4a2a68cb5023dc4f177c31c7ff90fa046177e65e16382aa490e22031bed879', 'RIDER', '2025_0002'),
(3, 'Joel the Admin', 'joel@gmail.com', 'scrypt:32768:8:1$w6MJXB2zGkrADUVm$14aa0c4323b16378458dab10b26a16a358da01cacadee66179d3e75abf34ceb4cc6d6a761f67cc943e15c215c10b84f470346ccfdbbb6c1863c1dac2c048927d', 'ADMIN', '2025_0003');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
