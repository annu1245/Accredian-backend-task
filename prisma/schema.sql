CREATE TABLE `Referral` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `referrerName` varchar(255) NOT NULL,
  `referrerEmail` varchar(255) NOT NULL,
  `refereeName` varchar(255) NOT NULL,
  `refereeEmail` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;