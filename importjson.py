import sqlite3
from dataclasses import dataclass, asdict
from typing import List, Optional


@dataclass
class Cliente:
    id: int
    nome: str
    email: str
    senha: str
    data_nascimento: str
    endereco: str
    telefone: str
    cpf: str


@dataclass
class Produto:
    id: int
    nome: str
    descricao: str
    volume: str
    preco_base: float
    beneficios: str
    modo_uso: str
    indicacao: str
    estoque: int


@dataclass
class Pedido:
    id: int
    cliente_id: int
    produto_id: int
    quantidade: int
    valor_total: float
    data_pedido: str


@dataclass
class Desconto:
    id: int
    codigo_cupom: str
    tipo: str
    porcentagem_desconto: Optional[float] = None
    valor_fixo_desconto: Optional[float] = None
    data_validade: Optional[str] = None
    ativo: int = 1


@dataclass
class Frete:
    id: int
    endereco_origem: str
    valor_por_km: float
    distancia_maxima: float

    def calcular_frete(self, distancia_km: float) -> Optional[float]:
        if distancia_km > self.distancia_maxima:
            return None
        return distancia_km * self.valor_por_km


@dataclass
class Suporte:
    id: int
    cliente_id: int
    assunto: str
    mensagem: str
    data_criacao: str
    status: str


@dataclass
class Acompanhamento:
    id: int
    pedido_id: int
    status_entrega: str
    previsao_entrega: str
    cliente_id: int
    frete_id: int



lista_clientes: List[Cliente] = []
lista_produtos: List[Produto] = []
lista_descontos: List[Desconto] = []
lista_fretes: List[Frete] = []
lista_pedidos: List[dict] = []
lista_suporte: List[Suporte] = []
lista_acompanhamento: List[dict] = []


def conectar_bd():
    conn = sqlite3.connect('empresa.db')
    conn.row_factory = sqlite3.Row
    return conn


def carregar_dados():
    """Importa todos os dados do SQL para as listas em Python."""
    global lista_clientes, lista_produtos, lista_descontos, lista_fretes, lista_pedidos, lista_suporte, lista_acompanhamento

    conn = conectar_bd()
    cursor = conn.cursor()

    try:

        cursor.execute("SELECT * FROM cliente")
        lista_clientes = [Cliente(**dict(row)) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM produto")
        lista_produtos = [Produto(**dict(row)) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM pedido")
        lista_pedidos = [dict(row) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM desconto")
        lista_descontos = [Desconto(**dict(row)) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM frete")
        lista_fretes = [Frete(**dict(row)) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM suporte")
        lista_suporte = [Suporte(**dict(row)) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM acompanhamento")
        lista_acompanhamento = [dict(row) for row in cursor.fetchall()]

        print("✅ Dados sincronizados com sucesso!")
    except Exception as e:
        print(f"❌ Erro ao carregar dados: {e}")
    finally:
        conn.close()


def atualizar_estoque_no_banco(produto_id: int, novo_estoque: int):
    with conectar_bd() as conn:
        try:
            conn.execute("UPDATE produto SET estoque = ? WHERE id = ?",
                         (novo_estoque, produto_id))
            conn.commit()
            print(f"📦 Estoque ID {produto_id} atualizado para {novo_estoque}.")
        except sqlite3.Error as e:
            print(f"⚠️ Erro ao atualizar: {e}")


def atualizar_pedido_no_banco(pedido_id: int, nova_quantidade: int, novo_valor_total: float):
    with conectar_bd() as conn:
        try:
            conn.execute("UPDATE pedido SET quantidade = ?, valor_total = ? WHERE id = ?",
                         (nova_quantidade, novo_valor_total, pedido_id))
            conn.commit()

            salva_pedido = {
                "id": pedido_id,
                "cliente_id": 1,
                "produto_id": 1,
                "quantidade": nova_quantidade,
                "valor_total": novo_valor_total,
                "data_pedido": "2024-06-01"
            }

            lista_pedidos.append(salva_pedido)
            print(
                f"🛒 Pedido ID {pedido_id} atualizado: Quantidade {nova_quantidade}, Valor Total R${novo_valor_total:.2f}.")
        except sqlite3.Error as e:
            print(f"⚠️ Erro ao atualizar pedido: {e}")


def main():
    carregar_dados()

    if not lista_produtos or not lista_fretes:
        print("⚠️ Base de dados vazia. Certifique-se de que o 'empresa.db' existe e está populado.")
        return

    prod = lista_produtos[0]
    config_frete = lista_fretes[0]
    distancia = 0.20

    valor_frete = config_frete.calcular_frete(distancia)

    print(f"\n--- Cupom Fiscal Simulado ---")
    print(f"Produto: {prod.nome}")
    print(f"Preço Unitário: R${prod.preco_base:.2f}")

    if valor_frete is not None:
        total = prod.preco_base + valor_frete
        print(f"Frete ({distancia}km): R${valor_frete:.2f}")
        print(f"TOTAL: R${total:.2f}")
        print(f"----------------------------\n")
    else:
        print(f"❌ Entrega indisponível para a distância de {distancia}km.")


if __name__ == "__main__":
    main()
