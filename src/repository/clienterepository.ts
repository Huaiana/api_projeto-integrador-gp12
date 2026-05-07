import db from "../database/database";
import { Cliente } from "../models/cliente";

export class ClienteRepository {
    salvar(cliente: cliente): cliente {
        const resultado = db
        .prepare("INSERT INTO cliente (nome, email, senha, data_nascimento, endereco, telefone, cpf) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .run(cliente.nome, cliente.email, cliente.senha, cliente.data_nascimento, cliente.endereco, cliente.telefone, cliente.cpf);
        return { id: resultado.lastInsertRowid as number, ...cliente };
    }   

    listar(): cliente[] {
        return db.prepare("SELECT * FROM cliente").all() as cliente[];
    }

    buscarPorId(id: number): cliente | null {
        return db.prepare("SELECT * FROM cliente WHERE id = ?").get(id) as cliente | null;
    }

    buscarporNome(nome: string): cliente[] {
        return db.prepare("SELECT * FROM cliente WHERE nome LIKE ?").all(`%${nome}%`) as cliente[];
    }   

    atualizar(id: number, cliente: cliente): cliente | null {
        const resultado = db.prepare("UPDATE cliente SET nome = ?, email = ?, senha = ?, data_nascimento = ?, endereco = ?, telefone = ?, cpf = ? WHERE id = ?")
        .run(cliente.nome, cliente.email, cliente.senha, cliente.data_nascimento, cliente.endereco, cliente.telefone, cliente.cpf, id);
        if (resultado.changes > 0) {


            return { id, ...cliente };
        }

        return null;
    }

    deletar(id: number): boolean {
        const resultado = db.prepare("DELETE FROM cliente WHERE id = ?").run(id);
        return resultado.changes > 0;
    }

}

