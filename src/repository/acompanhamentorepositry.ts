import db from "../database/database";

export interface Acompanhamento {
    id?: number;
    pedido_id: number;
    status_entrega: 'EM ROTA' | 'ENTREGUE' | 'ATRASADO';
    previsao_entrega: string;
    cliente_id: number;
    frete_id: number;
}

export class AcompanhamentoRepository {
    salvar(dados: Acompanhamento): Acompanhamento {
        const resultado = db
            .prepare(`
                INSERT INTO acompanhamento_entrega 
                (pedido_id, status_entrega, previsao_entrega, cliente_id, frete_id) 
                VALUES (?, ?, ?, ?, ?)
            `)
            .run(dados.pedido_id, dados.status_entrega, dados.previsao_entrega, dados.cliente_id, dados.frete_id);

        return { ...dados, id: Number(resultado.lastInsertRowid) };
    }

    buscarPorPedido(pedidoId: number): Acompanhamento | null {
        return (db.prepare("SELECT * FROM acompanhamento_entrega WHERE pedido_id = ?").get(pedidoId) as Acompanhamento) ?? null;
    }

    atualizarStatus(id: number, novoStatus: string): void {
        db.prepare("UPDATE acompanhamento_entrega SET status_entrega = ? WHERE id = ?")
          .run(novoStatus, id);
    }
}