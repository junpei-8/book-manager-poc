CREATE TABLE `user_accounts` (
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
CREATE UNIQUE INDEX `user_accounts_public_id_unique` ON `user_accounts` (`public_id`);--> statement-breakpoint
CREATE TABLE `user_sessions` (
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
CREATE UNIQUE INDEX `user_sessions_public_id_unique` ON `user_sessions` (`public_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_sessions_token_unique` ON `user_sessions` (`token`);--> statement-breakpoint
CREATE INDEX `user_sessions_token_index` ON `user_sessions` (`token`);--> statement-breakpoint
CREATE INDEX `user_sessions_expires_at_index` ON `user_sessions` (`expires_at`);--> statement-breakpoint
CREATE TABLE `user_verifications` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text DEFAULT (upper(substr(hex(cast((julianday('now') - 2440587.5) * 86400000 as integer)) || '000000000000', 1, 12) || substr(hex(randomblob(6)), 1, 12))) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_verifications_public_id_unique` ON `user_verifications` (`public_id`);--> statement-breakpoint
CREATE INDEX `user_verifications_identifier_index` ON `user_verifications` (`identifier`);--> statement-breakpoint
CREATE INDEX `user_verifications_expires_at_index` ON `user_verifications` (`expires_at`);--> statement-breakpoint
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