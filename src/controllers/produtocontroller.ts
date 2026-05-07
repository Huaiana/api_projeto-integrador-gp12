import { app } from '../server';
import { ProdutoRepository } from '../repository/produtorepository';    

export function ProdutoController() {
    const repository = new ProdutoRepository();

    app.get('/produtos', async (req, res) => {
        const { nome} = req.query;

    if (nome) {
        const produto = repository.listarPorNome(nome as string);
        if (produto === null) return res.status(404).json({ message: 'Produto não encontrado' });
        return res.json(produto);
    }

    res.json(repository.listar());
    });

    app.get("/produtos/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const produto = repository.buscarPorId(id);
        if (produto === null) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(produto);
    });

    app.post("/produto", (req, res) => {
        try {
            const { nome, preco } = req.body;

            if (typeof nome !== 'string' || nome.trim().length === 0) throw new Error("O nome é obrigatório.");
            if (typeof preco !== 'number' || preco <= 0) throw new Error("O preço deve ser maior que zero.");

            const produto = repository.salvar({ nome: nome.trim(), preco } as any);
            res.status(201).json(produto);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno';
            res.status(400).json({ erro: message });
        }
    });
}