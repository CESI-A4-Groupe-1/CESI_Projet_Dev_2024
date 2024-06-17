-- MySQL dump 10.13  Distrib 8.4.0, for Linux (x86_64)
--
-- Host: localhost    Database: CESEats
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

create database if not exists CESEats;
use CESEats;

DROP TABLE IF EXISTS `V_GestionComm`;
/*!50001 DROP VIEW IF EXISTS `V_GestionComm`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `V_GestionComm` AS SELECT 
 1 AS `COMMANDE`,
 1 AS `CONTENU`,
 1 AS `PRIX`,
 1 AS `RESTO_ID`,
 1 AS `RESTO_NOM`,
 1 AS `LIVREUR_ID`,
 1 AS `LIVREUR_NOM`,
 1 AS `LIVRAISON_ID`,
 1 AS `LIVRAISON_ETAT`,
 1 AS `CLIENT_ADRESSE`*/;
SET character_set_client = @saved_cs_client;

DROP TABLE IF EXISTS `V_GraphPrix`;
/*!50001 DROP VIEW IF EXISTS `V_GraphPrix`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `V_GraphPrix` AS SELECT 
 1 AS `Benef`,
 1 AS `Jours`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `V_PrixComm`
--

DROP TABLE IF EXISTS `V_PrixComm`;
/*!50001 DROP VIEW IF EXISTS `V_PrixComm`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `V_PrixComm` AS SELECT 
 1 AS `ID`,
 1 AS `TotalComm`,
 1 AS `dat`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `V_TotalArticles`
--

DROP TABLE IF EXISTS `V_TotalArticles`;
/*!50001 DROP VIEW IF EXISTS `V_TotalArticles`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `V_TotalArticles` AS SELECT 
 1 AS `ID`,
 1 AS `ID_commande`,
 1 AS `ID_article`,
 1 AS `Quantite`,
 1 AS `prix`,
 1 AS `TotalInd`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `V_TotalCommande`
--

DROP TABLE IF EXISTS `V_TotalCommande`;
/*!50001 DROP VIEW IF EXISTS `V_TotalCommande`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `V_TotalCommande` AS SELECT 
 1 AS `ID`,
 1 AS `ID_commande`,
 1 AS `TotalPrix`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) NOT NULL,
  `prix` float NOT NULL,
  `ID_section` int NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_section` (`ID_section`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`ID_section`) REFERENCES `section` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commande_list`
--

DROP TABLE IF EXISTS `commande_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commande_list` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_article` int NOT NULL,
  `ID_commande` int NOT NULL,
  `Quantite` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_article` (`ID_article`),
  KEY `ID_commande` (`ID_commande`),
  CONSTRAINT `commande_list_ibfk_1` FOREIGN KEY (`ID_article`) REFERENCES `articles` (`ID`),
  CONSTRAINT `commande_list_ibfk_2` FOREIGN KEY (`ID_commande`) REFERENCES `commandes` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commande_list`
--

LOCK TABLES `commande_list` WRITE;
/*!40000 ALTER TABLE `commande_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `commande_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commandes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_client` int NOT NULL,
  `ID_restaurant` int NOT NULL,
  `ID_livraison` int DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `validated_at` timestamp NULL DEFAULT NULL,
  `denied_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_livraison` (`ID_livraison`),
  KEY `ID_restaurant` (`ID_restaurant`),
  CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`ID_livraison`) REFERENCES `livraisons` (`ID`),
  CONSTRAINT `commandes_ibfk_2` FOREIGN KEY (`ID_restaurant`) REFERENCES `restaurants` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commandes`
--

LOCK TABLES `commandes` WRITE;
/*!40000 ALTER TABLE `commandes` DISABLE KEYS */;
/*!40000 ALTER TABLE `commandes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compte`
--

DROP TABLE IF EXISTS `compte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compte` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) DEFAULT NULL,
  `Prenom` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `RoleID` int NOT NULL,
  `date_anniv` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `is_notified` tinyint(1) NOT NULL,
  `path_pfp` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `Id_parain` int DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Id_parain` (`Id_parain`),
  KEY `RoleID` (`RoleID`),
  CONSTRAINT `compte_ibfk_1` FOREIGN KEY (`Id_parain`) REFERENCES `compte` (`ID`),
  CONSTRAINT `RoleID` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`)
) 

ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compte`
--

LOCK TABLES `compte` WRITE;
/*!40000 ALTER TABLE `compte` DISABLE KEYS */;
INSERT INTO `compte` VALUES (1,'Doe','John','test@test.com',1,'2012-04-23 18:25:43','$2b$10$Uxw.wvbxrfPqoTbtNED/K.wgPOPLFuHBUQRZlbjIkJXBBBtFwehK2','011111111',1,'./','2024-06-07 07:13:22','2024-06-07 07:13:22',NULL,'',NULL),(2,NULL,NULL,'test@test.com',1,'2012-04-23 18:25:43','12345678','011111111',1,'./','2024-06-06 20:11:00','2024-06-06 20:11:00',NULL,'',NULL),(3,'dfajkldskdsffk',NULL,'testttt@test.com',2,'2012-04-23 18:25:43','12345678','011111111',1,'./','2024-06-06 20:12:48','2024-06-09 20:54:36',NULL,'','2024-06-09 20:57:12'),(4,'Doe','John','testc@test.com',1,'2012-04-23 18:25:43','12345678','011111111',1,'./','2024-06-06 20:13:51','2024-06-06 20:13:51',NULL,'',NULL),(5,'Doe','John','tesctc@test.com',1,'2012-04-23 18:25:43','$2b$10$yzB1wgZ7LlvsOEq7OvTsiOtHNvzHwxJuI9Umux.NORiDBLeKGCNAO','011111111',1,'./','2024-06-06 20:15:23','2024-06-06 20:15:23',NULL,'',NULL),(6,'Doe','John','tesctfgffc@test.com',1,'2012-04-23 18:25:43','$2b$10$PKrod9LwSAfc.vD4iN19z.DRFRjgLUvNggBSF1zxHXq6/yAaOHwJm','011111111',1,'./','2024-06-06 20:47:43','2024-06-06 20:47:43',NULL,'',NULL),(7,'Doe','John','tesctfvvvvgffc@test.com',1,'2012-04-23 18:25:43','$2b$10$k/4W6laCta1QP7h2flX0NuYifAMViVBuX/Jh2FcBSFIZlYp87H0he','011111111',1,'./','2024-06-06 20:48:19','2024-06-06 20:48:19',NULL,'',NULL),(8,'Doe','John','tesctfvvvvgvxzcffc@test.com',1,'2012-04-23 18:25:43','$2b$10$lB2ICEDsdIh7ZrsMox.X7eiPodXWPnO9foYNvlOuUHmuR31hHbVSu','011111111',1,'./','2024-06-06 20:48:51','2024-06-06 20:48:51',NULL,'',NULL),(9,'Doe','John','tesctfvvvvcccgvxzcffc@test.com',2,'2012-04-23 18:25:43','$2b$10$hIPAlOvIpddqRoRvtY8jmupDXuYMNdfDkuzzYCi8y0CBex4BGYBf.','05123453255',0,'./','2024-06-06 20:50:09','2024-06-07 13:08:42',NULL,'',NULL),(10,'Doe','John','tesfddffdfddffdt@test.com',1,'2012-04-23 18:25:43','$2b$10$2KouiRkGglA5hhuNrTot7.REcQg22f4R7RMSgMKjvvf5hW4Ap4zMC','011111111',1,'./','2024-06-07 07:59:39','2024-06-07 07:59:39',NULL,'',NULL),(11,'Doe','John','tesfddffddddfddffdt@test.com',1,'2012-04-23 18:25:43','$2b$10$ot/3GnDr.ZE42LBNEKbHuutE93NCeOJE2mP7T0Qrlq./bHOM1UytS','011111111',1,'./','2024-06-07 08:27:48','2024-06-07 08:27:48',NULL,'',NULL),(12,'Doe','John','tesfddffdddffdfddffdt@test.com',1,'2012-04-23 18:25:43','$2b$10$azLbcA0wLBToSKwRZFPMBOc2HcZXqDVhjtUrs2aa3PU5fUXa0RsuS','011111111',1,'./','2024-06-07 09:09:27','2024-06-07 09:09:27',NULL,'',NULL),(13,'Doe','John','tesfddffdddffdfddffssdt@test.com',1,'2012-04-23 18:25:43','$2b$10$vbr3ORn8MmLUpSfn/tTOzuPPLrw1tnuV3LDtsVsJKqFALbEy12lda','011111111',1,'./','2024-06-07 09:09:35','2024-06-07 09:09:35',NULL,'',NULL),(14,'Doe','John','tesfddffdddffdfddffssvvvdt@test.com',1,'2012-04-23 18:25:43','$2b$10$Cn2uS5ldaEI.nmLutMVjVOzpTkhR/weiE2/WxmR.KnQvc7JJJLlhS','011111111',1,'./','2024-06-07 11:59:22','2024-06-07 11:59:22',NULL,'',NULL),(15,'Doe','John','tesfddffdddffdfddffssvvvdddt@test.com',1,'2012-04-23 18:25:43','$2b$10$XVPnvC96GXFZfiaQNLUT1OTZd4BFUxDHv4PQBZ2ukKEYSLSsxRlty','011111111',1,'./','2024-06-07 12:04:12','2024-06-07 12:04:12',NULL,'',NULL),(16,'Doe','John','tesfddffdddffdfddffssvvvddfhjgfdsadt@test.com',1,'2012-04-23 18:25:43','$2b$10$lTSX.wXGt7ZPrIenZEyieOnXoo2XPxmDOq63FlSQU5L4PTVoKAq1a','011111111',1,'./','2024-06-07 13:53:29','2024-06-07 13:53:29',NULL,'',NULL),(17,'Doe','John','arslane@test.fr',2,'2012-04-23 18:25:43','$2b$10$7RPiJt56ynRHXbDorL6l2udKGsaopseezP.FJPu7uz9jn.QVvTO1m','011111111',1,'./','2024-06-07 13:53:51','2024-06-07 13:53:51',NULL,'',NULL),(18,'Doe','John','abc@test.fr',2,'2012-04-23 18:25:43','$2b$10$MZyvwwSXWqAJQN8EYUgPD.2SSZZ92DAn8v2tbSuFdqH82XH20/MOK','011111111',1,'./','2024-06-07 13:57:46','2024-06-07 13:57:46',NULL,'',NULL),(19,'Doe','John','abc@tegst.fr',2,'2012-04-23 18:25:43','$2b$10$3c1kptqJm4X8Pf/PXJqGZO6ZUp4a5Ci39HsOp4HsTJ8YrdB0W7dfK','011111111',1,'./','2024-06-09 18:11:06','2024-06-09 18:11:06',NULL,'',NULL),(20,'Doe','John','abhhc@tegst.fr',2,'2012-04-23 18:25:43','$2b$10$j1tkTgehzEQs.ypPUiTOY.VTjo7/wj/HVJTjEFHXo7yvyIhXZQ6Xe','011111111',1,'./','2024-06-09 19:40:09','2024-06-09 19:40:09',NULL,'',NULL),(21,'Doe','John','ggabhhc@tegst.fr',1,'2012-04-23 18:25:43','$2b$10$4Yk88777/.lOmy8NtDzopeEbtIT6L6Tyw513BqmwwQKhTDhjnCQhq','011111111',1,'./','2024-06-09 19:40:21','2024-06-09 19:40:21',NULL,'',NULL),(23,'Shotboulte','Tarrance','tshotboulte0@twitter.com',5,'1997-12-16 15:19:27','$2a$04$GX5o19sP/NL5HWtLvWW5hO.g3hjPVO0qBuOA/5FvTQ2FPNc8GOsJy','+61 223 424 5596',0,'http://dummyimage.com/230x100.png/cc0000/ffffff','2024-04-26 06:08:58','2024-05-30 04:25:15',NULL,'544 Pennsylvania Trail',NULL),(24,'McIndrew','Lea','lmcindrew1@issuu.com',1,'1975-05-20 16:52:46','$2a$04$eMYYP7AVJ6Mea5qG3ghMU.1BZ7g0Mo7K7XrnvKkuyhwbgQ52E71S6','+380 546 321 8195',0,'http://dummyimage.com/171x100.png/ff4444/ffffff','2024-04-03 02:10:17','2024-05-24 00:56:34',NULL,'2 Prairie Rose Park',NULL),(25,'Copestake','Krista','kcopestake2@mail.ru',3,'1983-08-05 01:27:47','$2a$04$F2.HVktctc60kXwkbX6vG.xMvjkW0C9ZuKiC372X9ZJ.IoosJXVEm','+86 309 950 6089',1,'http://dummyimage.com/233x100.png/dddddd/000000','2024-04-09 21:54:42','2024-04-13 12:47:26',NULL,'26981 Oak Valley Hill',NULL),(26,'Swale','Dulciana','dswale3@shareasale.com',1,'2003-12-30 01:18:36','$2a$04$F9.x5izmINmSkwVjXLghceK.ECtRoRpN/xKZaw3xZ/eENUtKjICA2','+7 127 581 5085',0,'http://dummyimage.com/218x100.png/cc0000/ffffff','2024-04-26 18:06:07','2024-05-21 07:36:06',NULL,'7436 Sage Alley',NULL),(27,'Duetschens','Aimil','aduetschens4@1und1.de',1,'1976-01-27 20:58:34','$2a$04$.8XtjD6bgee.m3k2krWxmeZ7PEMznX7.wZ5MfbjwWWZdevO7WQzg2','+7 970 178 3122',1,'http://dummyimage.com/246x100.png/cc0000/ffffff','2024-01-02 06:36:50','2024-01-13 11:24:51',NULL,'0 Corben Lane',NULL),(28,'Coole','Augustin','acoole5@typepad.com',1,'1990-08-28 15:23:36','$2a$04$sJRpXNf0Q8je7MIFLS0aJOnzLBpAvKQYLLqubfyKXfd751koLtzCy','+63 803 309 5751',1,'http://dummyimage.com/166x100.png/dddddd/000000','2024-04-28 03:01:18','2024-03-15 23:44:40',NULL,'622 Eggendart Trail',NULL),(29,'Kuhne','Charmine','ckuhne6@diigo.com',5,'2017-01-09 01:51:55','$2a$04$3jBAPac/X5OwqsTh.K.v2Olkg5FOa7lVrxMEtJTpvhPxZWfbDKjay','+967 725 611 3892',0,'http://dummyimage.com/203x100.png/cc0000/ffffff','2024-03-15 16:13:33','2024-04-07 17:06:19',NULL,'3517 Glendale Hill',NULL),(30,'Aries','Sayre','saries7@cargocollective.com',4,'1988-10-03 13:55:02','$2a$04$nAIlKSTgnSc/Ht7fU.lfOeklkBVrQqyWmjQWegH4AiFsowGtHflRi','+86 149 235 5330',0,'http://dummyimage.com/200x100.png/cc0000/ffffff','2024-05-30 13:26:33','2024-03-11 12:32:19',NULL,'72534 Carey Street',NULL),(31,'Suff','Giordano','gsuff8@ocn.ne.jp',1,'2013-03-23 02:29:31','$2a$04$YLoSmN2RgTycudntbbFaJuOYa6qGsL35LYsgcdSeEcjkvmaC6qBo6','+7 149 898 8096',0,'http://dummyimage.com/238x100.png/dddddd/000000','2024-06-04 06:53:36','2024-05-29 23:11:00',NULL,'7512 Fordem Way',NULL),(32,'Crownshaw','Kenny','kcrownshaw9@histats.com',4,'2005-03-07 12:44:24','$2a$04$3bPmxK9OMMHJJCbm9SR/JutVhteFsQ21UA78DL8buZSV5rJVI71E.','+86 606 838 1339',0,'http://dummyimage.com/150x100.png/5fa2dd/ffffff','2024-05-15 13:19:07','2024-04-26 17:45:31',NULL,'723 Weeping Birch Court',NULL),(33,'McGiffie','Ludwig','lmcgiffiea@noaa.gov',2,'2009-04-05 13:22:20','$2a$04$VaPMch3rzpNoZceCRur.UuOef8JPJGLfTxS8GaOfVNriq3a1oqJv6','+880 985 306 0668',0,'http://dummyimage.com/192x100.png/5fa2dd/ffffff','2024-01-28 12:19:17','2024-01-03 12:04:41',NULL,'96397 Vernon Alley',NULL),(34,'Winsbury','Henrik','hwinsburyb@opensource.org',2,'2007-01-05 05:47:36','$2a$04$48.AAC8qjFx67PwgJXVPdujHdekUn5lqeLc.vVEDM0uIrY0REmdyS','+86 345 628 4290',0,'http://dummyimage.com/170x100.png/cc0000/ffffff','2024-02-12 19:44:57','2024-04-15 20:35:54',NULL,'00378 Oneill Road',NULL),(35,'Echallie','Jennica','jechalliec@fotki.com',2,'1992-01-24 06:42:56','$2a$04$FOGXSmSIL15nvQiZvZmuQOVaS2e7Wubgtql4zcS2KrGI3mzU2iSW.','+63 296 804 0556',0,'http://dummyimage.com/192x100.png/cc0000/ffffff','2024-05-15 10:15:46','2024-02-26 22:03:20',NULL,'4526 Derek Junction',NULL),(36,'Han','Anders','ahand@accuweather.com',3,'2014-05-09 21:50:40','$2a$04$C1gaSF4CBR6WlYj05lZFSuBWj.owXUQ/4q8qgt7yPpRapYA1oI77S','+31 865 863 3382',0,'http://dummyimage.com/119x100.png/5fa2dd/ffffff','2024-02-18 03:01:36','2024-01-01 02:48:32',NULL,'69027 Magdeline Park',NULL),(37,'Melonby','Skyler','smelonbye@sitemeter.com',1,'2020-07-30 22:48:40','$2a$04$d7HllwGosm3b8iWxXvGsku95P.tquaKjlh.FGYQucbUGyyW3EkASi','+62 914 613 5101',0,'http://dummyimage.com/152x100.png/dddddd/000000','2024-06-08 02:41:19','2024-06-04 23:06:20',NULL,'425 Huxley Pass',NULL),(38,'Duplain','Dukie','dduplainf@nsw.gov.au',2,'2016-08-11 20:59:20','$2a$04$tzLFaDrad3jUT9P7MaDbaOcHLtDRurobRwK4myTSZUwd/150wFFAC','+86 993 639 6052',1,'http://dummyimage.com/209x100.png/dddddd/000000','2024-04-25 01:53:22','2024-03-14 01:14:58',NULL,'182 Cody Center',NULL),(39,'Brakewell','Vere','vbrakewellg@lulu.com',2,'2004-11-06 13:54:05','$2a$04$0nogomx872YRmImVS8YEoOH5BzCZNH6joRQZouAwsDbKw81vUpGYi','+55 267 913 7245',0,'http://dummyimage.com/175x100.png/ff4444/ffffff','2024-02-23 07:15:06','2024-05-26 07:15:32',NULL,'56690 Glacier Hill Crossing',NULL),(40,'Pardue','Livia','lpardueh@europa.eu',5,'2023-11-06 02:22:37','$2a$04$C9r3eggm.IR8ruO1mirxX.f8vAo47iNsgLB998P1Fs2NtUCTj/0oi','+82 318 785 4807',1,'http://dummyimage.com/157x100.png/cc0000/ffffff','2024-05-10 11:01:58','2024-01-07 00:22:49',NULL,'6 Shelley Trail',NULL),(41,'McAree','Baudoin','bmcareei@yale.edu',1,'1975-12-05 12:45:30','$2a$04$7Lz74fx.Sep3JLQixGmTwOrz6fTXG1Ib45AHg8n7rGj0B2DYxmi2i','+86 409 440 3282',1,'http://dummyimage.com/112x100.png/cc0000/ffffff','2024-04-01 13:14:16','2024-05-12 08:44:56',NULL,'26 Reindahl Alley',NULL),(42,'Boatman','Onfroi','oboatmanj@wunderground.com',3,'2021-03-10 18:35:29','$2a$04$W4IiZgDYZkHFv8265E42bOEs0lwkoRc7bGLFtvVontd4PPAgG/1Oa','+1 260 252 8086',0,'http://dummyimage.com/215x100.png/5fa2dd/ffffff','2024-04-01 23:11:19','2024-04-19 08:59:00',NULL,'984 Fisk Drive',NULL),(43,'Dexter','Codi','cdexterk@dyndns.org',1,'1979-09-23 10:08:33','$2a$04$k18XpPQpW4PdcpzEZq5IbeoX89GbG7j.TOiuzl4.NN1eP9sPOdPou','+967 942 968 7687',0,'http://dummyimage.com/177x100.png/dddddd/000000','2024-01-18 15:04:16','2024-02-13 23:20:27',NULL,'6 Cambridge Way',NULL),(44,'Seally','Lana','lseallyl@dot.gov',2,'1997-07-03 18:27:56','$2a$04$yFlA5yxcB2L29O1ISTU5G.kDfupk0N.7gpJgFnxoFqzLhIpxJHqp2','+7 582 538 0683',1,'http://dummyimage.com/117x100.png/cc0000/ffffff','2024-03-13 16:51:13','2024-02-25 08:33:01',NULL,'9 Memorial Trail',NULL),(45,'Cleary','Webster','wclearym@walmart.com',2,'1972-11-05 23:09:33','$2a$04$SIONWfaVjgOio7eklQ0bl.ZR7Y6tzojTU9hbx8.WZXHC7KuPhrNFW','+30 575 719 3413',0,'http://dummyimage.com/112x100.png/ff4444/ffffff','2024-02-04 08:00:44','2024-03-11 10:47:42',NULL,'832 Fairview Plaza','2024-02-24 16:22:12'),(46,'Giscken','Ariel','agisckenn@people.com.cn',5,'2007-09-18 21:08:09','$2a$04$E6lJHgqYK8mDiylwz.ZOoeh6GByCGTyQaIUKRa.ZrBQ6RArr14cM.','+373 691 907 8074',1,'http://dummyimage.com/162x100.png/5fa2dd/ffffff','2024-01-12 23:10:45','2024-04-07 10:22:04',NULL,'90 New Castle Street',NULL),(47,'Felten','Bryana','bfelteno@bigcartel.com',4,'1997-12-20 10:15:48','$2a$04$pUkMuTY9oupMV6oN/gJvTOLdPkWjuUOezcXXj/hEeGNezywzBl37q','+33 775 491 4573',1,'http://dummyimage.com/152x100.png/5fa2dd/ffffff','2024-02-27 00:07:59','2024-04-08 11:31:57',NULL,'95286 Memorial Parkway',NULL),(48,'Oaks','Elizabet','eoaksp@auda.org.au',4,'1975-09-18 20:23:35','$2a$04$z.uK8AexgM6fQYiwg9AuBef.IncN.RbH3EmyCy4k5QAbn61eWFBqq','+258 211 649 9359',1,'http://dummyimage.com/217x100.png/ff4444/ffffff','2024-01-08 09:46:14','2024-02-25 02:56:11',NULL,'7912 Morning Center',NULL),(49,'Sertin','Kathryn','ksertinq@photobucket.com',3,'2005-04-13 15:14:27','$2a$04$bb1eMLX2QgTXbHZe/6dJQ.RwbY5M4s8drRBrK/2id13TzzHDRIWvm','+976 474 180 6076',0,'http://dummyimage.com/144x100.png/ff4444/ffffff','2024-03-26 21:20:57','2024-03-19 03:34:11',NULL,'8444 Merchant Point',NULL),(50,'Buckles','Antonino','abucklesr@economist.com',1,'2012-09-29 08:00:16','$2a$04$z5VIH9QfD4UHnqnaQ0lpcOC7pNi2EqdlEHVUsPeDRr/JNEjpr4mIa','+51 243 738 7783',1,'http://dummyimage.com/197x100.png/ff4444/ffffff','2024-03-11 21:53:09','2024-05-09 21:26:30',NULL,'914 Linden Street','2024-04-03 23:44:19'),(51,'Rustman','Susette','srustmans@linkedin.com',5,'2011-07-03 17:00:45','$2a$04$cNbCa3JdifK6qQUS9PXVZOJ9J1kM1sNh/Sl1zqSxQ6eQSi.7ria.O','+86 965 190 7641',1,'http://dummyimage.com/196x100.png/ff4444/ffffff','2024-03-11 18:26:54','2024-03-11 17:40:10',NULL,'40721 Hazelcrest Lane',NULL),(52,'Gianneschi','Eberto','egianneschit@mashable.com',3,'2014-06-28 07:54:55','$2a$04$5G7k4ea6qSQu/0d0G5SzfeJso4h0o5fyE0NPz/Y3Y5wXI5xOzFtFS','+86 311 595 9548',0,'http://dummyimage.com/179x100.png/5fa2dd/ffffff','2024-01-21 21:33:59','2024-05-08 15:47:38',NULL,'1 Hermina Way',NULL),(53,'Lagadu','Nanine','nlagaduu@indiegogo.com',2,'1973-07-06 08:29:31','$2a$04$zzURrfKMI5Fyw6x709D9fu91Owba6WFv4tjOX/lcFx6H1j/v3B15W','+256 273 166 8379',1,'http://dummyimage.com/205x100.png/dddddd/000000','2024-01-04 03:04:18','2024-03-15 20:28:12',NULL,'66 Johnson Circle',NULL),(54,'Oylett','Mar','moylettv@marriott.com',5,'1987-03-18 15:21:18','$2a$04$C6WFaUlkvH85XBYTTP3CQO4ibrvQvZgb2snW9.f722Y0TWoDkwhie','+850 662 411 8959',0,'http://dummyimage.com/205x100.png/5fa2dd/ffffff','2024-06-03 10:31:35','2024-02-15 14:59:29',NULL,'31 Almo Point',NULL),(55,'Doggerell','Birk','bdoggerellw@buzzfeed.com',1,'2007-08-27 18:17:31','$2a$04$/qwT6NlrfL5RCiKcK.zwR.iMtTyJ1bqhLY8srcAyrD2EvdZQwRawm','+502 241 268 6001',1,'http://dummyimage.com/150x100.png/cc0000/ffffff','2024-03-13 00:29:19','2024-05-24 03:51:08',NULL,'954 Crescent Oaks Trail',NULL),(56,'Morton','Haslett','hmortonx@google.cn',5,'1981-02-17 08:27:50','$2a$04$oU4Kh6U.On0b/JVhwrHV6uBOroo66/KyRnwCKtOBpXqKDUOA4dklK','+63 853 841 2668',0,'http://dummyimage.com/104x100.png/ff4444/ffffff','2024-05-08 19:51:49','2024-01-07 13:59:08',NULL,'72 Sauthoff Avenue',NULL),(57,'Hulcoop','Anatol','ahulcoopy@engadget.com',2,'2000-05-26 19:31:17','$2a$04$1vx5thb/9p.NT0g5GJdb4uPgZCaZXbTk/IwoSLdiu6mM6QP/VZi3W','+86 952 390 8355',0,'http://dummyimage.com/150x100.png/ff4444/ffffff','2024-03-28 16:54:53','2024-02-29 21:05:23',NULL,'8179 Center Point',NULL),(58,'Bourges','Odelle','obourgesz@nydailynews.com',4,'1980-05-11 13:35:19','$2a$04$k29eLkJTgUi68eda3zkQEOdwQJKurD/wBBXwlyE2TP8bbXsFsGhBK','+7 694 933 9913',0,'http://dummyimage.com/239x100.png/cc0000/ffffff','2024-01-31 22:06:45','2024-06-08 03:26:52',NULL,'702 Montana Plaza',NULL),(59,'Scroggins','Wolfy','wscroggins10@mozilla.org',4,'2015-09-18 21:55:43','$2a$04$sDCJ/Rox1StUuSFUiXasYe9WKONjNCF18dn7ZMKmL4VVZCUvF9ih6','+62 421 221 6147',1,'http://dummyimage.com/160x100.png/cc0000/ffffff','2024-01-15 13:09:12','2024-03-16 01:26:12',NULL,'283 Brentwood Plaza',NULL),(60,'Bothwell','Nerty','nbothwell11@upenn.edu',2,'2003-01-29 11:57:59','$2a$04$.sj5MNCsGKbKz0JguyHS3OOY7ZOXoRD7BjhMfzZo.EHOdzeu4p4Fy','+33 497 869 1036',1,'http://dummyimage.com/209x100.png/dddddd/000000','2024-01-23 19:10:06','2024-02-09 18:39:02',NULL,'6 Esch Avenue',NULL),(61,'L\'Homme','Horten','hlhomme12@jugem.jp',3,'2020-02-13 20:44:15','$2a$04$1mg2K8cQ1uAyWepFjQgO4.gHhCNUg0JOCEAMH3ixjE1C58wkb0xES','+506 167 842 0136',1,'http://dummyimage.com/198x100.png/dddddd/000000','2024-04-13 15:34:44','2024-03-31 14:30:15',NULL,'7575 Dapin Point',NULL),(62,'Beauly','Annetta','abeauly13@sitemeter.com',3,'2016-02-01 04:06:27','$2a$04$atl9OydJbXOvUlvA/zlu4uSE.Np1H/fcF.0y/UT2cIxKI6Yxm2iza','+45 828 791 9865',1,'http://dummyimage.com/211x100.png/cc0000/ffffff','2024-01-09 06:00:59','2024-04-17 11:31:26',NULL,'85800 Melby Point',NULL),(63,'Ronaldson','Eddy','eronaldson14@unblog.fr',2,'2023-04-28 15:49:27','$2a$04$vsI0GE8zMrOIzKdx96kJ4OdGRaZJJrpUkKsEqAgrfvpSlR.x9160u','+1 816 368 8247',0,'http://dummyimage.com/157x100.png/5fa2dd/ffffff','2024-03-02 23:25:00','2024-02-05 11:44:24',NULL,'359 Oneill Circle',NULL),(64,'Skitch','Jecho','jskitch15@home.pl',1,'1993-06-09 16:15:52','$2a$04$9D7aaTTF5eeOfu59zSL2muksAPMwYcKp5xM1reoyVZSWq9rtiT4B.','+7 222 457 9766',1,'http://dummyimage.com/209x100.png/cc0000/ffffff','2024-03-24 17:03:18','2024-03-10 07:15:54',NULL,'33209 Fieldstone Terrace',NULL),(65,'Velte','Frankie','fvelte16@cnet.com',4,'1978-12-16 16:54:30','$2a$04$dY.mkTQ/ps2HH3g3Kl/s7.c3hxbt0cB1khIsFo8EcGcKQ0vIKHvBu','+86 945 101 3412',1,'http://dummyimage.com/103x100.png/cc0000/ffffff','2024-01-17 20:28:06','2024-02-04 14:22:21',NULL,'27713 Sunbrook Place',NULL),(66,'Newling','Tatum','tnewling17@google.es',3,'2016-11-04 23:02:30','$2a$04$SI84znWw8ZwAAUvfZAzNP.rPtA92aTjHDpVXibc2GEhBviBUIK0Cm','+7 846 357 4764',1,'http://dummyimage.com/183x100.png/cc0000/ffffff','2024-05-14 00:38:26','2024-06-06 07:52:12',NULL,'54 Caliangt Court','2024-05-31 01:53:02'),(67,'Follos','Joanie','jfollos18@tripod.com',1,'2007-02-03 03:29:23','$2a$04$rRtZ/yrIZ3Ia7IKYFvML3eZwo7U4vQ102.tIRlpylBdY6nM8O/JWu','+86 387 823 8088',0,'http://dummyimage.com/134x100.png/ff4444/ffffff','2024-03-08 13:48:00','2024-05-24 09:28:45',NULL,'441 Dawn Trail',NULL),(68,'Realy','Seana','srealy19@cocolog-nifty.com',1,'2000-05-02 09:48:37','$2a$04$aF9G6U2Wfl34andfNIZHvuDfbXD4YzH2Ofbz6uT/Ch4Y/7diuq7wO','+64 680 401 8933',1,'http://dummyimage.com/221x100.png/dddddd/000000','2024-03-29 19:08:58','2024-01-11 09:03:41',NULL,'90547 Everett Hill',NULL),(69,'Bice','Alf','abice1a@prlog.org',3,'1986-12-10 17:17:36','$2a$04$DGNBQVUGdoSi/bcfXS9pz.KZzLHcHCspZHOgqeaBKC4ZqgznOK1ta','+54 486 295 0858',1,'http://dummyimage.com/197x100.png/cc0000/ffffff','2024-04-20 18:42:33','2024-04-13 13:14:00',NULL,'11 Spohn Way',NULL),(70,'Gritten','Madonna','mgritten1b@auda.org.au',2,'1997-04-26 20:01:36','$2a$04$acjf5uQw2ZQXXAZE2.Jw/OtYfnmKLIcFAqeK5Gh9mFm8fVjYboyhG','+1 209 235 4083',1,'http://dummyimage.com/126x100.png/5fa2dd/ffffff','2024-02-04 16:37:01','2024-02-25 11:08:43',NULL,'8 Amoth Crossing',NULL),(71,'Giercke','Ollie','ogiercke1c@de.vu',5,'1973-10-25 10:50:12','$2a$04$8QjiDXbw4INtvxqWQrBaju3JmstSW5QpUG4X/eURF9SPj1wgj454q','+82 521 734 6899',1,'http://dummyimage.com/209x100.png/cc0000/ffffff','2024-05-24 08:25:33','2024-04-15 10:17:31',NULL,'2502 Pine View Avenue',NULL),(72,'Tremblay','Reggis','rtremblay1d@ox.ac.uk',1,'1982-10-22 11:07:27','$2a$04$DeLI4w/GwOJ6H4q4Zvd9Peo7Gu7zpvqdAiyH0GPT/pH6ymCCCKrai','+92 113 299 0181',1,'http://dummyimage.com/113x100.png/cc0000/ffffff','2024-04-27 17:32:48','2024-05-22 16:36:30',NULL,'10103 Bunting Parkway',NULL),(73,'Gratten','Mick','mgratten1e@biblegateway.com',1,'2014-10-04 03:20:37','$2a$04$kAm3BuCHpJ3FYkBWCWZCQezUZBkLbAPjTQBsICRN/iu07CFuHSU32','+389 215 670 3595',1,'http://dummyimage.com/129x100.png/dddddd/000000','2024-02-08 09:22:53','2024-01-25 19:03:17',NULL,'548 Comanche Point',NULL),(74,'Tibbits','Gwendolyn','gtibbits1f@statcounter.com',3,'2006-11-23 14:52:42','$2a$04$GdASIazdSmnAUSutLSHI8udapP1C/9Ro9tWc73602DUkuPfQc9XoS','+46 605 859 6398',0,'http://dummyimage.com/165x100.png/cc0000/ffffff','2024-03-31 10:51:52','2024-01-11 19:41:38',NULL,'6 Bowman Crossing',NULL),(75,'Harsnipe','Harold','hharsnipe1g@thetimes.co.uk',4,'1998-06-17 23:29:43','$2a$04$zYzw6B9O5HM/6rhfJ.l26eIqswlWmjYB2cfQxXFOrXefO3O5YExFW','+351 817 778 4858',1,'http://dummyimage.com/144x100.png/ff4444/ffffff','2024-03-20 16:32:06','2024-01-12 19:46:38',NULL,'6 Fremont Drive',NULL),(76,'Hurne','Marnia','mhurne1h@furl.net',5,'1987-07-20 22:56:13','$2a$04$7hj9vCZRDhIKiT4vdR5Z2ehgT/mbamykN/r/gh.Mx4CgSD57DR/Y2','+81 811 256 7069',1,'http://dummyimage.com/119x100.png/5fa2dd/ffffff','2024-03-25 06:26:45','2024-04-23 15:40:12',NULL,'7 Golf View Hill',NULL),(77,'Cosens','Alexandrina','acosens1i@google.cn',5,'2007-03-24 00:09:11','$2a$04$/5WJegZr8TXK7Uw3JIvP2eWG/2juUf0MpfKkcrCJAWy4iwKYT3Vxu','+86 432 469 3685',1,'http://dummyimage.com/208x100.png/5fa2dd/ffffff','2024-04-30 23:05:56','2024-03-07 14:00:18',NULL,'94 Corscot Avenue','2024-02-11 03:57:30'),(78,'McKaile','Suellen','smckaile1j@lycos.com',1,'2004-07-09 17:03:11','$2a$04$vdUGLGAUodP64ap0TELM3Otu5AqJw3txQhrO8aBmP9tTRG5gC0HNy','+33 671 568 4682',0,'http://dummyimage.com/222x100.png/5fa2dd/ffffff','2024-05-25 15:36:40','2024-06-03 06:45:47',NULL,'5992 Quincy Crossing','2024-03-04 14:09:38'),(79,'Layton','Rudy','rlayton1k@miitbeian.gov.cn',5,'1977-05-14 23:04:46','$2a$04$Xzyi2/Gj4GIcFYwXxmExiOLj7.X2iURBITj471y1H2YSRkYyjeVxW','+972 673 352 3705',0,'http://dummyimage.com/163x100.png/dddddd/000000','2024-04-08 02:16:11','2024-05-11 23:47:16',NULL,'841 Dayton Plaza',NULL),(80,'Gever','Paulina','pgever1l@jigsy.com',1,'1971-02-20 16:56:10','$2a$04$e4TzjYAEoLPW80m7wK05neL5kFgn.0ZRfPr0XnJ1Pmw2d3jClueAu','+86 704 429 3397',1,'http://dummyimage.com/169x100.png/cc0000/ffffff','2024-04-15 18:49:20','2024-01-20 11:10:26',NULL,'37034 Arrowood Plaza',NULL),(81,'Hobble','Clementia','chobble1m@usnews.com',2,'1977-07-06 19:22:44','$2a$04$1oF8CfILYDJWQAy4GSfkDeaBM05cbI898kjp66g.Yl.o3WM.raxGi','+51 805 827 2637',0,'http://dummyimage.com/211x100.png/cc0000/ffffff','2024-01-30 09:06:56','2024-05-19 02:38:12',NULL,'92 Mesta Trail',NULL),(82,'Newby','Paula','pnewby1n@hostgator.com',1,'2010-09-23 05:37:16','$2a$04$nk/Eh3Pr3UTDHw3DEy9fKuxH/A0QWXAFpIsAGVBz0WIWNULlE6jZW','+63 859 678 5394',1,'http://dummyimage.com/138x100.png/dddddd/000000','2024-05-08 01:04:33','2024-02-24 00:20:34',NULL,'44938 Prentice Parkway',NULL),(83,'Arrighini','Quinlan','qarrighini1o@nsw.gov.au',4,'1994-02-07 09:57:34','$2a$04$AQCAYTicy9lcgJ7hR8W6CuVHOr93TVo3oJHf6YIlcd0sDXFrWf3Bi','+62 773 230 6003',1,'http://dummyimage.com/177x100.png/5fa2dd/ffffff','2024-04-24 01:30:27','2024-02-21 06:14:26',NULL,'1 Lien Plaza',NULL),(84,'Hairesnape','Gaye','ghairesnape1p@sohu.com',5,'1971-04-25 02:23:28','$2a$04$/6l0GvVJJf0nbIIdGsyOMOU/1upPtm8QmMm3mzK/S8Z5TvBFpxM.u','+98 999 475 0917',0,'http://dummyimage.com/197x100.png/ff4444/ffffff','2024-02-15 11:31:56','2024-02-12 09:20:30',NULL,'24909 Meadow Valley Place',NULL),(85,'Fidele','Tarrance','tfidele1q@squidoo.com',4,'2024-05-31 07:10:57','$2a$04$QjDLIDreidaLGaReQm9l9Ok9jCAJLirK93dC53g3I.WqTXaKz.rU6','+886 999 740 2933',1,'http://dummyimage.com/175x100.png/5fa2dd/ffffff','2024-04-23 17:35:19','2024-02-12 15:05:41',NULL,'3 Darwin Road',NULL),(86,'Slany','Astra','aslany1r@jugem.jp',1,'2008-10-28 09:15:12','$2a$04$7G78ADy2zut8/xkT.R64/uY.91ZZ/psgA38VeC.4knaE6bRYEHxNG','+55 350 698 4763',1,'http://dummyimage.com/101x100.png/ff4444/ffffff','2024-05-14 13:43:42','2024-02-26 08:45:12',NULL,'6463 Kim Street',NULL),(87,'Clipston','Lurleen','lclipston1s@sina.com.cn',3,'2000-10-08 14:05:22','$2a$04$7mJvecVZfjOoJvqevLRMB.N4vm7sI.nhxUTu7y94q6RI9h4bq7C6G','+998 468 504 5627',1,'http://dummyimage.com/134x100.png/ff4444/ffffff','2024-04-08 04:54:11','2024-01-11 03:33:12',NULL,'28723 Crescent Oaks Circle',NULL),(88,'Sleicht','Ingrim','isleicht1t@free.fr',5,'2012-02-03 11:47:35','$2a$04$e89Vn4TSaylcxq87H2O42OPVSf.Nlt5iBhWnASUQT8dscNet0NUJG','+62 862 766 6250',0,'http://dummyimage.com/190x100.png/ff4444/ffffff','2024-06-07 12:10:34','2024-01-03 22:33:07',NULL,'15563 Shelley Way',NULL),(89,'Dunseith','Carolee','cdunseith1u@phpbb.com',3,'1986-02-26 17:13:48','$2a$04$4P98ZUzpEn68GtNwO86fF.1pWdvHZV4JR8O4Vgl3.XoIyfP2O1ILu','+299 102 428 0491',1,'http://dummyimage.com/194x100.png/dddddd/000000','2024-03-15 15:19:22','2024-02-26 07:23:33',NULL,'8176 Caliangt Point','2024-02-02 03:42:52'),(90,'Brinkworth','Stavro','sbrinkworth1v@list-manage.com',2,'2023-06-22 06:42:22','$2a$04$Q/kAMPgpiCyAhnGw5WznIuHxOBGu5FpD46nFwMQJUDhythh7QFzom','+86 356 964 1024',1,'http://dummyimage.com/239x100.png/cc0000/ffffff','2024-01-11 16:26:58','2024-06-05 03:39:04',NULL,'920 Lake View Drive',NULL),(91,'Coulthart','Patrizio','pcoulthart1w@facebook.com',5,'1985-08-08 08:58:23','$2a$04$L2sYAkxERfhTfQPY9UxzQuNslDajtnHoTPYcjWiqB.eKLQJqqZvuq','+52 576 373 1709',0,'http://dummyimage.com/181x100.png/ff4444/ffffff','2024-02-28 08:12:14','2024-04-27 05:06:28',NULL,'3536 Portage Junction',NULL),(92,'Bewick','Dosi','dbewick1x@acquirethisname.com',5,'2004-05-27 21:41:02','$2a$04$LH7M.hZUYCxDZTbvW6kJkOGm8/R9pPlS4LpvQAQJEJyJCXNzxeQJm','+51 679 859 4900',0,'http://dummyimage.com/212x100.png/dddddd/000000','2024-06-09 23:46:47','2024-04-14 07:54:25',NULL,'5 Harper Hill',NULL),(93,'Pietraszek','Aleksandr','apietraszek1y@ifeng.com',2,'1985-01-03 20:33:48','$2a$04$ILQXaqzHuNWER8Ax3wshIu.M1M4XnIGmzT05sW.58CKXfG7oYyuf2','+7 365 773 7354',0,'http://dummyimage.com/114x100.png/dddddd/000000','2024-05-22 08:53:58','2024-03-25 00:41:08',NULL,'4 Randy Terrace',NULL),(94,'Simkiss','Kim','ksimkiss1z@ftc.gov',3,'2010-09-22 04:55:37','$2a$04$vep0uVDcYd94mK58v8r4buQ2MkNPhnY9Em1lfvOpJav8JU7EAftBi','+1 435 160 5845',0,'http://dummyimage.com/168x100.png/dddddd/000000','2024-05-08 17:36:37','2024-06-09 12:42:11',NULL,'1643 Carpenter Terrace',NULL),(95,'Flay','Orv','oflay20@nymag.com',1,'2015-01-09 01:20:30','$2a$04$d1rjcKV/8kJYJVcXxmkM/.DV9D2Gxpnh2BLEAYDvN61Fiyccyv04m','+48 626 643 2716',0,'http://dummyimage.com/201x100.png/5fa2dd/ffffff','2024-02-16 19:05:47','2024-03-18 19:47:23',NULL,'82377 Utah Court',NULL),(96,'Urquhart','Julee','jurquhart21@phoca.cz',2,'1994-03-02 08:29:24','$2a$04$2hoBTmQA50.zQXYvtFWo0uIKwzchstSMaEPQYJNZKCaS3bHhNd4SS','+52 500 230 1578',1,'http://dummyimage.com/105x100.png/dddddd/000000','2024-02-26 23:34:37','2024-02-16 09:29:40',NULL,'12 Nobel Point',NULL),(97,'Mebs','Sybil','smebs22@marketwatch.com',2,'1985-07-16 10:29:36','$2a$04$b0dS85kLhlIKAIzRv8PI6OpI51QPHCefHTcyT7PE.pPTLPpIwdEYK','+48 892 542 1364',1,'http://dummyimage.com/198x100.png/5fa2dd/ffffff','2024-03-28 07:31:35','2024-01-14 18:50:26',NULL,'90 Dawn Road',NULL),(98,'Thistleton','Jobey','jthistleton23@unesco.org',3,'2017-04-09 21:41:50','$2a$04$H0Xy0.Sq535NmIUNYi/2Cu98MxvURXwOYcrG34Cflm8W9w2mETT9y','+420 279 771 6911',0,'http://dummyimage.com/173x100.png/5fa2dd/ffffff','2024-02-12 05:43:32','2024-01-01 10:11:06',NULL,'47 Park Meadow Crossing',NULL),(99,'Featherstonhaugh','Vinnie','vfeatherstonhaugh24@bravesites.com',3,'2020-04-05 01:18:21','$2a$04$9qfUlHandkKjq867H0SMC.3ZTnjHRWRxfoLL6VXLJmvzml7Ccxjma','+1 426 174 1803',0,'http://dummyimage.com/146x100.png/ff4444/ffffff','2024-04-28 23:23:03','2024-06-03 21:14:28',NULL,'2200 Fieldstone Lane',NULL),(100,'Moughton','Rufe','rmoughton25@google.ca',2,'1979-02-11 05:27:57','$2a$04$gEI0xJbjR4FKg.tOyBt7O.pDPU3Xmx0FgBRSHIKymA/LGlJKwaYE.','+351 392 527 1051',1,'http://dummyimage.com/185x100.png/ff4444/ffffff','2024-04-03 23:25:43','2024-05-05 15:22:44',NULL,'91287 Ridge Oak Trail',NULL),(101,'Bowick','Adair','abowick26@huffingtonpost.com',3,'2003-01-17 12:25:04','$2a$04$ZUsbnMWDSKXywvDvZ8Gobe8QbHnmWBIppUmk91/DENb.Nw2mGaXR.','+86 835 104 9554',0,'http://dummyimage.com/165x100.png/ff4444/ffffff','2024-03-10 10:12:13','2024-02-27 05:32:24',NULL,'33453 Prairieview Road',NULL),(102,'Eilles','Mollie','meilles27@blogger.com',1,'1980-02-29 23:27:19','$2a$04$0CjO6cz/ea7Rud7lvoDcUO0vh3wiFub5vRQASen39bIvSNdPbVRka','+86 774 683 0963',0,'http://dummyimage.com/154x100.png/cc0000/ffffff','2024-02-04 03:19:32','2024-01-31 14:53:47',NULL,'2 Kennedy Avenue',NULL),(103,'Bernardos','Tess','tbernardos28@wordpress.org',1,'1984-12-07 00:32:16','$2a$04$xrKZmaERm7u8rJFoSjmr5.GXCRkVg3I2g/O.Fw7x0WsV7/yA8KYPy','+976 537 775 1161',1,'http://dummyimage.com/202x100.png/5fa2dd/ffffff','2024-06-01 17:29:25','2024-05-15 13:52:52',NULL,'331 Canary Crossing','2024-02-17 01:12:02'),(104,'Jenton','Massimiliano','mjenton29@who.int',4,'2012-08-30 17:46:03','$2a$04$WicvkjYqLFiVKI4kB26jVeH7rnNKR8tSxgkySe1599VLck40NPQMq','+48 299 914 3609',0,'http://dummyimage.com/114x100.png/dddddd/000000','2024-05-26 18:05:47','2024-04-03 13:25:56',NULL,'48 5th Drive',NULL),(105,'Ivey','Domini','divey2a@smugmug.com',2,'2006-02-19 01:00:40','$2a$04$E8zsbWJFjJAGxdDH9tQJVusyFhA0cKBMfu8teACQnr3EDnr81kFbe','+82 450 898 4947',1,'http://dummyimage.com/170x100.png/ff4444/ffffff','2024-04-29 00:14:37','2024-03-20 02:52:31',NULL,'13 Elgar Place',NULL),(106,'Lacase','Welby','wlacase2b@friendfeed.com',5,'1989-07-23 02:57:10','$2a$04$Hj1/t4a6.5uumENUI9QVeerphGP63B/zyS5ioWRniyPxuwvHLoqGe','+62 955 748 2727',1,'http://dummyimage.com/247x100.png/5fa2dd/ffffff','2024-03-27 17:11:47','2024-02-15 14:08:20',NULL,'65 Bunting Crossing',NULL),(107,'Cacacie','Tessi','tcacacie2c@1688.com',1,'2021-06-03 03:46:34','$2a$04$bKJBesRbrjHmTkuY.NbmIuqXZrLruNADSV5TZRT24w9uxSIzdaHDO','+63 403 939 6209',1,'http://dummyimage.com/216x100.png/5fa2dd/ffffff','2024-01-30 01:07:32','2024-05-24 13:28:57',NULL,'5677 Clarendon Parkway',NULL),(108,'Oury','Benji','boury2d@independent.co.uk',3,'1988-10-01 13:38:29','$2a$04$gFmu6ycSofrFcDjJS7oKYeDuOo8c10y5UpYuyJGgtHHKBm4CMoLsW','+48 765 666 0660',1,'http://dummyimage.com/125x100.png/5fa2dd/ffffff','2024-01-13 18:55:34','2024-04-15 03:36:47',NULL,'5 Warrior Pass',NULL),(109,'MacClure','Hayden','hmacclure2e@yelp.com',4,'2012-03-19 14:33:19','$2a$04$xfd4oO1CTlr9vs3Qgi.qz.942cY8Dh24KOP8pAVo4mpr1bfikCebq','+86 199 526 7978',0,'http://dummyimage.com/225x100.png/dddddd/000000','2024-02-16 05:46:55','2024-01-13 09:39:05',NULL,'926 Oriole Crossing',NULL),(110,'Szymonwicz','Neala','nszymonwicz2f@etsy.com',3,'1979-08-29 09:41:46','$2a$04$H/S0FtU.zK1xw9MvUYVw3OHi1pXS4jetZNMFjwQfuXpfIMIDykicC','+86 515 226 0423',0,'http://dummyimage.com/112x100.png/cc0000/ffffff','2024-01-27 10:50:58','2024-06-07 00:08:19',NULL,'25514 2nd Hill',NULL),(111,'Kettleson','Jillayne','jkettleson2g@ezinearticles.com',2,'1994-10-10 22:17:01','$2a$04$yfSkaIjL8mmplkQbSH/Y0OnxFDFQBeQUXN3cwV/O3mOPctpPLLp5y','+66 808 214 1829',0,'http://dummyimage.com/188x100.png/dddddd/000000','2024-02-11 11:33:05','2024-03-02 05:28:31',NULL,'1 Northview Plaza','2024-01-15 21:27:58'),(112,'Gallego','Auberon','agallego2h@bizjournals.com',4,'1980-09-05 06:18:29','$2a$04$0qDgwJcY44XXlAsrr2a.Fe.lft7bQdbnh.8BNl5YV1RPG4dH2Gru.','+503 978 206 6348',1,'http://dummyimage.com/185x100.png/5fa2dd/ffffff','2024-03-29 02:03:07','2024-03-03 09:44:55',NULL,'16698 Comanche Hill',NULL),(113,'Tapp','Wendall','wtapp2i@yolasite.com',1,'1995-06-27 07:29:22','$2a$04$FZBzPFr9QW7tSAOdF354Y.LPkp2KbYfpCLLvExpmCnv5cDUyqFEmK','+63 212 293 7733',1,'http://dummyimage.com/184x100.png/ff4444/ffffff','2024-03-08 07:54:48','2024-04-21 10:10:59',NULL,'8 Randy Point',NULL),(114,'Gonnelly','Domenic','dgonnelly2j@webnode.com',5,'2021-11-03 23:08:21','$2a$04$l6WZGdi83TLpPDVR9dthwuxX1krDRRh2/1uIkwDGQAG11lDlaeBs.','+55 211 718 3693',0,'http://dummyimage.com/163x100.png/cc0000/ffffff','2024-04-05 14:59:00','2024-06-05 11:48:25',NULL,'70 Eliot Parkway',NULL),(115,'Dorset','Gabbie','gdorset2k@opera.com',5,'2013-01-07 15:35:58','$2a$04$nzE9jkDmWPRSxNYoacO6nuBrfk76EvDiTBbB9g8XktMtJQfdbrF1C','+30 266 970 0278',0,'http://dummyimage.com/154x100.png/ff4444/ffffff','2024-05-07 00:25:32','2024-01-23 21:39:25',NULL,'484 Emmet Street',NULL),(116,'Barkas','King','kbarkas2l@free.fr',4,'1982-04-21 16:04:25','$2a$04$ffPF0VucMcYWMFcZ1a8tfuyKpxjUV7CF.PzoXt/4Y4nwViqoIsoo6','+81 357 683 3078',0,'http://dummyimage.com/123x100.png/dddddd/000000','2024-04-27 15:24:16','2024-05-11 01:12:04',NULL,'64 Doe Crossing Hill',NULL),(117,'Lambourn','Gerianne','glambourn2m@prweb.com',5,'2019-01-07 22:03:27','$2a$04$.dnQ6GX3xHW35w5qRlOSLekEvput6RYHaCxuzhTxhV3i9q5mR/Dge','+387 438 367 5314',0,'http://dummyimage.com/155x100.png/dddddd/000000','2024-02-21 14:15:48','2024-01-27 23:35:56',NULL,'770 Mesta Hill',NULL),(118,'Brisbane','Cordey','cbrisbane2n@slideshare.net',2,'1999-04-19 19:32:14','$2a$04$eTTdgEwihzRaNYicC8bsO.plfExIldi0EbV2bnXTHUog7MGMVNXNW','+86 979 729 9576',0,'http://dummyimage.com/209x100.png/5fa2dd/ffffff','2024-01-05 06:48:47','2024-04-07 09:32:48',NULL,'3946 Eastlawn Lane',NULL),(119,'Sibbe','Aileen','asibbe2o@newyorker.com',4,'1971-09-28 03:01:48','$2a$04$xRo9E7.8.kbZiUGdJnbT/.l2FckoRLa6pyFb2PpzrtB2gcoJ/7zyK','+7 532 416 5036',1,'http://dummyimage.com/226x100.png/5fa2dd/ffffff','2024-02-28 06:03:40','2024-01-06 02:35:40',NULL,'47 Bultman Point',NULL),(120,'Vickarman','Mattias','mvickarman2p@toplist.cz',3,'1983-04-06 12:50:03','$2a$04$O/km/7H9EdkZLTPTtPY3ju3SZHrlW6EIWTRwixR5vsLbTe8LMmnrW','+62 686 891 6704',0,'http://dummyimage.com/194x100.png/ff4444/ffffff','2024-01-11 11:55:40','2024-05-17 15:45:10',NULL,'8380 Artisan Drive',NULL),(121,'Rosendale','Boone','brosendale2q@amazonaws.com',2,'1983-08-03 09:45:01','$2a$04$aE1i8QqcoIYHTd45PJLHLO2Zs0uX7benMTGm5./VL5wHqJNLika.e','+86 784 663 1221',1,'http://dummyimage.com/189x100.png/cc0000/ffffff','2024-04-10 18:40:28','2024-02-09 19:00:17',NULL,'8 Brown Alley',NULL),(122,'Buntine','Lesley','lbuntine2r@google.com.au',5,'2009-11-19 05:28:43','$2a$04$17kbL9GM48OSiW/HBz.NF.SlzP4Lzzx88T1cVCaG7buUiqXyp1mBW','+55 709 301 6967',0,'http://dummyimage.com/170x100.png/dddddd/000000','2024-02-28 21:30:55','2024-03-25 01:24:43',NULL,'46560 Colorado Crossing',NULL),(123,'Doe','John','arslane@ceseats.fr',1,'2012-04-23 18:25:43','$2b$10$fd/G4oc.Wpc5KpuQJma/mOhluLzPLfFW.WBqtrvYxsLZYkxAI/OsS','011111111',1,'./','2024-06-11 13:50:25','2024-06-11 13:50:25',NULL,'',NULL),(124,'Doe','John','arslane2@ceseats.fr',2,'2012-04-23 18:25:43','$2b$10$/3ONRASZaWfdTl812K2Pa.raDdNbRaxTTqB7MpZ1iFyYeEiKQKU6.','011111111',1,'./','2024-06-12 07:17:38','2024-06-12 07:17:38',NULL,'',NULL);

