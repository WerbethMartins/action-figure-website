![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)
![JSON-Server](https://img.shields.io/badge/JSON--Server-000?style=for-the-badge&logo=json&logoColor=white)

# ⛩️ Animes Actions.F 

Este projeto é uma aplicação de um e-commerce que foi desenvolvida para colocar em práticas conceitos avançados de **Front-end**, como gerenciamento 
de estados globais, consumo de **API's REST** e tipagem estática.  

🛠️ Tecnologias e Ferramentas

📌 Objetivos do Projeto
O foco principal de desenvolvimento do projeto:

* Comunicação Assíncrona: Implementação de fetch com async/await para operações de CRUD (Create, Read, Update, Delete).

* API Fake: Utilização do json-server para simular um banco de dados real e testar latência e respostas HTTP (200, 404, 500).

* Segurança de Tipos: Uso de interfaces e tipos do TypeScript para evitar erros em tempo de execução.

🔐 Autenticação e Persistência

Diferente de soluções externas, a autenticação deste projeto foi construída de forma customizada:
* **Persistência Local:** Utilização do localStorage para manter o estado do usuário (nome, e-mail e token simulado) mesmo após o recarregamento da página (F5).
* **Gestão de Sessão:** Implementação de lógica no AuthContext para verificar a existência de dados no navegador durante a inicialização da aplicação.
* **API Centralizada:** Login, novo usuário e busca de pedidos estão concentradas no arquivo api.ts, facilitando a manutenção e a organização do código assíncrono.

🧠 Gerenciamento de Estado Global
* **Recuperação Automática:** Ao iniciar, o UserProvider verifica o localStorage via lazy initialization no useState. 
* **Sincronização:** As funções signIn e signOut garantem que o estado do React e o armazenamento local estejam sempre espelhados.
* **Segurança de Tipos:** Todo o contexto é estritamente tipado com TypeScript Interfaces.

🚀 Funcionalidades

* [x] Listagem de produtos dinâmica vinda da API.

* [x] Carrinho de compras com atualização em tempo real (PATCH).

* [x] Sistema de Login e Proteção de Rotas.

* [x] Validação de formulários customizada.

* [x] Toggle de visibilidade de senha.

📦 Como rodar o projeto

1. Clone o repositório:
  ```bash
  git clone https://github.com/seu-usuario/animes-actions.git 

2. Instale as dependências:
  ```bash
  npm install

3. Inicie a API Fake (JSON Server):
  ```bash
  npx json-server --watch db.json --port 3000

4. Inicie a aplicação
  ```bash
  npm run dev

🚀 Deploy (Vercel)

Para o deploy na Vercel, utilizei uma estratégia de Mock Data para a listagem de produtos, enquanto a persistência de Carrinho, Usuário e Pedidos é gerenciada via Web Storage (LocalStorage), garantindo que a aplicação seja totalmente funcional mesmo sem um backend persistente externo.

Desenvolvido por [Werbeth Martins Sousa](https://www.linkedin.com/in/werbeth-sousa-608428185/) - 2026 🚀

🧠 Aprendizados e Desafios Superados
Durante o desenvolvimento, aprendi ainda mais a lidar com o comportamento assíncrono do JavaScript, garantindo que a Interface do Usuário (UI) não quebre enquanto aguarda a resposta do servidor. Também reforcei meu aprendizado em como trabalhar com Hooks customizados para validação e autenticação.