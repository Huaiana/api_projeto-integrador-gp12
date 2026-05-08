import { app } from '../server';
import { acompanhamentoRepository } from '../repository/acompanhamentorepositry';  
  
export class acompanhamentocontroller {
    private repository = new acompanhamentoRepository();


export function acompanhamentoController(): void {
    const repository = new acompanhamentoRepository();

    
    app.get("/rastreio/:pedidoId", async (req, res) => {
        try {
            const pedidoId = parseInt(req.params.pedidoId);

            const acompanhamento = await repository.buscarPorPedido(pedidoId);

            if (!acompanhamento) {
                return res.status(404).json({ message: "Informações de entrega não encontradas para este pedido." });
            }

            return res.json({
                pedido: acompanhamento.pedido_id,
                status: acompanhamento.status_entrega, // 'EM ROTA', 'ENTREGUE', 'ATRASADO'
                previsao: acompanhamento.previsao_entrega,
                detalhes_logistica: `O pedido está vinculado ao frete código: ${acompanhamento.frete_id}`
            });
        } catch (error) {
            return res.status(400).json({ erro: "Erro ao consultar rastreio." });
        }
    });


    app.patch("/rastreio/:id/status", async (req, res) => {
        try {
            const { id } = req.params;
            const { novoStatus } = req.body;

            const statusPermitidos = ['EM ROTA', 'ENTREGUE', 'ATRASADO'];
            if (!statusPermitidos.includes(novoStatus)) {
                throw new Error("Status inválido.");
            }

            await repository.atualizarStatus(parseInt(id), novoStatus);
            return res.json({ message: "Status de entrega atualizado!" });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao atualizar entrega';
            return res.status(400).json({ erro: message });
        }
    });
}