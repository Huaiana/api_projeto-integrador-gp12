import db from "../database/database";

export interface Desconto {
  id?: number;
  codigo_cupom: string;
  tipo: 'PORCENTAGEM' | 'FIXO';
  porcentagem_desconto: number | null;
  valor_fixo_desconto: number | null;
  data_validade?: string;
  ativo: number;
}

export class DescontoRepository {

  salvar(desconto: Desconto): Desconto {
    const resultado = db
      .prepare(`
        INSERT INTO desconto (codigo_cupom, tipo, porcentagem_desconto, valor_fixo_desconto, data_validade, ativo) 
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .run(
        desconto.codigo_cupom,
        desconto.tipo,
        desconto.porcentagem_desconto,
        desconto.valor_fixo_desconto,
        desconto.data_validade,
        desconto.ativo ?? 1
      );

    return { ...desconto, id: Number(resultado.lastInsertRowid) };
  }

  // Lista todos os descontos para mostrar "cada qual" que existe no banco
  listar(): Desconto[] {
    return db.prepare("SELECT * FROM desconto").all() as Desconto[];
  }

  // Busca um desconto específico pelo código (Ex: 'PROJETO20')
  buscarPorCodigo(codigo: string): Desconto | null {
    return (
      db.prepare("SELECT * FROM desconto WHERE codigo_cupom = ? AND ativo = 1").get(codigo) as Desconto
    ) ?? null;
  }

  
  obterDetalhesDoDesconto(codigo: string) {
    const cupom = this.buscarPorCodigo(codigo);
    if (!cupom) return "Cupom não encontrado ou inativo.";

    if (cupom.tipo === 'PORCENTAGEM') {
      return {
        tipo: cupom.tipo,
        valor: cupom.porcentagem_desconto,
        descricao: `Este é um desconto de ${cupom.porcentagem_desconto}%`
      };
    } else {
      return {
        tipo: cupom.tipo,
        valor: cupom.valor_fixo_desconto,
        descricao: `Este é um desconto fixo de R$ ${cupom.valor_fixo_desconto}`
      };
    }
  }
}
