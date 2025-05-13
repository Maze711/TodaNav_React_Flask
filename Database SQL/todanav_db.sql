-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2025 at 07:50 PM
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
-- Table structure for table `trip_history`
--

CREATE TABLE `trip_history` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `rider_id` varchar(255) NOT NULL,
  `booking_id` varchar(255) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `date` date NOT NULL,
  `location_from` varchar(255) NOT NULL,
  `location_to` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `user_id` varchar(20) DEFAULT NULL,
  `contact_no` varchar(225) DEFAULT NULL,
  `user_profile` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password_hash`, `role`, `user_id`, `contact_no`, `user_profile`) VALUES
(1, 'User the Bob', 'bob@gmail.com', 'scrypt:32768:8:1$aQ1xDmzY4ZEnIRVy$a1ca69fd6dba984111c146cf775c8b7ce4738520b2f86b158d8942f06e3a167916b409457944c76fa34f75dd0b0221ba7bcf3f1a129e603b32fdf5dfbfb783f8', 'USER', '2025_0001', '09306761193', NULL),
(2, 'Bill the Rider', 'bill@gmail.com', 'scrypt:32768:8:1$5bIGKPyxEjFLus17$d6998c3e093b3555fb713a1831eaeffe1de2f484b934a9b008fc51ed5466222dce4a2a68cb5023dc4f177c31c7ff90fa046177e65e16382aa490e22031bed879', 'RIDER', '2025_0002', '', NULL),
(3, 'Joel the Admin', 'joel@gmail.com', 'scrypt:32768:8:1$w6MJXB2zGkrADUVm$14aa0c4323b16378458dab10b26a16a358da01cacadee66179d3e75abf34ceb4cc6d6a761f67cc943e15c215c10b84f470346ccfdbbb6c1863c1dac2c048927d', 'ADMIN', '2025_0003', NULL, NULL),
(4, 'Mazeu', 'badlonmaze@gmail.com', 'scrypt:32768:8:1$CeuCTeQ8oDLFHNCT$765fe5a0d101c33a36070a94b31ae91dcea42d2c4c973bfd0d2d355d55da7f46c025e773ad6c59e3ca83d3dfc09ebbaf27cc8fd9935ef9e59bbd47c4eb8ca8eb', 'USER', '2025_0004', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `trip_history`
--
ALTER TABLE `trip_history`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `trip_history`
--
ALTER TABLE `trip_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