/*!40000 ALTER TABLE `compte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livraisons`
--

DROP TABLE IF EXISTS `livraisons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livraisons` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `id_livreur` int NOT NULL,
  `adresse_depart` varchar(255) NOT NULL,
  `adresse_livraison` varchar(255) NOT NULL,
  `type_transport` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `validated_at` timestamp NOT NULL,
  `picked_up_at` timestamp NOT NULL,
  `delivered_at` timestamp NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `id_livreur` (`id_livreur`),
  CONSTRAINT `livraisons_ibfk_1` FOREIGN KEY (`id_livreur`) REFERENCES `compte` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livraisons`
--

LOCK TABLES `livraisons` WRITE;
/*!40000 ALTER TABLE `livraisons` DISABLE KEYS */;
/*!40000 ALTER TABLE `livraisons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logged_session`
--

DROP TABLE IF EXISTS `logged_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logged_session` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `related_account` int DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `expires_at` timestamp NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `related_account` (`related_account`),
  CONSTRAINT `logged_session_ibfk_1` FOREIGN KEY (`related_account`) REFERENCES `compte` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logged_session`
--

LOCK TABLES `logged_session` WRITE;
/*!40000 ALTER TABLE `logged_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `logged_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_roles`
--

DROP TABLE IF EXISTS `permission_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_roles` (
  `PermissionRolesId` int NOT NULL AUTO_INCREMENT,
  `RoleID` int DEFAULT NULL,
  `PermissionID` int DEFAULT NULL,
  PRIMARY KEY (`PermissionRolesId`),
  KEY `Role_fk` (`RoleID`),
  KEY `Permission_fk` (`PermissionID`),
  CONSTRAINT `Permission_fk` FOREIGN KEY (`PermissionID`) REFERENCES `permissions` (`PermissionID`),
  CONSTRAINT `Role_fk` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`)

) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_roles`
--

LOCK TABLES `permission_roles` WRITE;
/*!40000 ALTER TABLE `permission_roles` DISABLE KEYS */;

