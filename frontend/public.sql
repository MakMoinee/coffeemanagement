/*
 Navicat Premium Data Transfer

 Source Server         : postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 160002 (160002)
 Source Host           : localhost:5432
 Source Catalog        : coffeedb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160002 (160002)
 File Encoding         : 65001

 Date: 09/02/2024 10:15:24
*/


-- ----------------------------
-- Sequence structure for products_productid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."products_productid_seq";
CREATE SEQUENCE "public"."products_productid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for transactions_transactionid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."transactions_transactionid_seq";
CREATE SEQUENCE "public"."transactions_transactionid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS "public"."products";
CREATE TABLE "public"."products" (
  "productid" int4 NOT NULL DEFAULT nextval('products_productid_seq'::regclass),
  "productname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "productprice" numeric(10,2) NOT NULL,
  "category" varchar(100) COLLATE "pg_catalog"."default",
  "stock" int4,
  "created_at" date NOT NULL
)
;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO "public"."products" VALUES (7, 'Coffee Barako', 39.00, 'Pure Coffee', 25, '2024-02-09');
INSERT INTO "public"."products" VALUES (8, 'Fita', 15.00, 'Biscuits', 20, '2024-02-09');

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS "public"."transactions";
CREATE TABLE "public"."transactions" (
  "transactionid" int4 NOT NULL DEFAULT nextval('transactions_transactionid_seq'::regclass),
  "items" varchar(100) COLLATE "pg_catalog"."default",
  "total" numeric(10,2),
  "cash" numeric(10,2),
  "change_amount" numeric(10,2),
  "transaction_date" date NOT NULL
)
;

-- ----------------------------
-- Records of transactions
-- ----------------------------
INSERT INTO "public"."transactions" VALUES (4, '{"Coffee Barako: PHP39.00","Fita: PHP15.00"}', 54.00, 100.00, 46.00, '2024-02-09');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "firstname" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "middlename" varchar(100) COLLATE "pg_catalog"."default",
  "lastname" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "usertype" int4 NOT NULL,
  "created_at" date NOT NULL,
  "updated_at" date
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (3, 'sample', 'sample', 'sample', 'sample@gmail.com', '$2b$10$gMx3I.P3Z5rjlL4bvBOgruSXPgXu2MkEVZIkzwllaCAllRVWzmF6i', 2, '2024-02-09', NULL);
INSERT INTO "public"."users" VALUES (4, 'John', 'X', 'Doe', 'john@gmail.com', '$2b$10$egkRDP9XWRspZGpX1/lu9OUV/OBfkqUtvl.cmg8Oe9NK5mRDPFk/6', 2, '2024-02-09', NULL);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."products_productid_seq"
OWNED BY "public"."products"."productid";
SELECT setval('"public"."products_productid_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."transactions_transactionid_seq"
OWNED BY "public"."transactions"."transactionid";
SELECT setval('"public"."transactions_transactionid_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 4, true);

-- ----------------------------
-- Primary Key structure for table products
-- ----------------------------
ALTER TABLE "public"."products" ADD CONSTRAINT "products_pkey" PRIMARY KEY ("productid");

-- ----------------------------
-- Primary Key structure for table transactions
-- ----------------------------
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("transactionid");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
