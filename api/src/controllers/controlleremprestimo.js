const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.create({
            data: req.body
        });
        return res.status(201).json(emprestimo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const emprestimos = await prisma.emprestimo.findMany();
    return res.json(emprestimos);
}

const readOne = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.findUnique({
            select: {
                id: true,
                retirada: true,
                devolucao: true,
                multa: true,
                idLivro: {
                    select: {
                        titulo: true,
                        autor: true,
                    }
                },
                raAluno: {
                    select: {
                        ra: true,
                        nome: true,
                    }
                }
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(emprestimo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.findFirst({
            where: {
                id: Number(req.params.id)
            }
        });


        let multa = null;

        if (req.body.devolucao) {
            const devolucao = new Date(req.body.devolucao);
            const retirada = new Date(emprestimo.retirada);
            const diasComLivro = Math.ceil((devolucao - retirada) / (1000 * 60 * 60 * 24));

            if (diasComLivro > 3) {
                const diasExtras = diasComLivro - 3;
                multa = diasExtras * 10;
            }
        }

        const Emprestimoo = await prisma.emprestimo.update({
            where: { id: Number(req.params.id) },
            data: {
                ...req.body,
                multa: multa
            }
        });

        return res.status(202).json(Emprestimoo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const remove = async (req, res) => {
    try {
        await prisma.emprestimo.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };