-- CreateTable
CREATE TABLE "tenant_user" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tenant_user_pkey" PRIMARY KEY ("user_id")
);
