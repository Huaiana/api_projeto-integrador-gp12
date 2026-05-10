import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../../banco.db");
const db = new Database(dbPath);



db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS cliente (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nome            TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE, 
    senha           TEXT,
    data_nascimento DATE,
    endereco        TEXT NOT NULL,
    telefone        TEXT
  );

  CREATE TABLE IF NOT EXISTS produto (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nome        TEXT NOT NULL,
    descricao   TEXT,
    volume      TEXT DEFAULT '120 ml',
    preco       REAL DEFAULT 49.90 CHECK(preco >= 0),
    estoque     INTEGER NOT NULL DEFAULT 0,
    beneficios  TEXT,
    modo_uso    TEXT,
    indicacao   TEXT
  );

  CREATE TABLE IF NOT EXISTS desconto ( 
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_cupom         TEXT UNIQUE,
    tipo                 TEXT CHECK(tipo IN ('PORCENTAGEM','FIXO')),
    porcentagem_desconto REAL CHECK(porcentagem_desconto >= 0),
    valor_fixo_desconto  REAL,
    data_validade        DATE,
    ativo                BOOLEAN DEFAULT 1,
    CHECK (
      (tipo = 'PORCENTAGEM' AND porcentagem_desconto IS NOT NULL AND valor_fixo_desconto IS NULL)
      OR
      (tipo = 'FIXO' AND valor_fixo_desconto IS NOT NULL AND porcentagem_desconto IS NULL)
    )
  );

  CREATE TABLE IF NOT EXISTS frete (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    endereco_origem TEXT DEFAULT 'Avenida, Ademar de Barros, 576',
    valor_por_km    REAL CHECK(valor_por_km >= 0),
    distancia_km    REAL CHECK(distancia_km >= 0),
    valor_total     REAL CHECK(valor_total >= 0)
  );  

  CREATE TABLE IF NOT EXISTS pedido (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    desconto_id         INTEGER,
    cliente_id          INTEGER,
    produto_id          INTEGER,
    data_venda          DATETIME DEFAULT CURRENT_TIMESTAMP,
    endereco_entrega    TEXT,
    distancia_calculada REAL CHECK(distancia_calculada >= 0),
    valor_frete         REAL CHECK(valor_frete >= 0),
    valor_desconto      REAL DEFAULT 0 CHECK(valor_desconto >= 0),
    total_final         REAL CHECK(total_final >= 0),
    metodo_pagamento    TEXT,
    status_compra       TEXT DEFAULT 'PENDENTE' CHECK(status_compra IN ('PENDENTE', 'CONCLUIDO', 'CANCELADO')),

    FOREIGN KEY (desconto_id) REFERENCES desconto(id),
    FOREIGN KEY (cliente_id)  REFERENCES cliente(id),
    FOREIGN KEY (produto_id)  REFERENCES produto(id)
  );  

  CREATE TABLE IF NOT EXISTS suporte (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id   INTEGER,
    assunto      TEXT,
    mensagem     TEXT,
    data_contato DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)       
  );

  CREATE TABLE IF NOT EXISTS acompanhamento (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id        INTEGER,
    cliente_id       INTEGER,
    frete_id         INTEGER,
    status_entrega   TEXT CHECK(status_entrega IN ('EM ROTA', 'ENTREGUE', 'ATRASADO')),
    previsao_entrega DATETIME,
    FOREIGN KEY (pedido_id)  REFERENCES pedido(id),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (frete_id)   REFERENCES frete(id)
  );
`);

export default db;