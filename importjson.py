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
    nome: str = "Óleo Bifásico de Lavanda"
    descricao: str
    volume: str = "120ml"
    preco_base: float = "49.90"
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


class BaseRepository:
    def __init__(self, db_path='empresa.db'):
        self.db_path = db_path

    def conectar(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn


class ProdutoRepository(BaseRepository):
    def listar(self) -> List[Produto]:
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM produto")
            return [Produto(**dict(row)) for row in cursor.fetchall()]

    def atualizar_estoque(self, id: int, estoque: int):
        with self.conectar() as conn:
            conn.execute(
                "UPDATE produto SET estoque = ? WHERE id = ?", (estoque, id))
            conn.commit()


class PedidoRepository(BaseRepository):
    def listar(self) -> List[Pedido]:
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM pedido")
            return [Pedido(**dict(row)) for row in cursor.fetchall()]

    def atualizar(self, id: int, qtd: int, total: float):
        with self.conectar() as conn:
            conn.execute("UPDATE pedido SET quantidade = ?, valor_total = ? WHERE id = ?",
                         (qtd, total, id))
            conn.commit()


class EmpresaController:
    def __init__(self):

        self.prod_repo = ProdutoRepository()
        self.ped_repo = PedidoRepository()

        self.lista_clientes: List[Cliente] = []
        self.lista_produtos: List[Produto] = []
        self.lista_descontos: List[Desconto] = []
        self.lista_fretes: List[Frete] = []
        self.lista_pedidos: List[Pedido] = []
        self.lista_suporte: List[Suporte] = []
        self.lista_acompanhamento: List[Acompanhamento] = []

    def carregar_dados(self):
        """Sincroniza o banco com as listas locais (Equivalente ao import original)"""
        try:
            with self.prod_repo.conectar() as conn:
                cursor = conn.cursor()

                cursor.execute("SELECT * FROM cliente")
                self.lista_clientes = [
                    Cliente(**dict(row)) for row in cursor.fetchall()]

                cursor.execute("SELECT * FROM desconto")
                self.lista_descontos = [
                    Desconto(**dict(row)) for row in cursor.fetchall()]

                cursor.execute("SELECT * FROM frete")
                self.lista_fretes = [Frete(**dict(row))
                                     for row in cursor.fetchall()]

                cursor.execute("SELECT * FROM suporte")
                self.lista_suporte = [Suporte(**dict(row))
                                      for row in cursor.fetchall()]

                cursor.execute("SELECT * FROM acompanhamento")
                self.lista_acompanhamento = [Acompanhamento(
                    **dict(row)) for row in cursor.fetchall()]

                self.lista_produtos = self.prod_repo.listar()
                self.lista_pedidos = self.ped_repo.listar()

            print("✅ Dados sincronizados com sucesso!")
        except Exception as e:
            print(f"❌ Erro ao carregar dados: {e}")

    def atualizar_estoque_no_banco(self, produto_id: int, novo_estoque: int):
        """Chama o repositório e atualiza a memória local."""
        self.prod_repo.atualizar_estoque(produto_id, novo_estoque)
        for p in self.lista_produtos:
            if p.id == produto_id:
                p.estoque = novo_estoque
                break
        print(f"📦 Estoque ID {produto_id} atualizado localmente e no banco.")

    def atualizar_pedido_no_banco(self, pedido_id: int, qtd: int, total: float):
        """Chama o repositório e atualiza a memória local."""
        self.ped_repo.atualizar(pedido_id, qtd, total)
        for ped in self.lista_pedidos:
            if ped.id == pedido_id:
                ped.quantidade = qtd
                ped.valor_total = total
                break
        print(f"🛒 Pedido ID {pedido_id} atualizado localmente e no banco.")


def main():

    controller = EmpresaController()
    controller.carregar_dados()

    if not controller.lista_produtos or not controller.lista_fretes:
        print("⚠️ Base de dados vazia ou inconsistente.")
        return

    prod = controller.lista_produtos[0]
    config_frete = controller.lista_fretes[0]
    distancia = 0.20
    valor_frete = config_frete.calcular_frete(distancia)

    print(f"\n--- Cupom Fiscal Simulado ---")
    print(f"Produto: {prod.nome}")
    print(f"Preço Base: R${prod.preco_base:.2f}")
    if valor_frete is not None:
        print(f"Frete: R${valor_frete:.2f}")
        print(f"TOTAL: R${(prod.preco_base + valor_frete):.2f}")
    print(f"----------------------------\n")


if __name__ == "__main__":
    main()
