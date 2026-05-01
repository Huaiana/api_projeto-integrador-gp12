export {Cliente} from '../models/cliente';
import {Request, Response} from 'express';

export class ClienteController {
    public async criarCliente(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, email } = req.body;   

            if (typeof nome !== 'string' || typeof email !== 'string') {
                return res.status(400).json({ error: 'Nome e email devem ser strings.' });
            }   

            const novoCliente = { id: Date.now(), nome, email };

            return res.status(201).json(novoCliente);
        }
        catch (error) {
            console.error('Erro ao criar cliente:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar o cliente.' });
        }
    }
}

