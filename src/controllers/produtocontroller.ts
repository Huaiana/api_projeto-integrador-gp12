import {Produto} from '../models/produto';

export class ProdutoController {
    private produtos: Produto[] = [];

    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    public listarProdutos(): Produto[] {
        return this.produtos;
    }

    public buscarProdutoPorId(id: number): Produto | undefined {
        return this.produtos.find(produto => produto.id === id);
    }

    public removerProduto(id: number): void {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
    }   

    public atualizarProduto(id: number, produtoAtualizado: Produto): void {
        const index = this.produtos.findIndex(produto => produto.id === id);
        if (index !== -1) {
            this.produtos[index] = produtoAtualizado;
        }
    }
}
