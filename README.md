# API Automation Cypress - ServeRest

![Cypress](https://img.shields.io/badge/Cypress-15.x-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Status](https://img.shields.io/badge/Testes-24%20Passing-success)

Projeto de automação de testes de **API REST** desenvolvido com **Cypress e JavaScript**, utilizando a API pública **ServeRest** como sistema sob teste.

O projeto foi estruturado para aplicar boas práticas de automação, separação de responsabilidades, reutilização de código, criação dinâmica de massas de teste, validação de cenários positivos e negativos e geração de relatórios de execução.

---

## Tecnologias Utilizadas

- Cypress 15.x
- JavaScript (ES6+)
- Node.js 22.x
- Mochawesome
- Git
- GitHub
- ServeRest API

---

## Arquitetura do Projeto

O projeto foi estruturado com foco na separação de responsabilidades, reutilização de código e facilidade de manutenção.

### Services

Responsáveis por centralizar as chamadas realizadas aos endpoints da API.

Exemplos:

- `loginService.js`
- `usuariosService.js`
- `produtosService.js`
- `carrinhosService.js`

---

### Factories

Responsáveis pela criação de massas de teste dinâmicas utilizadas nos cenários automatizados.

Exemplos:

- `usuarioFactory.js`
- `produtoFactory.js`

---

### Helpers

Responsáveis por encapsular fluxos reutilizáveis e reduzir a repetição de código nos testes automatizados.

#### Auth Helper

O helper de autenticação utiliza a função:

`criarUsuarioELogin()`

Responsável por:

- Criar um usuário para o cenário de teste
- Realizar a autenticação
- Retornar o token utilizado nas requisições autenticadas

#### Produto Helper

O helper de produto utiliza a função:

`criarProdutoComToken(token)`

Responsável por:

- Criar um produto utilizando autenticação
- Reutilizar o token recebido no fluxo
- Preparar os dados necessários para cenários que dependem de um produto cadastrado

#### Helper Composto

O fluxo composto utiliza a função:

`criarUsuarioLoginEProduto()`

Responsável por:

- Criar um usuário para o cenário de teste
- Realizar a autenticação
- Criar um produto autenticado
- Retornar o token e o ID do produto para utilização nos testes
---

## Estrutura do Projeto

```text
api-automation-cypress-serverest/
│
├── cypress/
│   ├── e2e/
│   │   ├── carrinhos/
│   │   ├── login/
│   │   ├── produtos/
│   │   └── usuarios/
│   ├── factories/
│   ├── fixtures/
│   ├── helpers/
│   ├── services/
│   └── support/
│
├── .gitignore
├── README.md
├── cypress.config.js
├── package-lock.json
└── package.json
```
---

## Cenários Automatizados

### Login

- Login com sucesso
- Login com senha inválida
- Login com usuário inexistente
- Login sem e-mail
- Login sem senha

### Usuários

- Criar usuário
- Buscar usuário por ID
- Buscar usuário inexistente
- Buscar usuário com ID inválido
- Atualizar usuário
- Excluir usuário
- Não permitir excluir usuário com carrinho cadastrado

### Produtos

- Cadastrar produto com sucesso
- Não permitir produto duplicado
- Não permitir cadastro sem token
- Não permitir cadastro com token inválido
- Não permitir cadastro por usuário não administrador

### Carrinhos

- Cadastrar carrinho com sucesso
- Não permitir mais de um carrinho
- Não permitir cadastro sem token
- Não permitir cadastro com token inválido
- Não permitir produto inexistente
- Não permitir quantidade acima do estoque
- Concluir compra com sucesso

---

## Relatórios

O projeto utiliza **Mochawesome** para geração de relatórios HTML das execuções automatizadas.

### Gerar relatório

```bash
npm run test:report
```

### Gerar relatório com navegador visível:

```bash
npm run test:report:headed
```

### Abrir relatório:

```bash
npm run report:open
```

---

## Como Executar o Projeto

### Clonar o repositório

```bash
git clone https://github.com/AndyTex2003/api-automation-cypress-serverest.git
cd api-automation-cypress-serverest
```

### Instalar as dependências

```bash
npm install
```

### Executar os testes

```bash
npx cypress run
```

### Executar os testes com relatório

```bash
npm run test:report
```

---

## Estratégia de Versionamento

O projeto utiliza Git e GitHub com uma estratégia baseada em branches de feature e Pull Requests, permitindo organizar as alterações e manter a branch principal estável.

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

## Evoluções Futuras

- Implementar integração contínua com GitHub Actions para execução automática dos testes em Pull Requests e pushes.
- Expandir a cobertura automatizada para outros comportamentos e endpoints da API.
- Adicionar novos cenários negativos e casos de borda.
- Aprimorar a geração e a disponibilização dos relatórios de execução.

---

## Autor

**Anderson Batista dos Santos**

QA | Testes de Software | Qualidade de Software

- LinkedIn: [linkedin.com/in/anderson-santos-qa](https://www.linkedin.com/in/anderson-santos-qa/)
- GitHub: [github.com/AndyTex2003](https://github.com/AndyTex2003)
