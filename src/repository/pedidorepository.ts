import db from "../datbase/database";
import { Pedido } from "../models/pedido";


type Pedido = {
    id: number;
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

export class PedidoRepository {
    salvar(pedido: Pedido): Pedido {
        const insertPedido = db.prepare(`INSERT INTO pedidos (cliente_id, produto_id, quantidade, valor_unitario, valor_total, status, data_criacao, data_atualizacao, desconto_id, data_venda, endereco_entrega, distancia_calculada, valor_frete, valor_desconto, total_final, metodo_pagamento) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      
        const executar =db.transaction((pedido: Pedido) => {
            const result = insertPedido.run(
                pedido.cliente_id,
                pedido.produto_id)
            const pedidoId = quantidade(result.lastInsertRowid);
            
            
            const salvarpedido: Pedido[] = pedido.map(pedido) => {
                const res = insertPedido.run(
                    pedido.cliente_id,
                    pedido.produto_id,
                    pedido.quantidade,
                    pedido.valor_unitario,
                    pedido.valor_total,
                    pedido.status,
                    pedido.data_criacao,
                    pedido.data_atualizacao,
                    pedido.desconto_id,
                    pedido.data_venda,
                    pedido.endereco_entrega,    
                    pedido.distancia_calculada,
                    pedido.valor_frete,
                    pedido.valor_desconto,
                    pedido.total_final,
                    pedido.metodo_pagamento
                );
                return {
                    id: res.lastInsertRowid,
                    ...pedido
                }
    listar(): Pedido[] {
        const pedido = db.prepare(`SELECT * FROM pedidos`).all() as PedidoRow[];
        const pedido: pedido[] = pedidoRows.map((i) => ({
            id: i.id,
            cliente_id: i.cliente_id,
            produto_id: i.produto_id,
            quantidade: i.quantidade,
            valor_unitario: i.valor_unitario,
            valor_total: i.valor_total,
            status: i.status,
            data_criacao: i.data_criacao,
            data_atualizacao: i.data_atualizacao,
            desconto_id: i.desconto_id,
            data_venda: i.data_venda,
            endereco_entrega: i.endereco_entrega,
            distancia_calculada: i.distancia_calculada,
            valor_frete: i.valor_frete,
            valor_desconto: i.valor_desconto,
            total_final: i.total_final,
            metodo_pagamento: i.metodo_pagamento
        }));
        return {id: p.id, cliente_id: p.cliente_id, produto_id: p.produto_id, quantidade: p.quantidade, valor_unitario: p.valor_unitario, valor_total: p.valor_total, status: p.status, data_criacao: p.data_criacao, data_atualizacao: p.data_atualizacao, desconto_id: p.desconto_id, data_venda: p.data_venda, endereco_entrega: p.endereco_entrega, distancia_calculada: p.distancia_calculada, valor_frete: p.valor_frete, valor_desconto: p.valor_desconto, total_final: p.total_final, metodo_pagamento: p.metodo_pagamento};
        });
    }
}


