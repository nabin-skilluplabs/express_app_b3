/*
  Warnings:

  - Made the column `instructor` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "instructor" SET NOT NULL;
