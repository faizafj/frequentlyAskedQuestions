CREATE TABLE `accounts` (
  `id` mediumint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user` varchar(25),
  `pass` varchar(70)
);

CREATE TABLE `questions` (
  `questionId` mediumint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userid` mediumint,
  `title` varchar(60),
  `summary` varchar(200),
  `description` varchar(1500),
  `image` varchar(50),
  `dateCreated` datetime DEFAULT (now()),
  `topic` varchar(15),
  `subtopic` varchar(30)
);

CREATE TABLE `topics` (
  `subtopic` varchar(30),
  `topic` varchar(15)
);

CREATE TABLE `answers` (
  `answerId` mediumint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `answer` varchar(60),
  `questionId` mediumint,
  `userid` mediumint,
  `dateAnswer` datetime DEFAULT (now())
);

ALTER TABLE `questions` ADD FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`);

ALTER TABLE `questions` ADD FOREIGN KEY (`subtopic`, `topic`) REFERENCES `topics` (`subtopic`, `topic`);

ALTER TABLE `answers` ADD FOREIGN KEY (`questionId`) REFERENCES `questions` (`questionId`);

ALTER TABLE `answers` ADD FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`);
