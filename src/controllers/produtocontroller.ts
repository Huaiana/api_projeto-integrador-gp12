import { app } from '../server';
import { ProdutoRepository } from '../repository/produtorepository';

export function ProdutoController() {
    const repository = new ProdutoRepository();

    app.get('/produtos', (req, res) => {
        const { nome } = req.query;

        if (nome) {
            const produtos = repository.listarPorNome(nome as string);
            return res.json(produtos);
        }

        res.json(repository.listar());
    });

    app.get('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const produto = repository.buscarPorId(id);
        if (produto === null) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(produto);
    });

    app.post('/produtos', (req, res) => {
        try {
            const { nome, descricao, volume, preco_base, estoque, beneficios, modo_uso, indicacao } = req.body;

            if (typeof nome !== 'string' || nome.trim().length === 0) throw new Error("O nome é obrigatório.");
            if (typeof preco_base !== 'number' || preco_base <= 0) throw new Error("O preço deve ser maior que zero.");

            const produto = repository.salvar({
                id: 0,
                nome: nome.trim(),
                descricao: descricao ?? '',
                volume: volume ?? '120 ml',
                preco_base,
                estoque: estoque ?? 0,
                beneficios: beneficios ?? '',
                modo_uso: modo_uso ?? '',
                indicacao: indicacao ?? '',
            });
            res.status(201).json(produto);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno';
            res.status(400).json({ erro: message });
        }
    });

    app.put('/produtos/:id', (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { nome, descricao, volume, preco_base, estoque, beneficios, modo_uso, indicacao } = req.body;

            if (typeof nome !== 'string' || nome.trim().length === 0) throw new Error("O nome é obrigatório.");
            if (typeof preco_base !== 'number' || preco_base <= 0) throw new Error("O preço deve ser maior que zero.");

            const produto = repository.atualizar(id, {
                id,
                nome: nome.trim(),
                descricao: descricao ?? '',
                volume: volume ?? '120 ml',
                preco_base,
                estoque: estoque ?? 0,
                beneficios: beneficios ?? '',
                modo_uso: modo_uso ?? '',
                indicacao: indicacao ?? '',
            });

            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
            res.json(produto);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno';
            res.status(400).json({ erro: message });
        }
    });

    app.delete('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const deletado = repository.deletar(id);
        if (!deletado) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(204).send();
    });
}
