-- CreateTable
CREATE TABLE "tenant_master" (
    "tenant_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_name" TEXT NOT NULL,

    CONSTRAINT "tenant_master_pkey" PRIMARY KEY ("tenant_id")
);
