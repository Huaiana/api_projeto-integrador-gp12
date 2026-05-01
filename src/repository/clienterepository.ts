export interface Cliente {
    id: number;
    nome: string;
}

export class ClienteController {
    private clientes: Cliente[];

    constructor() {
        this.clientes = [];
    }

    public save(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public findAll(): Cliente[] {
        return this.clientes;
    }
}