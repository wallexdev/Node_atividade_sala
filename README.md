# Delivery Tracker

Projeto da disciplina de Programação Web II, usando Node.js, Express e arquitetura em camadas.

## Como rodar

Instale as dependências:

```bash
npm install
```

Depois inicie o servidor:

```bash
npm start
```

Por padrão ele fica em `http://localhost:3000`.

Também dá para trocar a porta:

```bash
PORT=4000 npm start
```

## Organização

```text
src/
├── controllers/
├── database/
├── repositories/
├── routes/
├── services/
└── utils/
```

A aplicação mantém os dados em memória. O Service concentra as regras da entrega e o Repository faz a comunicação com essa persistência.

## Rotas principais

### Verificar a API

```bash
curl http://localhost:3000/api/health
```

### Criar uma entrega

```bash
curl -X POST http://localhost:3000/api/entregas \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Caixa de documentos","origem":"Maceió","destino":"Recife"}'
```

### Listar entregas

```bash
curl http://localhost:3000/api/entregas
```

### Filtrar pelo status

```bash
curl "http://localhost:3000/api/entregas?status=EM_TRANSITO"
```

### Consultar uma entrega

```bash
curl http://localhost:3000/api/entregas/1
```

### Avançar a entrega

```bash
curl -X PATCH http://localhost:3000/api/entregas/1/avancar
```

### Cancelar

```bash
curl -X PATCH http://localhost:3000/api/entregas/1/cancelar
```

### Ver histórico

```bash
curl http://localhost:3000/api/entregas/1/historico
```

## Status da entrega

O fluxo normal é:

`CRIADA -> EM_TRANSITO -> ENTREGUE`

Uma entrega também pode ser cancelada enquanto ainda não foi entregue.

## Verificação

Com o servidor rodando:

```bash
npm run check
```
