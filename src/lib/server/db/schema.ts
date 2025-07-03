import { sql } from 'drizzle-orm';
import { integer, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull(),
	passwordHash: text('password_hash').notNull(),
	timezone: text('timezone').notNull().default('Australia/Sydney'),
	usesImperial: integer('uses_imperial', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
});

export const review = sqliteTable('review', {
	id: int('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	rating: int('rating'),
	review: text('review').notNull(),
	parentReviewId: int('parent_review_id').references((): AnySQLiteColumn => review.id),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
});

export const reviewVote = sqliteTable('review_vote', {
	id: int('id').primaryKey({ autoIncrement: true }),
	reviewId: int('review_id')
		.notNull()
		.references(() => review.id),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	up: integer('up', { mode: 'boolean' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
});

export const company = sqliteTable('company', {
	id: int('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description'),
	imageUrl: text('image_url'),
	websiteUrl: text('website_url')
});

export const userCompany = sqliteTable('user_company', {
	id: int('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	companyId: int('company_id')
		.notNull()
		.references(() => company.id)
});

export const companyReview = sqliteTable('company_review', {
	id: int('id').primaryKey({ autoIncrement: true }),
	companyId: int('company_id')
		.notNull()
		.references(() => company.id),
	reviewId: int('review_id')
		.notNull()
		.references(() => review.id)
});

export const productCategory = sqliteTable('product_category', {
	id: int('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description')
});

export const product = sqliteTable('product', {
	id: int('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description'),
	imageUrl: text('image_url'),
	productUrl: text('product_url'),
	weight: int('weight'),
	weightUnit: text('weight_unit').notNull().default('kg'),
	price: int('price'),
	currency: text('currency').notNull().default('AUD'),
	model: text('model'),
	companyId: int('company_id')
		.notNull()
		.references(() => company.id),
	categoryId: int('category_id')
		.notNull()
		.references(() => productCategory.id)
});

export const productReview = sqliteTable('product_review', {
	id: int('id').primaryKey({ autoIncrement: true }),
	productId: int('product_id')
		.notNull()
		.references(() => product.id),
	reviewId: int('review_id')
		.notNull()
		.references(() => review.id)
});

export const userProduct = sqliteTable('user_product', {
	id: int('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	productId: int('product_id')
		.notNull()
		.references(() => product.id),
	quantity: int('quantity').notNull().default(1)
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
