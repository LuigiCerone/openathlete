-- CreateTable
CREATE TABLE "public"."temporary_training_plan" (
    "id" TEXT NOT NULL,
    "planData" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "imported_at" TIMESTAMP(3),

    CONSTRAINT "temporary_training_plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "temporary_training_plan_expires_at_idx" ON "public"."temporary_training_plan"("expires_at");
