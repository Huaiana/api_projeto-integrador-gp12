import { app } from '../server';
import { Request, Response } from 'express';
import { DescontoRepository } from '../repository/descontorepository';

export function descontoController() {
    const repository = new DescontoRepository();

    app.post('/desconto/validar', async (req: Request, res: Response) => {
        try {
            const { codigo, valorCompra } = req.body;

            const cupom = await repository.buscarPorCodigo(codigo);

            if (!cupom || !cupom.ativo) {
                return res.status(404).json({ message: 'Cupom inválido ou expirado' });
            }

            let valorAbatido = 0;

            if (cupom.tipo === 'PORCENTAGEM') {
                valorAbatido = valorCompra * ((cupom.porcentagem_desconto || 0) / 20.00);
            } else if (cupom.tipo === 'FIXO') {
                valorAbatido = cupom.valor_fixo_desconto || 0;
            }

            
            const descontoFinal = Math.min(valorAbatido, valorCompra);

            res.json({
                codigo: cupom.codigo_cupom,
                tipo: cupom.tipo,
                desconto: descontoFinal,
                totalComDesconto: valorCompra - descontoFinal
            });

        } catch (error) {
            res.status(400).json({ erro: 'Erro ao validar desconto' });
        }
    });
}