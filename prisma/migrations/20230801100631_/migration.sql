/*
  Warnings:

  - You are about to drop the `Filme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Filme";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "filmes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "diretor" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "favorito" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "filmes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
