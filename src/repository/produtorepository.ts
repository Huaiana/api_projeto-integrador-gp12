import { Produto } from '../models/produto';

export class ProdutoRepository {
    private produtos: Produto[];

    constructor() {
        this.produtos = [];
    }

    public save(produto: Produto): void {
        this.produtos.push(produto);
    }

    public findAll(): Produto[] {
        return this.produtos;
    }
}