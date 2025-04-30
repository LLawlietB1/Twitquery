CREATE SCHEMA IF NOT EXISTS `app_users` DEFAULT CHARACTER SET utf8mb4;
USE app_users;
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users_followers` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`user_id` INT(11) NOT NULL, 
`user_follower_id` INT(11) NOT NULL, 
PRIMARY KEY (`id`), 
FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
FOREIGN KEY (`user_follower_id`) REFERENCES `users`(`id`),
UNIQUE (`user_id`,`user_follower_id`)
);

CREATE TABLE IF NOT EXISTS `tweets` (
`id` INT(11) NOT NULL AUTO_INCREMENT, 
`user_id` INT(11) NOT NULL,
`tweets` VARCHAR(300) NOT NULL,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
`updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) 
); 