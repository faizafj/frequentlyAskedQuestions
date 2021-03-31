CREATE TABLE IF NOT EXISTS `accounts` (
  `id` mediumint UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user` varchar(25),
  `pass` varchar(70)
);

CREATE TABLE IF NOT EXISTS `questions` (
  `questionId` mediumint UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userid` mediumint UNSIGNED,
  `title` varchar(60),
  `summary` varchar(200),
  `description` varchar(1500),
  `image` varchar(30),
  `dateCreated` datetime,
  `topic` varchar(15),
  `subtopic` varchar(30)
);

CREATE TABLE IF NOT EXISTS `answers` (
  `answerId` mediumint UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `answer` varchar(60),
  `questionId` mediumint UNSIGNED,
  `userid` mediumint UNSIGNED,
  `dateAnswer` datetime
);


CREATE TABLE `topics` (
  `subtopic` varchar(30) NOT NULL,
  `topic` varchar(15) NOT NULL
);



ALTER TABLE `questions` ADD FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`);

ALTER TABLE `questions` ADD FOREIGN KEY (`subtopic`, `topic`) REFERENCES `topics` (`subtopic`, `topic`);

ALTER TABLE `answers` ADD FOREIGN KEY (`questionId`) REFERENCES `questions` (`questionId`);

ALTER TABLE `answers` ADD FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`);
