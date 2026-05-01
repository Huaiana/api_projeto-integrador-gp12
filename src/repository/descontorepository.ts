export interface Desconto {
    id: number;
    valor: number;
}

export class DescontoController {
    private desconto: Desconto[];   

    constructor() {
        this.desconto = [];
    }

    public save(desconto: Desconto): void {

        this.desconto.push(desconto);
    }       

    public findAll(): Desconto[] {
        return this.desconto;
    }
}


