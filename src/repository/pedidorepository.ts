import db from "../database/database";
import { Pedido } from "../models/pedido";

export class PedidoRepository {
    salvar(pedido: Pedido): Pedido {
        const insertPedido = db.prepare(`
            INSERT INTO pedidos (
                cliente_id, produto_id, quantidade, valor_unitario,  valor_total,  status,
                data_criacao,  data_atualizacao,  desconto_id,  data_venda,  endereco_entrega,
                distancia_calculada,  valor_frete, valor_desconto,  total_final, metodo_pagamento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        const result = insertPedido.run(
            pedido.cliente_id, pedido.produto_id, pedido.quantidade, pedido.valor_unitario, pedido.valor_total,
            pedido.status, pedido.data_criacao, pedido.data_atualizacao, pedido.desconto_id, pedido.data_venda,
            pedido.endereco_entrega, pedido.distancia_calculada, pedido.valor_frete, pedido.valor_desconto,
            pedido.total_final, pedido.metodo_pagamento
        );

        return {
            ...pedido,
            id: Number(result.lastInsertRowid)
        };
    }

    listar(): Pedido[] {
        const pedidoRows = db.prepare(`SELECT * FROM pedidos`).all() as Pedido[];

        return pedidoRows.map((i) => ({
            id: i.id, cliente_id: i.cliente_id, produto_id: i.produto_id, quantidade: i.quantidade,
            valor_unitario: i.valor_unitario, valor_total: i.valor_total,  status: i.status,
            data_criacao: i.data_criacao,  data_atualizacao: i.data_atualizacao, desconto_id: i.desconto_id,
            data_venda: i.data_venda, endereco_entrega: i.endereco_entrega, distancia_calculada: i.distancia_calculada,
            valor_frete: i.valor_frete, valor_desconto: i.valor_desconto,  total_final: i.total_final,
            metodo_pagamento: i.metodo_pagamento
        }));
    }
}


