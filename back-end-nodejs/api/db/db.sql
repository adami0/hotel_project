-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  mar. 12 mars 2019 à 16:21
-- Version du serveur :  5.6.38
-- Version de PHP :  7.2.1

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET time_zone
= "+00:00";

--
-- Base de données :  `db_codermaker889`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client`
(
  `id_client` int
(11) UNSIGNED NOT NULL,
  `last_name` varchar
(255) NOT NULL,
  `first_name` varchar
(255) NOT NULL,
  `adress` varchar
(255) DEFAULT NULL,
  `phone_nb` varchar
(50) DEFAULT NULL,
  `email` varchar
(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`
id_client`,
`last_name
`, `first_name`, `adress`, `phone_nb`, `email`) VALUES
(1, 'parka', 'sterix', '2, rue de la bergère 98000 Cityville', NULL, 'parka@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation`
(
  `id_reservation` int
(11) UNSIGNED NOT NULL,
  `arrival_date` datetime NOT NULL,
  `departure_date` datetime NOT NULL,
  `guests` int
(2) NOT NULL,
  `price` float DEFAULT NULL,
  `nights` int
(2) NOT NULL,
  `fk_id_rooms` int
(11) UNSIGNED NOT NULL,
  `fk_id_client` int
(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`
id_reservation`,
`arrival_date
`, `departure_date`, `guests`, `price`, `nights`, `fk_id_rooms`, `fk_id_client`) VALUES
(2, '2019-03-23 10:00:00', '2019-04-01 02:00:00', 1, 495, 9, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `room`
--

CREATE TABLE `room`
(
  `id_room` int
(11) UNSIGNED NOT NULL,
  `room_nb` int
(11) NOT NULL,
  `room_status` tinyint
(1) NOT NULL,
  `room_type` varchar
(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `room`
--

INSERT INTO `room` (`
id_room`,
`room_nb
`, `room_status`, `room_type`) VALUES
(3, 11, 1, 'Double'),
(4, 12, 1, 'Triple'),
(5, 13, 1, 'Double'),
(6, 14, 1, 'Double'),
(7, 15, 1, 'Double'),
(8, 21, 1, 'Triple'),
(9, 22, 1, 'Triple'),
(10, 23, 1, 'Triple'),
(11, 24, 1, 'Double'),
(12, 25, 1, 'Triple'),
(13, 31, 1, 'Double'),
(14, 32, 1, 'Double'),
(15, 33, 1, 'Double'),
(16, 34, 1, 'Double'),
(17, 35, 1, 'Quintuple'),
(18, 36, 1, 'Double'),
(19, 37, 1, 'Triple'),
(20, 40, 1, 'Double'),
(21, 41, 1, 'Triple');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user`
(
  `id` smallint
(5) UNSIGNED NOT NULL,
  `username` varchar
(20) NOT NULL,
  `email` varchar
(254) NOT NULL,
  `password` varchar
(64) NOT NULL,
  `avatar` varchar
(512) DEFAULT NULL,
  `about` varchar
(280) DEFAULT 'Bienvenue sur votre Dashboard ',
  `is_admin` tinyint
(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `passwordResetToken` varchar
(60) DEFAULT NULL,
  `passwordResetTime` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user`
  (`id`, `username

`, `email`, `password`, `avatar`, `about`, `is_admin`, `created_at`, `passwordResetToken`, `passwordResetTime`) VALUES
(1, 'toto', 'toto@gmail.com', '$2b$10$y4m7E20TBp031Q/9QvFM5.kaezfG44LSm8qfYEI4MrJriJr9zXJ7e', NULL, 'Bienvenue sur votre Dashboard ', 0, '2018-05-16 14:22:49', NULL, NULL),
(8, 'titi', 'titi@yahoo.com', '$2b$10$y4m7E20TBp031Q/9QvFM5.kaezfG44LSm8qfYEI4MrJriJr9zXJ7e', NULL, 'Bienvenue sur votre Dashboard ', 0, '2018-05-31 13:57:54', NULL, NULL),
(9, 'test', 'test@gmail.com', '$2b$10$tIEK0YcS9W1PJZ2XpWtgxu3w4v.ftGHhAQf78kJK9Hs.71QoXu3Q2', NULL, 'Bienvenue sur votre Dashboard ', 0, '2018-05-31 20:10:19', NULL, NULL),
(10, 'test2', 'test2@test.com', '$2b$10$OwWqngLqaCk9UOfaqtlfXujwQSsiJ3799/zooPdMt7c36d1HR.Uaa', NULL, 'Bienvenue sur votre Dashboard ', 0, '2018-12-30 22:39:14', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
ADD PRIMARY KEY
(`id_client`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
ADD PRIMARY KEY
(`id_reservation`),
ADD KEY `fk_id_rooms`
(`fk_id_rooms`),
ADD KEY `fk_id_client`
(`fk_id_client`);

--
-- Index pour la table `room`
--
ALTER TABLE `room`
ADD PRIMARY KEY
(`id_room`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
ADD PRIMARY KEY
(`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int
(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id_reservation` int
(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `room`
--
ALTER TABLE `room`
  MODIFY `id_room` int
(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` smallint
(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY
(`fk_id_rooms`) REFERENCES `room`
(`id_room`) ON
DELETE NO ACTION ON
UPDATE NO ACTION,
ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY
(`fk_id_client`) REFERENCES `client`
(`id_client`) ON
DELETE NO ACTION ON
UPDATE NO ACTION;

