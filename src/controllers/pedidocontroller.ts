import { app} from '../server';
import { PedidoRepository } from '../repository/pedidorepository';

export function PedidoController() {
    const pedidoRepository = new PedidoRepository();
    const produtoRepository = new ProdutoRepository();

    app.get('/pedidos', (req: Req, res: Res) => {
        res.json(pedidoRepository.listar());
    });

    
    app.get("/pedidos/:id", (req: Req, res: Res) => {
        const id = parseInt(req.params.id);
        const pedido = pedidoRepository.buscarPorId(id);
        
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.json(pedido);
    });

    
    app.post("/pedido", (req, res) => {
        try {
            const { produtoId, quantidade } = req.body;

            
            if (!produtoId) throw new Error("O ID do produto é obrigatório.");
            if (!quantidade || quantidade <= 0) throw new Error("A quantidade deve ser maior que zero.");

            
            const produto = produtoRepository.buscarPorId(produtoId);
            if (!produto) {
                return res.status(404).json({ erro: "Produto selecionado não existe." });
            }

            
            const valorTotal = produto.preco * quantidade;

            
            const novoPedido = pedidoRepository.salvar({
                produtoId: produto.id,
                nomeProduto: produto.nome,
                quantidade,
                valorTotal,
                data: new Date()
            });

            res.status(201).json(novoPedido);

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno ao processar pedido';
            res.status(400).json({ erro: message });
        }
    });
}