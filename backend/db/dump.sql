-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: CESEats
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

CREATE Database if not exist CESEats;
USE CESEats;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compte`
--

LOCK TABLES `compte` WRITE;
/*!40000 ALTER TABLE `compte` DISABLE KEYS */;
INSERT INTO `compte` VALUES (2,NULL,NULL,'test@test.com',1,'2012-04-23 18:25:43','12345678','011111111',1,'./','2024-06-06 20:11:00','2024-06-06 20:11:00',NULL,'',NULL),(3,'dfajkldskdsffk',NULL,'testttt@test.com',2,'2012-04-23 18:25:43','12345678','011111111',1,'./','2024-06-06 20:12:48','2024-06-09 20:54:36',NULL,'','2024-06-09 20:57:12'),(4,'Doe','John','testc@test.com',1,'2012-04-23 18:25:43','12345678','011111111',1,'./','2024-06-06 20:13:51','2024-06-06 20:13:51',NULL,'',NULL),(5,'Doe','John','tesctc@test.com',1,'2012-04-23 18:25:43','$2b$10$yzB1wgZ7LlvsOEq7OvTsiOtHNvzHwxJuI9Umux.NORiDBLeKGCNAO','011111111',1,'./','2024-06-06 20:15:23','2024-06-06 20:15:23',NULL,'',NULL),(6,'Doe','John','tesctfgffc@test.com',1,'2012-04-23 18:25:43','$2b$10$PKrod9LwSAfc.vD4iN19z.DRFRjgLUvNggBSF1zxHXq6/yAaOHwJm','011111111',1,'./','2024-06-06 20:47:43','2024-06-06 20:47:43',NULL,'',NULL),(7,'Doe','John','tesctfvvvvgffc@test.com',1,'2012-04-23 18:25:43','$2b$10$k/4W6laCta1QP7h2flX0NuYifAMViVBuX/Jh2FcBSFIZlYp87H0he','011111111',1,'./','2024-06-06 20:48:19','2024-06-06 20:48:19',NULL,'',NULL),(8,'Doe','John','tesctfvvvvgvxzcffc@test.com',1,'2012-04-23 18:25:43','$2b$10$lB2ICEDsdIh7ZrsMox.X7eiPodXWPnO9foYNvlOuUHmuR31hHbVSu','011111111',1,'./','2024-06-06 20:48:51','2024-06-06 20:48:51',NULL,'',NULL),(9,'Doe','John','tesctfvvvvcccgvxzcffc@test.com',2,'2012-04-23 18:25:43','$2b$10$hIPAlOvIpddqRoRvtY8jmupDXuYMNdfDkuzzYCi8y0CBex4BGYBf.','05123453255',0,'./','2024-06-06 20:50:09','2024-06-07 13:08:42',NULL,'',NULL),(10,'Doe','John','tesfddffdfddffdt@test.com',1,'2012-04-23 18:25:43','$2b$10$2KouiRkGglA5hhuNrTot7.REcQg22f4R7RMSgMKjvvf5hW4Ap4zMC','011111111',1,'./','2024-06-07 07:59:39','2024-06-07 07:59:39',NULL,'',NULL),(11,'Doe','John','tesfddffddddfddffdt@test.com',1,'2012-04-23 18:25:43','$2b$10$ot/3GnDr.ZE42LBNEKbHuutE93NCeOJE2mP7T0Qrlq./bHOM1UytS','011111111',1,'./','2024-06-07 08:27:48','2024-06-07 08:27:48',NULL,'',NULL),(12,'Doe','John','tesfddffdddffdfddffdt@test.com',1,'2012-04-23 18:25:43','$2b$10$azLbcA0wLBToSKwRZFPMBOc2HcZXqDVhjtUrs2aa3PU5fUXa0RsuS','011111111',1,'./','2024-06-07 09:09:27','2024-06-07 09:09:27',NULL,'',NULL),(13,'Doe','John','tesfddffdddffdfddffssdt@test.com',1,'2012-04-23 18:25:43','$2b$10$vbr3ORn8MmLUpSfn/tTOzuPPLrw1tnuV3LDtsVsJKqFALbEy12lda','011111111',1,'./','2024-06-07 09:09:35','2024-06-07 09:09:35',NULL,'',NULL),(14,'Doe','John','tesfddffdddffdfddffssvvvdt@test.com',1,'2012-04-23 18:25:43','$2b$10$Cn2uS5ldaEI.nmLutMVjVOzpTkhR/weiE2/WxmR.KnQvc7JJJLlhS','011111111',1,'./','2024-06-07 11:59:22','2024-06-07 11:59:22',NULL,'',NULL),(15,'Doe','John','tesfddffdddffdfddffssvvvdddt@test.com',1,'2012-04-23 18:25:43','$2b$10$XVPnvC96GXFZfiaQNLUT1OTZd4BFUxDHv4PQBZ2ukKEYSLSsxRlty','011111111',1,'./','2024-06-07 12:04:12','2024-06-07 12:04:12',NULL,'',NULL),(16,'Doe','John','tesfddffdddffdfddffssvvvddfhjgfdsadt@test.com',1,'2012-04-23 18:25:43','$2b$10$lTSX.wXGt7ZPrIenZEyieOnXoo2XPxmDOq63FlSQU5L4PTVoKAq1a','011111111',1,'./','2024-06-07 13:53:29','2024-06-07 13:53:29',NULL,'',NULL),(17,'Doe','John','arslane@test.fr',2,'2012-04-23 18:25:43','$2b$10$7RPiJt56ynRHXbDorL6l2udKGsaopseezP.FJPu7uz9jn.QVvTO1m','011111111',1,'./','2024-06-07 13:53:51','2024-06-07 13:53:51',NULL,'',NULL),(18,'Doe','John','abc@test.fr',2,'2012-04-23 18:25:43','$2b$10$MZyvwwSXWqAJQN8EYUgPD.2SSZZ92DAn8v2tbSuFdqH82XH20/MOK','011111111',1,'./','2024-06-07 13:57:46','2024-06-07 13:57:46',NULL,'',NULL),(19,'Doe','John','abc@tegst.fr',2,'2012-04-23 18:25:43','$2b$10$3c1kptqJm4X8Pf/PXJqGZO6ZUp4a5Ci39HsOp4HsTJ8YrdB0W7dfK','011111111',1,'./','2024-06-09 18:11:06','2024-06-09 18:11:06',NULL,'',NULL),(20,'Doe','John','abhhc@tegst.fr',2,'2012-04-23 18:25:43','$2b$10$j1tkTgehzEQs.ypPUiTOY.VTjo7/wj/HVJTjEFHXo7yvyIhXZQ6Xe','011111111',1,'./','2024-06-09 19:40:09','2024-06-09 19:40:09',NULL,'',NULL),(21,'Doe','John','ggabhhc@tegst.fr',1,'2012-04-23 18:25:43','$2b$10$4Yk88777/.lOmy8NtDzopeEbtIT6L6Tyw513BqmwwQKhTDhjnCQhq','011111111',1,'./','2024-06-09 19:40:21','2024-06-09 19:40:21',NULL,'',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_roles`
--

LOCK TABLES `permission_roles` WRITE;
/*!40000 ALTER TABLE `permission_roles` DISABLE KEYS */;
INSERT INTO `permission_roles` VALUES (1,1,1),(2,2,2),(3,1,3),(4,1,4),(5,1,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'create_superuser','allow to create admin user'),(2,'get_user_self','allow user to get account information about themself'),(3,'list_users','allow to get any user or list them'),(4,'update_user',''),(5,'delete_user','');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2024-06-09 23:06:49
