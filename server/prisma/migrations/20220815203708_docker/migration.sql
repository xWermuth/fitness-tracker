/*
  Warnings:

  - You are about to drop the `_ExerciseToWorkout` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workoutId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ExerciseToWorkout` DROP FOREIGN KEY `_ExerciseToWorkout_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ExerciseToWorkout` DROP FOREIGN KEY `_ExerciseToWorkout_B_fkey`;

-- AlterTable
ALTER TABLE `Exercise` ADD COLUMN `workoutId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_ExerciseToWorkout`;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
