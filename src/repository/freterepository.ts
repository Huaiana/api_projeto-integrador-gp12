import { Frete } from '../models/frete';

export class FreteRepository {
    private frete: Frete[];

    constructor() {
        this.frete = [];
    }

    public save(frete: Frete): void {
        this.frete.push(frete);
    }

    public findAll(): Frete[] {
        return this.frete;
    }
}