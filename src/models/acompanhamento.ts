export interface acompanhamento {
    id: number;
    pedidoId: number;
    clienteId: number;
    status_entrega: string; 
    previsao_entrega: Date;
    entregue_em: Date | null;   
}   

