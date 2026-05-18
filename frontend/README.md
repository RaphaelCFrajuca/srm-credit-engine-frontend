# SRM Credit Engine Frontend

SPA operacional financeira para cessão de crédito multimoedas, consumindo API REST real do backend.

## Stack

- React + TypeScript + Vite
- React Router
- TanStack Query
- React Hook Form + Zod
- Axios
- Tailwind CSS
- date-fns
- Intl.NumberFormat

## Instalação

```bash
cd frontend
npm install
```

## Configuração

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Variável obrigatória:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Execução

```bash
npm run dev
```

App: `http://localhost:5173`

## Build

```bash
npm run build
```

## Rotas

- `/dashboard`
- `/currencies`
- `/exchange-rates`
- `/assignors`
- `/pricing/simulate`
- `/settlements/new`
- `/settlements/extract`

## Trace ID (`x-trace-id`)

- O frontend **não gera** `x-trace-id`.
- Em erros de API, o cliente Axios captura o `x-trace-id` de resposta.
- Mensagens de erro exibem detalhes técnicos com `status` e `Trace ID` quando disponível.

Exemplo:

`Erro ao liquidar lote (409): Esta liquidação já foi processada para a mesma chave idempotente. | Trace ID: abc-123`

## Fluxo principal sugerido

1. Criar moedas BRL e USD
2. Criar taxa BRL -> USD (ou USD -> BRL)
3. Criar cedente
4. Simular pricing
5. Criar liquidação
6. Consultar extrato

## Observações de integração

- Todas as telas usam endpoints reais, sem mocks.
- Mutations financeiras usam `retry: false`.
- Moedas e cedentes usam `staleTime` maior para reduzir chamadas repetidas.
- Em `POST /settlements`, status `409` recebe mensagem amigável de chave idempotente já processada.
