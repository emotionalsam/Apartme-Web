-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2021 at 02:55 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apartme`
--

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `ID` int(11) NOT NULL,
  `owner` varchar(265) NOT NULL,
  `name` varchar(265) NOT NULL,
  `floor` int(11) NOT NULL,
  `rooms` int(11) NOT NULL,
  `location` varchar(265) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`ID`, `owner`, `name`, `floor`, `rooms`, `location`) VALUES
(1, 'sam@a.com', '15', 30, 28, 'ibillin'),
(3, 'sam@a.com', '22', 13, 125, 'Haifa'),
(4, 'a@a.com', '10', 30, 56, 'Haifa'),
(5, 'a@a.com', '17', 15, 108, 'Ibillin');

-- --------------------------------------------------------

--
-- Table structure for table `noti`
--

CREATE TABLE `noti` (
  `id` int(11) NOT NULL,
  `first` varchar(265) NOT NULL,
  `second` varchar(265) NOT NULL,
  `message` varchar(265) NOT NULL,
  `building` varchar(265) NOT NULL,
  `state` tinyint(1) DEFAULT 0,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `noti`
--

INSERT INTO `noti` (`id`, `first`, `second`, `message`, `building`, `state`, `date`) VALUES
(7, 'sam@a.com', '', 'There is a problem in floor number 0', '15', 0, '2021-09-06 02:17:18'),
(8, 'sam@a.com', '', 'The problem at floor 0 has been solved! thanks for your patient', '15', 1, '2021-09-06 02:17:41'),
(9, 'sam@a.com', 'b@b.com', 'Problem with the title uwhshs has been resolved!', '', 1, '2021-09-06 03:02:34'),
(10, 'sam@a.com', 'b@b.com', 'Problem with the title mhmm has been resolved!', '', 1, '2021-09-06 03:03:47'),
(11, 'sam@a.com', 'b@b.com', 'Problem with the title bingo has been resolved!', '', 1, '2021-09-06 03:04:20'),
(12, 'sam@a.com', 'b@b.com', 'Problem with the title jsbxjsjs has been resolved!', '', 1, '2021-09-06 03:04:47'),
(13, 'sam@a.com', 'b@b.com', 'hshxhz: qwrqwrwqrqwr', '', 0, '2021-09-06 03:07:46'),
(14, 'b@b.com', 'sam@a.com', 'b@b.com has posted a new report at building 15', '', 0, '2021-09-06 03:41:02'),
(15, 'sam@a.com', '', 'The problem at floor 2 has been solved! thanks for your patient', '15', 1, '2021-09-06 03:54:43');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user` varchar(265) NOT NULL,
  `a` varchar(265) NOT NULL,
  `b` varchar(265) NOT NULL,
  `c` varchar(265) NOT NULL,
  `indic` varchar(265) NOT NULL,
  `title` varchar(265) NOT NULL,
  `description` varchar(265) NOT NULL,
  `room` varchar(265) NOT NULL DEFAULT '-',
  `floor` varchar(265) NOT NULL,
  `building` varchar(265) NOT NULL,
  `owner` varchar(265) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user`, `a`, `b`, `c`, `indic`, `title`, `description`, `room`, `floor`, `building`, `owner`) VALUES
(26, 'b@b.com', 'b@b.com-0-1630881593640', 'b@b.com-1-1630881593640', '', '1630881593640', 'hshxhz', 'hsuendjd', '15', '0', '15', 'sam@a.com'),
(27, 'b@b.com', 'b@b.com-0-1630881860840', '', '', '1630881860840', 'hshxys', 'heudheud', '15', '0', '15', 'sam@a.com'),
(28, 'b@b.com', 'b@b.com-0-1630883073888', '', '', '1630883073888', 'hshdhe', 'hshxbew', '15', '0', '15', 'sam@a.com'),
(29, 'b@b.com', 'b@b.com-0-1630888858843', 'b@b.com-1-1630888858843', '', '1630888858843', 'This is snow', 'he is a bad boy', '15', '0', '15', 'sam@a.com');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `ID` int(11) NOT NULL,
  `email` varchar(265) NOT NULL,
  `review` varchar(265) NOT NULL,
  `rate` int(11) NOT NULL,
  `building` varchar(265) NOT NULL,
  `owner` varchar(265) NOT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`ID`, `email`, `review`, `rate`, `building`, `owner`, `date`) VALUES
(1, 'b@b.com', 'fucking 1 hell of a building! do not come its shiit', 1, '15', 'sam@a.com', '2021-09-02 22:15:45'),
(2, 'c@c.com', 'great building!!!!!!!', 5, '15', 'sam@a.com', '2021-09-03 00:28:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `pre` tinyint(1) NOT NULL DEFAULT 0,
  `buildings` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT 'default',
  `contract` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `floor` int(11) DEFAULT NULL,
  `room` int(11) DEFAULT NULL,
  `owner` varchar(265) DEFAULT NULL,
  `status` varchar(265) DEFAULT NULL,
  `phone` varchar(265) DEFAULT NULL,
  `location` varchar(265) DEFAULT NULL,
  `cache` varchar(265) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `email`, `name`, `pass`, `pre`, `buildings`, `profile`, `contract`, `date`, `floor`, `room`, `owner`, `status`, `phone`, `location`, `cache`) VALUES
(1, 'samir.1996@hotmail.com', 'Sameer', '$2b$10$httDWAby3Ijzeul2r1Erk.25WJHi.FgH/wk1RedKg3Ub8U1I7dldu', 1, '', 'default', NULL, '2021-08-28 23:02:47', NULL, NULL, '', NULL, NULL, NULL, ''),
(2, 'karemzh@live.com', 'Kareem', '$2b$10$3KjnAIMd7jJsKNGMvM5aVOOZbrw9SLc7HFjDbyE4N95cEG0KdXaH2', 1, '15,20', 'default', NULL, '2021-08-30 21:51:52', NULL, NULL, '', NULL, NULL, NULL, ''),
(3, 'sam@a.com', 'sam', '$2b$10$2DJF7avnjCAwStqp5Z6h1erB6K3mJLoFJ4UpjZjw8jaXXUfQuSYOG', 1, '15,22', 'default', NULL, '2021-08-31 00:41:40', NULL, NULL, '', NULL, NULL, NULL, ''),
(4, 'a@a.com', 'kareemz', '$2b$10$SvzZjDdTnDuMjgT0335zmevtBc5AVkmDAinS/KTYcL6i69jqofl9G', 1, '10,17', 'default', NULL, '2021-08-31 20:54:51', NULL, NULL, '', NULL, NULL, NULL, ''),
(5, 'b@b.com', 'qwrqwrwq', '$2b$10$YN0BF1.8yVHi5uYRvridG.L0KSikwpKb3ESzoHh5ZLvyiRJxUVrUq', 0, '15', 'b@b.com', NULL, '2021-09-01 23:08:25', 0, 15, 'sam@a.com', 'Accepted', '0129401248', 'qrqwrqwr', '3'),
(6, 'c@c.com', 'z3tr', '$2b$10$gnXW8BPBa.5hLPZj0FF0iOM8MsoG95DwWsaCzkKOR0MGPBCDUdzzW', 0, '', 'default', NULL, '2021-09-03 00:02:37', NULL, NULL, 'sam@a.com', NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `warning`
--

CREATE TABLE `warning` (
  `ID` int(11) NOT NULL,
  `owner` varchar(265) NOT NULL,
  `building` varchar(265) NOT NULL,
  `floor` int(11) NOT NULL,
  `description` varchar(265) NOT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `noti`
--
ALTER TABLE `noti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `warning`
--
ALTER TABLE `warning`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `noti`
--
ALTER TABLE `noti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `warning`
--
ALTER TABLE `warning`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
