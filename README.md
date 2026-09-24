# Delivery Tracker — Exercício do Capítulo 4

> **Programação Web II — IFAL/Maceió.** Este projeto implementa a **Delivery Tracker API** utilizando arquitetura em camadas. A aplicação separa as responsabilidades entre Controllers, Services, Repositories e Database, mantendo as regras de negócio no Service e os dados em memória.

## Como usar este repositório

1. Instale as dependências:

```bash
npm install
```

2. Inicie a aplicação:

```bash
npm start
```

A API estará disponível em:

```text
http://localhost:3000
```

3. Para executar o autograder, deixe o servidor rodando e abra outro terminal.

### PowerShell (Windows)

```powershell
$env:BASE_URL="http://localhost:3000"
node autograder/check.mjs
```

### Linux/macOS

```bash
BASE_URL=http://localhost:3000 node autograder/check.mjs
```

O projeto possui também o workflow do GitHub Actions para executar as verificações automaticamente após um `git push`.

## Arquitetura do projeto

```text
src/
├── controllers/
├── services/
├── repositories/
├── database/
├── routes/
└── utils/
```

- **Controllers:** recebem as requisições HTTP e retornam as respostas.
- **Services:** concentram as regras de negócio.
- **Repositories:** cuidam do acesso aos dados.
- **Database:** mantém a persistência simulada em memória.
- **Routes:** definem as rotas e fazem a composição das dependências.
- **Utils:** contém recursos auxiliares.

A regra de negócio fica no **Service**, enquanto o **Repository** trabalha somente com os dados.

## Endpoints

### Health Check

```http
GET /api/health
```

Resposta:

```json
{
  "status": "ok"
}
```

### Criar uma entrega

```http
POST /api/entregas
```

Exemplo:

```bash
curl -X POST http://localhost:3000/api/entregas \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Documentos","origem":"Maceió","destino":"Recife"}'
```

### Listar entregas

```http
GET /api/entregas
```

### Filtrar por status

```http
GET /api/entregas?status=EM_TRANSITO
```

### Buscar uma entrega

```http
GET /api/entregas/:id
```

Exemplo:

```bash
curl http://localhost:3000/api/entregas/1
```

### Avançar o status

```http
PATCH /api/entregas/:id/avancar
```

O fluxo de uma entrega é:

```text
CRIADA → EM_TRANSITO → ENTREGUE
```

### Cancelar uma entrega

```http
PATCH /api/entregas/:id/cancelar
```

### Consultar histórico

```http
GET /api/entregas/:id/historico
```

## Regras de negócio

- `descricao`, `origem` e `destino` são obrigatórios.
- A origem deve ser diferente do destino.
- Toda entrega começa com o status `CRIADA`.
- Uma entrega ativa não pode ser duplicada com a mesma descrição, origem e destino.
- O avanço de status segue `CRIADA → EM_TRANSITO → ENTREGUE`.
- Uma entrega pode ser cancelada enquanto não estiver `ENTREGUE` ou `CANCELADA`.
- As alterações realizadas na entrega são registradas no histórico.

## Códigos de resposta

| Código | Descrição |
|:---:|---|
| `200` | Operação realizada com sucesso |
| `201` | Entrega criada |
| `400` | Dados de entrada inválidos |
| `404` | Recurso não encontrado |
| `409` | Entrega ativa duplicada |
| `422` | Regra de negócio ou transição inválida |

## Testes

O projeto possui um autograder para verificar o funcionamento das rotas da Delivery Tracker API.

No PowerShell:

```powershell
$env:BASE_URL="http://localhost:3000"
node autograder/check.mjs
```

Os dados da aplicação são armazenados em memória e são perdidos quando o servidor é encerrado.
