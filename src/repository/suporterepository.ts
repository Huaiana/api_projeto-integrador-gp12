export interface Suporte {
    id: number;
    cliente_id: number;
    assunto: string;
    mensagem: string;
    data_criacao: string;
    status: 'Aberto' | 'Fechado';
}

export class SuporteRepository {
    private suportes: Suporte[];    
    constructor() { 
        this.suportes = [];
    }

    public save(suporte: Suporte): void {
        this.suportes.push(suporte);
    }   
    public findAll(): Suporte[] {
        return this.suportes;
    }       
    public findById(id: number): Suporte | undefined {
        return this.suportes.find(suporte => suporte.id === id);
    }   
    public updateStatus(id: number, status: 'Aberto' | 'Fechado'): boolean {    
        const suporte = this.findById(id);
        if (suporte) {
            suporte.status = status;
            return true;
        }   
        return false;
    }
}   