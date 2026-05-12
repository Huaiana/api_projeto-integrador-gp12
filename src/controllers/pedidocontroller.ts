import { app } from '../server';
import { Request, Response } from 'express';
import { PedidoRepository } from '../repository/pedidorepository';
import { ProdutoRepository } from '../repository/produtorepository';

export function pedidoController() {
    const pedidoRepository = new PedidoRepository();
    const produtoRepository = new ProdutoRepository();

    app.get('/pedidos', (req: Request, res: Response) => {
        res.json(pedidoRepository.listar());
    });

    
    app.get("/pedidos/:id", (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string);
        const pedido = pedidoRepository.listar().find(p => p.id === id);
        
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

            const valorTotal = produto.preco_base * quantidade;

            const novoPedido = pedidoRepository.salvar({
                produto_id: produto.id,
                quantidade,
                valor_total: valorTotal,
                data_criacao: new Date().toISOString(),
                id: 0,
                cliente_id: 0,
                valor_unitario: 0,
                status: '',
                data_atualizacao: '',
                desconto_id: 0,
                data_venda: '',
                endereco_entrega: '',
                distancia_calculada: 0,
                valor_frete: 0,
                valor_desconto: 0,
                total_final: 0,
                metodo_pagamento: ''
            });

            res.status(201).json(novoPedido);

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno ao processar pedido';
            res.status(400).json({ erro: message });
        }
    });
}
