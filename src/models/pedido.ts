export interface Pedido {
    id: number
    cliente_id: number
    produto_id: number
    quantidade: number
    valor_unitario: number
    valor_total: number
    status: string
    data_criacao: string
    data_atualizacao: string
    desconto_id: number
    data_venda: string
    endereco_entrega: string
    distancia_calculada: number 
    valor_frete: number
    valor_desconto: number
    total_final: number
    metodo_pagamento: string
}