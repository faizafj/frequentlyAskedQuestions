-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(25) NOT NULL,
  `pass` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'user1','$2a$10$VMt5WBVym0JOLjNWvVSJPOHY5bavgU7F5jybIRVIUdf41qrR2k59G'),(2,'user2','$2a$10$VMt5WBVym0JOLjNWvVSJPOHY5bavgU7F5jybIRVIUdf41qrR2k59G'),(3,'user3','$2a$10$VMt5WBVym0JOLjNWvVSJPOHY5bavgU7F5jybIRVIUdf41qrR2k59G'),(5,'admin','$2a$10$YYoWsCwxeVIpfkM7qYHqfep2uzZesUPokELZmfalAlMWzMYY3TSdq');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `answerId` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `answer` varchar(60) DEFAULT NULL,
  `questionId` mediumint(8) unsigned DEFAULT NULL,
  `userid` mediumint(8) unsigned DEFAULT NULL,
  `dateAnswer` datetime DEFAULT NULL,
  PRIMARY KEY (`answerId`),
  KEY `questionId` (`questionId`),
  KEY `userid` (`userid`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `questions` (`questionId`),
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `questionId` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `userid` mediumint(8) unsigned DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `summary` varchar(200) DEFAULT NULL,
  `description` varchar(1500) DEFAULT NULL,
  `image` varchar(30) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `topic` varchar(15) DEFAULT NULL,
  `subtopic` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`questionId`),
  KEY `userid` (`userid`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,'Need help with centring elements for website.','I need help with centering some of the elements of my website','Hey guys, I need help with centring a couple of elements such as the header text so that they are in the middle of the page. ',NULL,'2021-04-05 23:15:35','CSS','CSS Styling'),(2,2,'What are the commands used for commiting in GitHub?','I need help with commiting in GitHub as I have forgotten the commands use.','I need help with commiting in GitHub as I have forgotten the commands use for it. I need to know how to add files and commit them too.',NULL,'2021-04-08 14:47:47','GitHub','GitHub Commits'),(39,3,'What are the best websites to use for finding colours in HTML?','I am currently doing a Web Development module this semester and need help with finding HTML colour codes. I need suggestions of which ones are the best to use.\n','# Hello, everyone!\n### I would like to use _HTML colour codes_ for my website project that I am doing in my web development module, however I am unsure of which is the best website to use. Do you have any suggestions of some are that are good?\n\n#### Note: I prefer to use hex code over rgb','undefined-1619774761244.png','2021-04-30 09:26:01','CSS','CSS Styling'),(40,2,'I need help creating an if else statement in JavaScript','I am using javascript for my next module project, but i am not too sure how to format an if else statement correctly.','### Hello, I am using Javascript for my module project, but I am new to using JS so I was wondering if anyone could help me as I am trying to create an *if else statement* but I don\'t know how to format it.   ','undefined-1619775937666.png','2021-04-30 09:45:37','JavaScript','JavaScript'),(42,3,'Codio Error: Address already in use - How do I fix this?','I keep getting an \'address already in use\' error on codio, does anyone know how to stop/fix this?\n','### Hi everyone, \n\nI have been trying to run my website using codio, however I keep getting a message about the address being in use already. Does anyone know how to fix this as it is very frustrating and I need to view the website in order to see if everything is working correctly. \n\n\nThank you\n','undefined-1619776706256.png','2021-04-30 09:58:26','Codio','Codio');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topics` (
  `subtopic` varchar(30) NOT NULL,
  `topic` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-30 10:00:55