INSERT INTO `permission_roles` VALUES (1,1,1),(2,2,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10);

/*!40000 ALTER TABLE `permission_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `PermissionID` int NOT NULL AUTO_INCREMENT,
  `Code` varchar(255) DEFAULT NULL,
  `Description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`PermissionID`)

) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'create_superuser','allow to create admin user'),(2,'get_user_self','allow user to get account information about themself'),(3,'list_users','allow to get any user or list them'),(4,'update_user',''),(5,'delete_user',''),(6,'get_statistics','Allow to get application financial performances'),(7,'list_restaurants','List and get restaurants'),(8,'create_restaurant','Create restaurants'),(9,'update_restaurant','Update a restaurant'),(10,'delete_restaurant','Delete a restaurant');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_restaurateur` int NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Adresse` varchar(255) NOT NULL,
  `ID_tag` int NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_restaurateur` (`ID_restaurateur`),
  KEY `ID_tag` (`ID_tag`),
  CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`ID_restaurateur`) REFERENCES `compte` (`ID`),
  CONSTRAINT `restaurants_ibfk_2` FOREIGN KEY (`ID_tag`) REFERENCES `categories` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,1,'nom','adresse',1,'description'),(2,2,'dbfjrk','trou du cul sur siagne',15,' du resto'),(3,2,'MacDo','La Seine ou jsp quoi',2,'kjhgfds hgfds edc uhbgfd');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `RoleTitle` varchar(50) DEFAULT NULL,
  `RoleDescription` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`RoleID`)

) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin',''),(2,'customer','Customer Account'),(3,'restaurant','Restaurant Manager Account'),(4,'delivery','Delivery Driver Account');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_restaurant` int NOT NULL,
  `titre_section` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_restaurant` (`ID_restaurant`),
  CONSTRAINT `section_ibfk_1` FOREIGN KEY (`ID_restaurant`) REFERENCES `restaurants` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-12 14:57:00
