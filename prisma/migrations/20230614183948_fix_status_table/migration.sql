/*
  Warnings:

  - You are about to drop the column `statusId` on the `orders` table. All the data in the column will be lost.
  - The primary key for the `status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `status` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `status_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_statusId_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `statusId`,
    ADD COLUMN `status_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `status` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
