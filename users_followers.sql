USE app_users; 
CREATE TABLE `users_followers` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`user_id` INT(11) NOT NULL, 
`user_follower_id` INT(11) NOT NULL, 
PRIMARY KEY (`id`), 
FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
FOREIGN KEY (`user_follower_id`) REFERENCES `users`(`id`),
UNIQUE (`user_id`,`user_follower_id`)
);