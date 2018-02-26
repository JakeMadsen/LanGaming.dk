-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2018 at 10:04 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_langaming`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_forum`
--

CREATE TABLE `tb_forum` (
  `forum_id` int(11) NOT NULL,
  `forum_name` varchar(100) NOT NULL,
  `forum_threads` int(11) NOT NULL DEFAULT '0',
  `forum_description` varchar(255) NOT NULL,
  `forum_hidden` tinyint(1) NOT NULL,
  `fk_forum_creater_user` int(11) NOT NULL,
  `fk_forum_privilege_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tb_forum_comments`
--

CREATE TABLE `tb_forum_comments` (
  `comment_id` int(11) NOT NULL,
  `fk_comment_thread_parent` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `comment_timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_comment_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tb_forum_threads`
--

CREATE TABLE `tb_forum_threads` (
  `thread_id` int(11) NOT NULL,
  `fk_thread_parent_forum` int(11) NOT NULL,
  `thread_name` varchar(100) NOT NULL,
  `thread_description` varchar(255) NOT NULL,
  `thread_comments` int(11) NOT NULL,
  `thread_hidden` tinyint(1) NOT NULL,
  `thread_closed` tinyint(1) NOT NULL,
  `fk_thread_creater_user` int(11) NOT NULL,
  `fk_thread_privilege_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tb_lan_events`
--

CREATE TABLE `tb_lan_events` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(50) NOT NULL,
  `event_text` text NOT NULL,
  `event_dateStart` datetime NOT NULL,
  `event_dateEnd` datetime NOT NULL,
  `fk_event_location` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_lan_events`
--

INSERT INTO `tb_lan_events` (`event_id`, `event_name`, `event_text`, `event_dateStart`, `event_dateEnd`, `fk_event_location`) VALUES
(1, 'LTU - Lan Gaming', 'Lang gaming event på Lyngby ungdomsskole', '2018-02-17 10:00:00', '2018-02-18 10:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_lan_locations`
--

CREATE TABLE `tb_lan_locations` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(100) NOT NULL,
  `location_city` varchar(100) NOT NULL,
  `location_adress` varchar(100) NOT NULL,
  `location_postcode` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_lan_locations`
--

INSERT INTO `tb_lan_locations` (`location_id`, `location_name`, `location_city`, `location_adress`, `location_postcode`) VALUES
(1, 'Lyngby Ungdomsskole', 'Kgs. Lyngby', 'Trongårdsvej 50', '2800'),
(2, 'Herlev Ungdomsskole', 'Herlev', 'Højsletten 25', '2730');

-- --------------------------------------------------------

--
-- Table structure for table `tb_lend_out`
--

CREATE TABLE `tb_lend_out` (
  `lend_out_id` int(11) NOT NULL,
  `lend_out_student_name` varchar(100) NOT NULL,
  `lend_out_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_lend_out_options` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_lend_out`
--

INSERT INTO `tb_lend_out` (`lend_out_id`, `lend_out_student_name`, `lend_out_time`, `fk_lend_out_options`) VALUES
(70, 'Hans', '2018-02-19 17:47:36', 11),
(71, 'Kim', '2018-02-19 22:53:30', 6);

-- --------------------------------------------------------

--
-- Table structure for table `tb_lend_out_options`
--

CREATE TABLE `tb_lend_out_options` (
  `lend_out_option_id` int(11) NOT NULL,
  `lend_out_option_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_lend_out_options`
--

INSERT INTO `tb_lend_out_options` (`lend_out_option_id`, `lend_out_option_name`) VALUES
(1, 'Forlænger Ledning'),
(13, 'HDMI - Kabel'),
(3, 'Lan Kabel - Blå'),
(6, 'Lan Kabel - Grå'),
(2, 'Lan Kabel - Grøn'),
(5, 'Lan Kabel - Gult'),
(4, 'Lan Kabel - Hvidt'),
(11, 'VGA - Kabel');

-- --------------------------------------------------------

--
-- Table structure for table `tb_student_check`
--

CREATE TABLE `tb_student_check` (
  `student_check_id` int(11) NOT NULL,
  `student_check_fullName` varchar(255) NOT NULL,
  `student_check_phone` varchar(8) NOT NULL,
  `student_check_cpr` varchar(10) NOT NULL,
  `student_check_message` text,
  `student_check_email` varchar(255) NOT NULL,
  `student_check_elevPlanName` varchar(20) NOT NULL,
  `student_check_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_check_lan_event` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_student_check`
--



-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `fk_user_forgot_question` int(11) NOT NULL,
  `user_forgot_answer` varchar(255) NOT NULL,
  `fk_user_info` int(11) NOT NULL,
  `fk_user_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`user_id`, `user_name`, `user_password`, `fk_user_forgot_question`, `user_forgot_answer`, `fk_user_info`, `fk_user_role`) VALUES
(1, 'JakeTheDane', 'password', 1, 'Stampe', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_info`
--

CREATE TABLE `tb_user_info` (
  `info_id` int(11) NOT NULL,
  `info_nickName` varchar(100) DEFAULT NULL,
  `info_steam` varchar(255) DEFAULT NULL,
  `info_firstName` varchar(50) DEFAULT NULL,
  `info_lastName` varchar(50) DEFAULT NULL,
  `info_email` varchar(255) DEFAULT NULL,
  `info_phone` varchar(8) DEFAULT NULL,
  `info_profileText` text,
  `info_profilePicture` varchar(255) DEFAULT NULL,
  `info_bannerPicture` varchar(255) DEFAULT NULL,
  `info_signature` varchar(200) DEFAULT NULL,
  `info_twitch` varchar(255) DEFAULT NULL,
  `info_skype` varchar(255) DEFAULT NULL,
  `info_discord` varchar(255) DEFAULT NULL,
  `info_battleTag` varchar(20) DEFAULT NULL,
  `info_origin` varchar(255) DEFAULT NULL,
  `info_youtube` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_user_info`
--

INSERT INTO `tb_user_info` (`info_id`, `info_nickName`, `info_steam`, `info_firstName`, `info_lastName`, `info_email`, `info_phone`, `info_profileText`, `info_profilePicture`, `info_bannerPicture`, `info_signature`, `info_twitch`, `info_skype`, `info_discord`, `info_battleTag`, `info_origin`, `info_youtube`) VALUES
(1, 'JakeTheDane', NULL, 'Jake', 'Madsen', 'DisasterTeamGaming@gmail.com', '60666015', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_questions`
--

CREATE TABLE `tb_user_questions` (
  `question_id` int(11) NOT NULL,
  `question_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_user_questions`
--

INSERT INTO `tb_user_questions` (`question_id`, `question_text`) VALUES
(1, 'Navn på første kæledyr?'),
(2, 'Navn på yndlings film?'),
(3, 'Navn på yndlings ret?');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_roles`
--

CREATE TABLE `tb_user_roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_user_roles`
--

INSERT INTO `tb_user_roles` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'Bruger');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_forum`
--
ALTER TABLE `tb_forum`
  ADD PRIMARY KEY (`forum_id`),
  ADD UNIQUE KEY `forum_name` (`forum_name`),
  ADD KEY `fk_forum_creater_user` (`fk_forum_creater_user`),
  ADD KEY `fk_forum_privilege_role` (`fk_forum_privilege_role`);

--
-- Indexes for table `tb_forum_comments`
--
ALTER TABLE `tb_forum_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `fk_comment_user` (`fk_comment_user`),
  ADD KEY `fk_comment_thread_parent` (`fk_comment_thread_parent`);

--
-- Indexes for table `tb_forum_threads`
--
ALTER TABLE `tb_forum_threads`
  ADD PRIMARY KEY (`thread_id`,`thread_name`),
  ADD KEY `fk_thread_parent_forum` (`fk_thread_parent_forum`),
  ADD KEY `fk_thread_creater_user` (`fk_thread_creater_user`),
  ADD KEY `fk_thread_privilege_role` (`fk_thread_privilege_role`);

--
-- Indexes for table `tb_lan_events`
--
ALTER TABLE `tb_lan_events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `fk_event_location` (`fk_event_location`);

--
-- Indexes for table `tb_lan_locations`
--
ALTER TABLE `tb_lan_locations`
  ADD PRIMARY KEY (`location_id`),
  ADD UNIQUE KEY `location_name` (`location_name`);

--
-- Indexes for table `tb_lend_out`
--
ALTER TABLE `tb_lend_out`
  ADD PRIMARY KEY (`lend_out_id`),
  ADD KEY `fk_option_id` (`fk_lend_out_options`);

--
-- Indexes for table `tb_lend_out_options`
--
ALTER TABLE `tb_lend_out_options`
  ADD PRIMARY KEY (`lend_out_option_id`),
  ADD UNIQUE KEY `lend_out_option_name` (`lend_out_option_name`);

--
-- Indexes for table `tb_student_check`
--
ALTER TABLE `tb_student_check`
  ADD PRIMARY KEY (`student_check_id`),
  ADD UNIQUE KEY `student_check_fullName` (`student_check_fullName`),
  ADD KEY `fk_check_lan_event` (`fk_check_lan_event`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD KEY `fk_user_info` (`fk_user_info`),
  ADD KEY `fk_user_role` (`fk_user_role`);

--
-- Indexes for table `tb_user_info`
--
ALTER TABLE `tb_user_info`
  ADD PRIMARY KEY (`info_id`);

--
-- Indexes for table `tb_user_questions`
--
ALTER TABLE `tb_user_questions`
  ADD PRIMARY KEY (`question_id`),
  ADD UNIQUE KEY `question_text` (`question_text`);

--
-- Indexes for table `tb_user_roles`
--
ALTER TABLE `tb_user_roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_forum`
--
ALTER TABLE `tb_forum`
  MODIFY `forum_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_forum_comments`
--
ALTER TABLE `tb_forum_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_forum_threads`
--
ALTER TABLE `tb_forum_threads`
  MODIFY `thread_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_lan_events`
--
ALTER TABLE `tb_lan_events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_lan_locations`
--
ALTER TABLE `tb_lan_locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_lend_out`
--
ALTER TABLE `tb_lend_out`
  MODIFY `lend_out_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `tb_lend_out_options`
--
ALTER TABLE `tb_lend_out_options`
  MODIFY `lend_out_option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_student_check`
--
ALTER TABLE `tb_student_check`
  MODIFY `student_check_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_user_info`
--
ALTER TABLE `tb_user_info`
  MODIFY `info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_user_questions`
--
ALTER TABLE `tb_user_questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_user_roles`
--
ALTER TABLE `tb_user_roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_student_check`
--
ALTER TABLE `tb_student_check`
  ADD CONSTRAINT `tb_student_check_ibfk_1` FOREIGN KEY (`fk_check_lan_event`) REFERENCES `tb_lan_events` (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
