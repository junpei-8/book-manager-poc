CREATE TABLE `user_auth_accounts` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text DEFAULT (upper(substr(hex(cast((julianday('now') - 2440587.5) * 86400000 as integer)) || '000000000000', 1, 12) || substr(hex(randomblob(6)), 1, 12))) NOT NULL,
	`user_id` text NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`id_token` text,
	`password` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_accounts_public_id_unique` ON `user_auth_accounts` (`public_id`);--> statement-breakpoint
CREATE TABLE `user_auth_sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text DEFAULT (upper(substr(hex(cast((julianday('now') - 2440587.5) * 86400000 as integer)) || '000000000000', 1, 12) || substr(hex(randomblob(6)), 1, 12))) NOT NULL,
	`user_id` text NOT NULL,
	`token` text NOT NULL,
	`expires_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_sessions_public_id_unique` ON `user_auth_sessions` (`public_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_sessions_token_unique` ON `user_auth_sessions` (`token`);--> statement-breakpoint
CREATE INDEX `user_auth_sessions_token_index` ON `user_auth_sessions` (`token`);--> statement-breakpoint
CREATE INDEX `user_auth_sessions_expires_at_index` ON `user_auth_sessions` (`expires_at`);--> statement-breakpoint
CREATE TABLE `user_auth_verifications` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text DEFAULT (upper(substr(hex(cast((julianday('now') - 2440587.5) * 86400000 as integer)) || '000000000000', 1, 12) || substr(hex(randomblob(6)), 1, 12))) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_verifications_public_id_unique` ON `user_auth_verifications` (`public_id`);--> statement-breakpoint
CREATE INDEX `user_auth_verifications_identifier_index` ON `user_auth_verifications` (`identifier`);--> statement-breakpoint
CREATE INDEX `user_auth_verifications_expires_at_index` ON `user_auth_verifications` (`expires_at`);--> statement-breakpoint
CREATE TABLE `user_book_collections` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text DEFAULT (upper(substr(hex(cast((julianday('now') - 2440587.5) * 86400000 as integer)) || '000000000000', 1, 12) || substr(hex(randomblob(6)), 1, 12))) NOT NULL,
	`user_id` integer NOT NULL,
	`provider_id` text NOT NULL,
	`provider_type` text NOT NULL,
	`title` text NOT NULL,
	`authors` text,
	`categories` text,
	`thumbnail_url` text,
	`published_dates` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_book_collections_public_id_unique` ON `user_book_collections` (`public_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_book_collections_provider_id_and_provider_type_unique_index` ON `user_book_collections` (`provider_id`,`provider_type`);--> statement-breakpoint
CREATE TABLE `user_phrases` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text DEFAULT (upper(substr(hex(cast((julianday('now') - 2440587.5) * 86400000 as integer)) || '000000000000', 1, 12) || substr(hex(randomblob(6)), 1, 12))) NOT NULL,
	`user_id` integer NOT NULL,
	`user_book_collection_id` integer NOT NULL,
	`content` text NOT NULL,
	`page_number` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_book_collection_id`) REFERENCES `user_book_collections`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_phrases_public_id_unique` ON `user_phrases` (`public_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text DEFAULT (upper(substr(hex(cast((julianday('now') - 2440587.5) * 86400000 as integer)) || '000000000000', 1, 12) || substr(hex(randomblob(6)), 1, 12))) NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_public_id_unique` ON `users` (`public_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);