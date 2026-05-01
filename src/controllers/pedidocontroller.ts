import {Pedido} from '../models/pedido';
import { Request, Response } from 'express';

export class PedidoController {
    public async criarPedido(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar o pedido.' });
        }

    }

    public async obterPedidos(req: Request, res: Response): Promise<void> {
        try {
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter os pedidos.' });
        }
    }
}   

