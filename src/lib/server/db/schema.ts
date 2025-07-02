import { boolean, integer, pgTable, text, timestamp, type AnyPgColumn } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	timezone: text('timezone').notNull().default('Australia/Sydney'),
	usesImperial: boolean('uses_imperial').notNull().default(false),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const review = pgTable('review', {
	id: integer('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	rating: integer('rating'),
	review: text('review').notNull(),
	parentReviewId: integer('parent_review_id').references((): AnyPgColumn => review.id),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const reviewVote = pgTable('review_vote', {
	id: integer('id').primaryKey(),
	reviewId: integer('review_id')
		.notNull()
		.references(() => review.id),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	up: boolean('up').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const company = pgTable('company', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	imageUrl: text('image_url'),
	websiteUrl: text('website_url')
});

export const userCompany = pgTable('user_company', {
	id: integer('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	companyId: integer('company_id')
		.notNull()
		.references(() => company.id)
});

export const companyReview = pgTable('company_review', {
	id: integer('id').primaryKey(),
	companyId: integer('company_id')
		.notNull()
		.references(() => company.id),
	reviewId: integer('review_id')
		.notNull()
		.references(() => review.id)
});

export const product = pgTable('product', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	imageUrl: text('image_url'),
	productUrl: text('product_url'),
	weight: integer('weight'),
	weightUnit: text('weight_unit').notNull().default('kg'),
	price: integer('price'),
	currency: text('currency').notNull().default('AUD'),
	model: text('model'),
	companyId: integer('company_id')
		.notNull()
		.references(() => company.id),
	categoryId: integer('category_id')
		.notNull()
		.references(() => productCategory.id)
});

export const productReview = pgTable('product_review', {
	id: integer('id').primaryKey(),
	productId: integer('product_id')
		.notNull()
		.references(() => product.id),
	reviewId: integer('review_id')
		.notNull()
		.references(() => review.id)
});

export const productCategory = pgTable('product_category', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description')
});

export const userProduct = pgTable('user_product', {
	id: integer('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	productId: integer('product_id')
		.notNull()
		.references(() => product.id),
	quantity: integer('quantity').notNull().default(1)
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
