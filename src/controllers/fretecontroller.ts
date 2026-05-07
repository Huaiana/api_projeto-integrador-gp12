import { app } from '../server';
import { FreteRepository } from '../repository/freterepository';

export function FreteController() {
    const repository = new FreteRepository();

    app.get('/frete/calcular', async (req, res:) => {
        try {
            const { endereco_entrega } = req.query;

            if (!endereco_entrega) {
                throw new Error("O endereço de entrega é obrigatório para calcular a distância.");
            }

            const distanciaCalculada = 0.40; 

            const config = await repository.buscarConfiguracaoAtiva();

            
            // "Mais perto (até 0.50km?) -> 0.20 | Mais distante -> 0.50"
            let valorPorKm = 0.20;
            let categoria = "Curta Distância";

            if (distanciaCalculada > 0.50) {
                valorPorKm = 0.50;
                categoria = "Longa Distância";
            }

            
            const valorTotalFrete = distanciaCalculada * valorPorKm;

            
            return res.json({
                origem: config?.endereco_origem || "Avenida Ademar de Barros, 576",
                destino: endereco_entrega,
                detalhes_logistica: {
                    distancia_percorrida: `${distanciaCalculada} KM`,
                    tarifa_aplicada: `R$ ${valorPorKm.toFixed(2)} por KM`,
                    categoria: categoria
                },
                valor_final_frete: valorTotalFrete
            });

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao processar endereço';
            return res.status(400).json({ erro: message });
        }
    });
}