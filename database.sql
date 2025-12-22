-- master.`user` definition

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `role` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- master.goods definition

CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `good_name` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- master.favorite_goods definition

CREATE TABLE `favorite_goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `goods_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `favorite_goods_goods_FK` (`goods_id`),
  KEY `favorite_goods_user_FK` (`customer_id`),
  CONSTRAINT `favorite_goods_goods_FK` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`),
  CONSTRAINT `favorite_goods_user_FK` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- master.cart definition

CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `goods_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_goods_FK` (`goods_id`),
  KEY `cart_user_FK` (`customer_id`),
  CONSTRAINT `cart_goods_FK` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`),
  CONSTRAINT `cart_user_FK` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- master.orders definition

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `goods_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_goods_FK` (`goods_id`),
  KEY `orders_user_FK` (`customer_id`),
  CONSTRAINT `orders_goods_FK` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`),
  CONSTRAINT `orders_user_FK` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (username,password_hash,`role`) VALUES
	 ('admin@gmail.com','$2b$10$PAajfMQ4rk0Hdmu2vlnUZO9no1.3Qussqr1ENuX6Rf0pK14IbNMm2',1),
	 ('customer@gmail.com','$2b$10$tIkyVnuwLoosm6.UqGETq.7WUpQ2k0TuVAabmKVl4i7zLo7uJq9Yy',0);
