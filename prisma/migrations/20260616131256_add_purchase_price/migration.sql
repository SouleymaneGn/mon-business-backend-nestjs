/*
  Warnings:

  - You are about to drop the column `purchase_price` on the `produit` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "purchasePrice" REAL,
    "stock" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_produit" ("id", "name", "price", "stock") SELECT "id", "name", "price", "stock" FROM "produit";
DROP TABLE "produit";
ALTER TABLE "new_produit" RENAME TO "produit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
