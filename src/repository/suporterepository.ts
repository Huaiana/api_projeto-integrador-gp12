import db from "../database/database";

export interface Suporte {
    id?: number;
    cliente_id: number;
    assunto: string;
    mensagem: string;
    data_contato?: string;
}

export class SuporteRepository {
    salvar(suporte: Suporte): Suporte {
        const resultado = db
            .prepare("INSERT INTO suporte (cliente_id, assunto, mensagem) VALUES (?, ?, ?)")
            .run(suporte.cliente_id, suporte.assunto, suporte.mensagem);

        return { ...suporte, id: Number(resultado.lastInsertRowid) };
    }

    listarPorCliente(clienteId: number): Suporte[] {
        return db.prepare("SELECT * FROM suporte WHERE cliente_id = ?").all(clienteId) as Suporte[];
    }
}