import { app } from '../server';
import { SuporteRepository } from '../repository/suporterepository';

export function SuporteController() {
    const repository = new SuporteRepository();

    
    app.post("/suporte", async (req: Req, res: Res) => {
        try {
            const { cliente_id, assunto, mensagem } = req.body;

        
            if (!cliente_id) throw new Error("ID do cliente é obrigatório.");
            if (!assunto || assunto.trim().length < 5) throw new Error("Assunto muito curto.");
            if (!mensagem || mensagem.trim().length < 10) throw new Error("Mensagem deve conter detalhes.");

            const suporte = await repository.salvar({
                cliente_id,
                assunto,
                mensagem,
                data_contato: new Date()
            });

            return res.status(201).json({
                message: "Sua mensagem foi enviada com sucesso!",
                protocolo: suporte.id
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao enviar suporte';
            return res.status(400).json({ erro: message });
        }
    });

    
    app.get("/suporte/cliente/:id", async (req, res) => {
        const cliente_id = parseInt(req.params.id);
        const chamados = await repository.buscarPorCliente(cliente_id);
        return res.json(chamados);
    });
}