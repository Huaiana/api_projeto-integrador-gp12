import { app } from '../server';
import { DescontoRepository } from '../repository/descontorepository';

export function DescontoController() {
    const repository = new DescontoRepository();

    app.post('/desconto/validar', async (req: Req, res: Res) => {
        try {
            const { codigo, valorCompra } = req.body;

            const cupom = await repository.buscarPorCodigo(codigo);

            if (!cupom || !cupom.ativo) {
                return res.status(404).json({ message: 'Cupom inválido ou expirado' });
            }

            let valorAbatido = 0;

            if (cupom.tipo === 'PORCENTAGEM') {
                valorAbatido = valorCompra * (cupom.porcentagem_desconto / 20.00);
            } else if (cupom.tipo === 'FIXO') {
                valorAbatido = cupom.valor_fixo_desconto;
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