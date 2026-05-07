import db from "../database/database";
import { Produto } from "../models/produto";

export class ProdutoRepository {    
    salvar(produto: Produto): Produto {
        const resultado = db
        .prepare("INSERT INTO produto (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)")
        .run(produto.nome, produto.descricao, produto.preco, produto.estoque);

        return { id: resultado.lastInsertRowid as number, ...produto };
    }

listar(): Produto[] {
    return db.prepare("SELECT * FROM produto").all() as Produto[];
}

buscarPorId(id: number): Produto | null {
    return db.prepare("SELECT * FROM produto WHERE id = ?").get(id) as Produto | null;
}

atualizar(id: number, produto: Produto): Produto | null {
    const resultado = db.prepare("UPDATE produto SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?")
    .run(produto.nome, produto.descricao, produto.preco, produto.estoque, id);
    if (resultado.changes > 0) {

        return { id, ...produto };
    }

    return null;
}   

deletar(id: number): boolean {
    const resultado = db.prepare("DELETE FROM produto WHERE id = ?").run(id);
    return resultado.changes > 0;
}       

}

