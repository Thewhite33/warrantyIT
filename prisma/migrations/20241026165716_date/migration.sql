/*
  Warnings:

  - You are about to drop the column `purchaseDate` on the `Product` table. All the data in the column will be lost.
  - Added the required column `purchasedate` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "purchaseDate",
ADD COLUMN     "purchasedate" TIMESTAMP(3) NOT NULL;
