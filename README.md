# 🚀 API Automation Cypress - ServeRest

![Cypress](https://img.shields.io/badge/Cypress-15.x-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Status](https://img.shields.io/badge/Testes-24%20Passing-success)

Projeto de automação de testes de API desenvolvido com Cypress utilizando a API pública ServeRest como sistema sob teste.

O objetivo deste projeto é aplicar boas práticas de automação de testes, organização de código, reutilização de componentes, Git Flow e geração de relatórios, simulando uma estrutura próxima à utilizada em projetos reais de QA Automation.

---

# 📌 Tecnologias Utilizadas

- Cypress 15.x
- JavaScript (ES6+)
- Node.js 22.x
- Mochawesome
- Git
- GitHub
- Git Flow
- ServeRest API

---

# 🏗 Arquitetura do Projeto

O projeto foi estruturado visando separação de responsabilidades, reutilização de código e facilidade de manutenção.

## Services

Responsáveis pelas chamadas da API.

Exemplos:

- loginService.js
- usuariosService.js
- produtosService.js
- carrinhosService.js

---

## Factories

Responsáveis pela criação de massas de teste dinâmicas.

Exemplos:

- usuarioFactory.js
- produtoFactory.js

---

## Helpers

Responsáveis por encapsular fluxos reutilizáveis.

Exemplos:

### Auth Helper

```js
criarUsuarioELogin()
```

Responsável por:

- Criar usuário
- Realizar login
- Retornar token de autenticação

### Produto Helper

```js
criarProdutoComToken(token)
```

Responsável por:

- Criar produto autenticado

### Helper Composto

```js
criarUsuarioLoginEProduto()
```

Responsável por:

- Criar usuário
- Realizar login
- Criar produto
- Retornar token e id do produto

---

# 📂 Estrutura de Pastas

```text
cypress
├── e2e
│   ├── login
│   ├── usuarios
│   ├── produtos
│   └── carrinhos
│
├── services
│
├── factories
│
├── helpers
│   ├── authHelper.js
│   └── produtoHelper.js
│
├── fixtures
│
├── reports
│
└── support
```

---

# 🧪 Cenários Automatizados

## Login

- Login com sucesso
- Login com senha inválida
- Login com usuário inexistente
- Login sem e-mail
- Login sem senha

## Usuários

- Criar usuário
- Buscar usuário por ID
- Buscar usuário inexistente
- Buscar usuário com ID inválido
- Atualizar usuário
- Excluir usuário
- Não permitir excluir usuário com carrinho cadastrado

## Produtos

- Cadastrar produto com sucesso
- Não permitir produto duplicado
- Não permitir cadastro sem token
- Não permitir cadastro com token inválido
- Não permitir cadastro por usuário não administrador

## Carrinhos

- Cadastrar carrinho com sucesso
- Não permitir mais de um carrinho
- Não permitir cadastro sem token
- Não permitir cadastro com token inválido
- Não permitir produto inexistente
- Não permitir quantidade acima do estoque
- Concluir compra com sucesso

---

# 📊 Relatórios

O projeto utiliza Mochawesome para geração de relatórios HTML.

Gerar relatório:

```bash
npm run test:report
```

Gerar relatório com navegador visível:

```bash
npm run test:report:headed
```

Abrir relatório:

```bash
npm run report:open
```

---

# 🚀 Como Executar o Projeto

## Clonar repositório

```bash
git clone <url-do-repositorio>
```

## Instalar dependências

```bash
npm install
```

## Executar testes

```bash
npx cypress run
```

## Executar testes com relatório

```bash
npm run test:report
```

---

# 🌳 Estratégia de Versionamento

O projeto utiliza Git Flow para gerenciamento das alterações.

Fluxo utilizado:

```text
Feature Branch
↓
Commit
↓
Push
↓
Pull Request
↓
Code Review
↓
Merge
↓
Main
```

---

# 📈 Próximos Passos

- Implementar GitHub Actions
- Expandir cobertura dos endpoints
- Adicionar novos cenários negativos
- Evoluir documentação do projeto
- Aprimorar estratégia de relatórios

---

# 👨‍💻 Autor

Anderson Batista dos Santos

LinkedIn: https://www.linkedin.com/in/anderson-santos-qa

GitHub: https://github.com/AndyTex2003