Cosmetic Store API
Uma API robusta para gerenciamento de vendas de cosméticos, desenvolvida para oferecer uma experiência fluida de controle de inventário e pedidos. Este projeto foi estruturado utilizando o Repository Pattern, garantindo o desacoplamento entre a lógica de negócio e o acesso aos dados.

🚀 Tecnologias Utilizadas
Node.js & TypeScript: Desenvolvimento backend com tipagem estática para maior segurança e produtividade.

Express: Framework ágil para a criação de rotas e middlewares.

Better-SQLITE3: Banco de dados local de alta performance para operações síncronas e eficientes.

Nodemon & Ts-node: Ambiente de desenvolvimento otimizado com hot-reload.

🏗️ Arquitetura do Projeto
O projeto segue uma estrutura organizada para facilitar a escalabilidade e testes:

Model: Definição das entidades e regras de negócio através de classes e interfaces.

Repository: Camada de persistência responsável por todas as consultas SQL e manipulação do banco de dados (Isolamento de dados).

Controller: Gerenciamento das requisições HTTP, validação de dados de entrada e comunicação com o frontend.

Database: Configuração e integração centralizada com o SQLite.

🛠️ Funcionalidades Principais
[x] Cadastro e gerenciamento de produtos (Cosméticos).

[x] Sistema de controle de estoque.

[x] Processamento de pedidos de venda.

[x] Persistência de dados segura com SQLite.

💻 Como Executar o Projeto
Clone o repositório:

Instale as dependências:

Inicie o servidor de desenvolvimento:

O servidor iniciará automaticamente através do nodemon.

📈 Diferenciais Técnicos demonstrados:
Separação de Responsabilidades (SoC): Divisão clara entre rotas, lógica e banco.

Data Isolation: Uso do padrão Repository para evitar que a regra de negócio dependa diretamente do SQL.

Type Safety: Uso rigoroso de interfaces TypeScript em toda a aplicação.

Dicas para o seu LinkedIn:
Ao postar este projeto, utilize um texto de apoio como:

"Acabo de finalizar um sistema de backend para um e-commerce de cosméticos! 🚀

Neste projeto, foquei em aplicar o Repository Pattern com TypeScript e Node.js, garantindo que a aplicação seja fácil de manter e testar. Utilizei o Better-SQLITE3 para uma gestão de dados ágil e o Express para estruturar uma API REST organizada.

Confira os detalhes da arquitetura Model-Repository-Controller no meu repositório: [Link do seu GitHub]"

Essa abordagem demonstra que você não apenas "sabe codar", mas entende de arquitetura de software.
