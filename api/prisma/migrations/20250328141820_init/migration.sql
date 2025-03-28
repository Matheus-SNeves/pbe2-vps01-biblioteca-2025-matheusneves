-- CreateTable
CREATE TABLE `Aluno` (
    `ra` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Aluno_telefone_key`(`telefone`),
    PRIMARY KEY (`ra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `prateleira` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emprestimo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `raAluno` VARCHAR(191) NOT NULL,
    `idLivro` INTEGER NOT NULL,
    `retirada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `devolucao` DATETIME(3) NOT NULL,
    `multa` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_raAluno_fkey` FOREIGN KEY (`raAluno`) REFERENCES `Aluno`(`ra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_idLivro_fkey` FOREIGN KEY (`idLivro`) REFERENCES `Livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
