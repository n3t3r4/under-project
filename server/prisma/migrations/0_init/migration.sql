-- CreateTable
CREATE TABLE "agencia" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255),
    "senha" VARCHAR(255),

    CONSTRAINT "agencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carros" (
    "id" SERIAL NOT NULL,
    "marca" VARCHAR(255),
    "modelo" VARCHAR(255),
    "ano" INTEGER,
    "proprietario" INTEGER,

    CONSTRAINT "carros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255),
    "senha" VARCHAR(255),
    "agencia_id" INTEGER,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conteudo" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255),
    "conteudo_post" VARCHAR(255),
    "data_publi" DATE,
    "status" INTEGER,
    "agencia_id" INTEGER,
    "cliente_id" INTEGER,

    CONSTRAINT "conteudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255),
    "sobrenome" VARCHAR(255),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carros" ADD CONSTRAINT "carros_proprietario_fkey" FOREIGN KEY ("proprietario") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_agencia_id_fkey" FOREIGN KEY ("agencia_id") REFERENCES "agencia"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conteudo" ADD CONSTRAINT "conteudo_agencia_id_fkey" FOREIGN KEY ("agencia_id") REFERENCES "agencia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conteudo" ADD CONSTRAINT "conteudo_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

