/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Filme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "diretor" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "favorito" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Filme_id_fkey" FOREIGN KEY ("id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Filme" ("ano", "diretor", "favorito", "id", "titulo") SELECT "ano", "diretor", "favorito", "id", "titulo" FROM "Filme";
DROP TABLE "Filme";
ALTER TABLE "new_Filme" RENAME TO "Filme";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
