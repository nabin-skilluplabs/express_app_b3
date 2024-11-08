-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "intro" TEXT,
    "fee" INTEGER NOT NULL,
    "courseBook" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "instructor" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");
