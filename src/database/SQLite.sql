PRAGMA foreign_keys = ON;

CREATE TABLE cliente (
  id INTEGER PRIMARY KEy AUTOINCREMENT,
  nome TEXT,
  email TEXT NOT NULL, 
  senha TEXT,
  data_nascimento DATE,
  endereco TEXT NOT NULL,
  telefone TEXT
  );
  

CREATE TABLE produto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL DEFAULT 'Óleo Bifásico de Lavanda',
  descricao TEXT,
  volume TEXT DEFAULT '120 ml',
  preco_base REAL DEFAULT 49.90 CHECK(preco_base >= 0),
  beneficios TEXT,
  modo_uso TEXT,
  indicacao TEXT,
  estoque INTEGER DEFAULT 0 CHECK(estoque >= 0)
);


CREATE TABLE desconto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo_cupom TEXT UNIQUE,
  tipo TEXT CHECK(tipo IN ('PORCENTAGEM','FIXO')),
  porcentagem_desconto REAL CHECK(porcentagem_desconto >= 0),
  valor_fixo_desconto REAL,
  data_validade DATE,
  ativo BOOLEAN DEFAULT 1,
  CHECK (
    (tipo = 'PORCENTAGEM' AND porcentagem_desconto IS NOT NULL AND valor_fixo_desconto IS NULL)
    OR
    (tipo = 'FIXO' AND valor_fixo_desconto IS NOT NULL AND porcentagem_desconto IS NULL)
  )
);


CREATE TABLE frete (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  endereco_origem TEXT DEFAULT 'Rua Ademar de Barros, 576',
  valor_por_km REAL CHECK(valor_por_km >= 0),
  distancia_maxima REAL CHECK(distancia_maxima >= 0)
);


CREATE TABLE pedido (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  desconto_id INTEGER,
  data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
  endereco_entrega TEXT,
  distancia_calculada REAL CHECK(distancia_calculada >= 0),
  valor_frete REAL CHECK(valor_frete >= 0),
  valor_desconto REAL DEFAULT 0 CHECK(valor_desconto >= 0),
  total_final REAL CHECK(total_final >= 0),
  metodo_pagamento TEXT,
  cliente_id INTEGER,
  produto_id INTEGER,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (produto_id) REFERENCES produto(id),
  FOREIGN KEY (desconto_id) REFERENCES desconto(id)
);

INSERT INTO cliente (nome, email, senha, data_nascimento, endereco, telefone) VALUES
('vitoria', 'vmelo3578@gmail.com', 'vitorialinda123', '2006-07-17', 'Rua Exemplo, 100', '13997558495'),
('Lucas Silva', 'lucas.silva@outlook.com', 'lucas123456', '1995-03-12', 'Av. Central, 500', '11988776655'),
('Mariana Costa', 'mari.costa22@gmail.com', 'maricosta@2024', '1998-11-25', 'Rua das Flores, 12', '21977665544'),
('Felipe Andrade', 'felipe.andrade@yahoo.com', 'senhaforte99', '2001-05-02', 'Rua B, 250', '31966554433'),
('Juliana Lima', 'ju_lima88@hotmail.com', 'july_1234', '1988-08-15', 'Av. Brasil, 1010', '41955443322'),
('Ricardo Santos', 'ricardo.santos@gmail.com', 'ricardo@pass', '1992-01-30', 'Rua Chile, 55', '51944332211'),
('Beatriz Rocha', 'bia_rocha99@live.com', 'bia998877', '1999-07-07', 'Rua 7 de Setembro, 7', '61933221100'),
('Gabriel Souza', 'gabriel.souza@gmail.com', 'gabriel_0102', '2003-12-10', 'Al. Santos, 80', '71922110099'),
('Camila Oliveira', 'camila.oliveira@me.com', 'cami_oliveira', '1996-04-22', 'Rua das Palmeiras, 99', '81911009988'),
('Tiago Mendes', 'tiago.mendes@gmail.com', 'tiago_mendes1', '1990-09-18', 'Av. Paulista, 1500', '91900998877');


INSERT INTO produto (
  nome, descricao, volume, preco_base, beneficios, modo_uso, indicacao, estoque
) VALUES (
  'Óleo Bifásico de Lavanda',
  'Um óleo leve que hidrata, perfuma e deixa sua pele macia com aroma suave de lavanda',
  '120 ml',
  49.90,
  'Hidrata; Pele macia; Aroma calmante; Refrescante',
  'Agite antes de usar e aplique na pele',
  'Todos os tipos de pele',
  100
);

INSERT INTO frete (valor_por_km, distancia_maxima)
VALUES (2.00, 20.00);

INSERT INTO desconto (
  codigo_cupom, tipo, porcentagem_desconto, ativo
) VALUES (
  'PROJETO20', 'PORCENTAGEM', 20.00, 1
);

INSERT INTO pedido (
  desconto_id,
  endereco_entrega,
  distancia_calculada,
  valor_frete,
  valor_desconto,
  total_final,
  metodo_pagamento,
  cliente_id,
  produto_id
)
VALUES (
  1,
  'Rua das Flores, 123',
  10.00,
  20.00,
  9.98,
  59.92,
  'PIX',
  1,
  1
);


UPDATE produto
SET estoque = estoque - 1
WHERE id = 1 AND estoque > 0;


SELECT 
    p.id AS ID_Pedido,
    pr.nome AS Produto,
    c.nome AS Cliente,
    p.endereco_entrega,
    d.codigo_cupom,
    p.valor_frete,
    p.valor_desconto,
    p.total_final,
    p.data_venda
FROM pedido p
LEFT JOIN desconto d ON p.desconto_id = d.id
LEFT JOIN produto pr ON p.produto_id = pr.id
LEFT JOIN cliente c ON p.cliente_id = c.id;