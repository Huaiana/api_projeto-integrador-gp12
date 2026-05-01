import { Pedido } from "../models/pedido";

export class PedidoRepository {
    private pedidos: Pedido[];

    constructor() {
        this.pedidos = [];
    }

    public save(pedido: Pedido): void {
        this.pedidos.push(pedido);
    }

    public findAll(): Pedido[] {
        return this.pedidos;
    }
}   