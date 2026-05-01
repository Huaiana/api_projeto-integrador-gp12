import {Desconto} from '../models/desconto';
import {Request, Response} from 'express';  

export class DescontoController {
    public async calcularDesconto(req: Request, res: Response): Promise<Response> {
        try {
            const { valorOriginal, percentualDesconto } = req.body;

            if (typeof valorOriginal !== 'number' || typeof percentualDesconto !== 'number') {
                return res.status(400).json({ error: 'Valor original e percentual de desconto devem ser números.' });
            }

            const valorDesconto = (valorOriginal * percentualDesconto) / 100;
            const valorFinal = valorOriginal - valorDesconto;

            return res.json({ valorOriginal, percentualDesconto, valorDesconto, valorFinal });
        }

        catch (error) {
            console.error('Erro ao calcular desconto:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao calcular o desconto.' });
        }
    }
}


