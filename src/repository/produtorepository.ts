import db from "../database/database";
import { Produto } from "../models/produto";

export class ProdutoRepository {
    listarPorNome(arg0: string) {
        throw new Error('Method not implemented.');
    }    
    salvar(produto: Produto): Produto {
        const resultado = db
        .prepare("INSERT INTO produto (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)")
        .run(produto.nome, produto.descricao, (produto as any).preco, produto.estoque);

        return { ...produto, id: resultado.lastInsertRowid as number };
    }

listar(): Produto[] {
    return db.prepare("SELECT * FROM produto").all() as Produto[];
}

buscarPorId(id: number): Produto | null {
    return db.prepare("SELECT * FROM produto WHERE id = ?").get(id) as Produto | null;
}

atualizar(id: number, produto: Produto): Produto | null {
    const resultado = db.prepare("UPDATE produto SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?")
    .run(produto.nome, produto.descricao, (produto as any).preco, produto.estoque, id);
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

