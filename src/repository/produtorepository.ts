import db from "../database/database";
import { Produto } from "../models/produto";

const SELECT_FIELDS = `id, nome, descricao, volume, preco AS preco_base, estoque, beneficios, modo_uso, indicacao`;

export class ProdutoRepository {
    listarPorNome(nome: string): Produto[] {
        return db
            .prepare(`SELECT ${SELECT_FIELDS} FROM produto WHERE nome LIKE ?`)
            .all(`%${nome}%`) as Produto[];
    }

    salvar(produto: Produto): Produto {
        const resultado = db
            .prepare(
                "INSERT INTO produto (nome, descricao, volume, preco, estoque, beneficios, modo_uso, indicacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            )
            .run(
                produto.nome,
                produto.descricao,
                produto.volume,
                produto.preco_base,
                produto.estoque,
                produto.beneficios,
                produto.modo_uso,
                produto.indicacao
            );

        return { ...produto, id: resultado.lastInsertRowid as number };
    }

    listar(): Produto[] {
        return db.prepare(`SELECT ${SELECT_FIELDS} FROM produto`).all() as Produto[];
    }

    buscarPorId(id: number): Produto | null {
        return db
            .prepare(`SELECT ${SELECT_FIELDS} FROM produto WHERE id = ?`)
            .get(id) as Produto | null;
    }

    atualizar(id: number, produto: Produto): Produto | null {
        const resultado = db
            .prepare(
                "UPDATE produto SET nome=?, descricao=?, volume=?, preco=?, estoque=?, beneficios=?, modo_uso=?, indicacao=? WHERE id=?"
            )
            .run(
                produto.nome,
                produto.descricao,
                produto.volume,
                produto.preco_base,
                produto.estoque,
                produto.beneficios,
                produto.modo_uso,
                produto.indicacao,
                id
            );

        if (resultado.changes > 0) {
            return { ...produto, id };
        }
        return null;
    }

    deletar(id: number): boolean {
        const resultado = db.prepare("DELETE FROM produto WHERE id = ?").run(id);
        return resultado.changes > 0;
    }
}
