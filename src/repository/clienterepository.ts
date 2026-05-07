import db from "../database";

export interface Cliente {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    data_nascimento: string;
    endereco: string;
    telefone: string;
    cpf: string;
}

export class ClienteRepository {
    findAll(): any {
        throw new Error("Method not implemented.");
    }
    listarPorName(arg0: string) {
        throw new Error("Method not implemented.");
    }
    salvar(cliente: Cliente): Cliente {
        const resultado = db
        .prepare("INSERT INTO cliente (nome, email, senha, data_nascimento, endereco, telefone, cpf) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .run(cliente.nome, cliente.email, cliente.senha, cliente.data_nascimento, cliente.endereco, cliente.telefone, cliente.cpf);
        return { ...cliente, id: resultado.lastInsertRowid as number };
    }   

    listar(): Cliente[] {
        return db.prepare("SELECT * FROM cliente").all() as Cliente[];
    }

    buscarPorId(id: number): Cliente | null {
        return db.prepare("SELECT * FROM cliente WHERE id = ?").get(id) as Cliente | null;
    }

    buscarporNome(nome: string): Cliente[] {
        return db.prepare("SELECT * FROM cliente WHERE nome LIKE ?").all(`%${nome}%`) as Cliente[];
    }   

    atualizar(id: number, cliente: Cliente): Cliente | null {
        const resultado = db.prepare("UPDATE cliente SET nome = ?, email = ?, senha = ?, data_nascimento = ?, endereco = ?, telefone = ?, cpf = ? WHERE id = ?")
        .run(cliente.nome, cliente.email, cliente.senha, cliente.data_nascimento, cliente.endereco, cliente.telefone, cliente.cpf, id);
        if (resultado.changes > 0) {
            return { ...cliente, id };
        }

        return null;
    }

    deletar(id: number): boolean {
        const resultado = db.prepare("DELETE FROM cliente WHERE id = ?").run(id);
        return resultado.changes > 0;
    }

}

