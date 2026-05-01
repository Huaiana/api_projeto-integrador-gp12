import { Request, Response } from 'express';
import { Frete } from '../models/frete'; 

export class FreteController {
    
    public async calcularFrete(req: Request, res: Response): Promise<void> {
        try {
            const { distancia } = req.body;

            if (typeof distancia !== 'number' || distancia <= 0) {
                res.status(400).json({ error: 'Distância deve ser um número positivo.' });
                return;
            }

            const valorPorKm = 2.50; 
            const valorFrete = distancia * valorPorKm;

            res.json({ valorFrete });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao calcular o frete.' });
        }
    }
}