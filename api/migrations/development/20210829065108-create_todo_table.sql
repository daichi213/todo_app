
-- +migrate Up
CREATE TABLE `todos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `title` longtext,
  `content` longtext,
  `status` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_todos_deleted_at` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- +migrate Down
DROP TABLE IF EXISTS todos;
