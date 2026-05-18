# SRM Credit Engine Frontend

Interface web operacional para o **SRM Credit Engine**, uma plataforma de cessão de crédito multimoedas.

Este frontend consome a API REST do backend [`srm-credit-engine`](https://github.com/RaphaelCFrajuca/srm-credit-engine) e permite operar o fluxo principal do sistema: cadastro de moedas, taxas de câmbio, cedentes, simulação de precificação, liquidação de lotes e consulta de extrato.

---

## Visão geral

O SRM Credit Engine simula uma operação de antecipação de recebíveis.

Uma empresa cedente possui títulos a receber no futuro, como duplicatas mercantis ou cheques pré-datados. A aplicação calcula quanto esses recebíveis valem hoje considerando prazo, taxa base, spread de risco e, quando necessário, conversão cambial.

O frontend fornece uma interface para:

- cadastrar e consultar moedas;
- cadastrar e consultar taxas de câmbio;
- cadastrar e consultar cedentes;
- simular o valor presente de recebíveis;
- liquidar lotes com múltiplos recebíveis;
- consultar o extrato analítico das liquidações;
- visualizar erros com `Trace ID` retornado pela API.

---

## Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- date-fns
- Intl.NumberFormat
- ESLint

---

## Relação com o backend

Backend esperado:

```text
http://localhost:8080
```

Swagger da API:

```text
http://localhost:8080/docs
```

Repositório backend:

```text
https://github.com/RaphaelCFrajuca/srm-credit-engine
```

Versão de referência da API:

```text
1.0.0
```

---

## Estrutura do projeto

O projeto está dentro da pasta:

```text
frontend/
```

Estrutura principal:

```text
frontend/
  src/
    app/
      App.tsx
      providers.tsx
      router.tsx
      toast-context.ts

    components/
      layout/
        AppLayout.tsx
        Header.tsx
        Sidebar.tsx
      ui/

    config/
      env.ts

    features/
      assignors/
      currencies/
      exchange-rates/
      pricing/
      reports/
      settlements/

    lib/
      api.ts
      errors.ts
      formatters.ts

    styles/
      globals.css

    types/
      api.ts
```

---

## Configuração de ambiente

Crie um arquivo `.env` dentro de `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

A aplicação usa essa variável para definir a URL base da API.

Se a variável não for informada, o fallback configurado no código é:

```text
http://localhost:8080
```

---

## Instalação

A partir da raiz do repositório:

```bash
cd frontend
npm install
```

---

## Rodando em desenvolvimento

```bash
npm run dev
```

A aplicação será iniciada em:

```text
http://localhost:5173
```

---

## Build

```bash
npm run build
```

O build executa:

```bash
tsc -b && vite build
```

---

## Preview do build

```bash
npm run preview
```

---

## Lint

```bash
npm run lint
```

---

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Rotas

| Rota | Descrição |
|---|---|
| `/dashboard` | Visão geral da operação |
| `/currencies` | Cadastro e listagem de moedas |
| `/exchange-rates` | Cadastro, histórico e última taxa de câmbio |
| `/assignors` | Cadastro e listagem de cedentes |
| `/pricing/simulate` | Simulação de valor presente |
| `/settlements/new` | Liquidação de lote de recebíveis |
| `/settlements/extract` | Extrato analítico de liquidação |

Qualquer rota desconhecida redireciona para:

```text
/dashboard
```

---

## Funcionalidades

### Dashboard

Exibe uma visão rápida do sistema com:

- total de moedas cadastradas;
- total de cedentes cadastrados;
- total de registros no extrato;
- atalhos para simulação, liquidação e extrato.

---

### Moedas

Permite criar e listar moedas.

Endpoints utilizados:

```http
GET /currencies
POST /currencies
GET /currencies/{id}
GET /currencies/code/{code}
```

Exemplo de payload:

```json
{
  "code": "BRL",
  "name": "Real Brasileiro",
  "decimalPlaces": 2
}
```

Códigos suportados pela API:

```text
USD, EUR, GBP, JPY, BRL
```

---

### Taxas de câmbio

Permite criar taxas de câmbio, consultar histórico e buscar a última taxa válida.

Endpoints utilizados:

```http
POST /exchange-rates
GET /exchange-rates
GET /exchange-rates/latest
```

Exemplo de payload:

```json
{
  "fromCurrencyId": "uuid-da-moeda-origem",
  "toCurrencyId": "uuid-da-moeda-destino",
  "rate": "5.1234567890",
  "effectiveAt": "2026-05-17T10:00:00.000Z",
  "source": "manual"
}
```

Regras esperadas:

- moeda de origem e destino não devem ser iguais;
- a taxa deve ser uma string numérica positiva;
- valores financeiros devem manter precisão decimal.

---

### Cedentes

Permite criar e listar cedentes.

Cedente é a empresa ou pessoa que vende os recebíveis para antecipação.

Endpoints utilizados:

```http
POST /assignors
GET /assignors
GET /assignors/{id}
```

Exemplo:

```json
{
  "document": "12345678000199",
  "name": "Empresa Cedente XPTO LTDA"
}
```

---

### Simulação de precificação

Permite calcular o valor presente de um recebível sem persistir uma liquidação.

Endpoint utilizado:

```http
POST /pricing/simulate
```

Exemplo:

```json
{
  "receivableType": "MERCANTILE_DUPLICATE",
  "faceValue": "10000.00",
  "baseRate": "0.012",
  "issueDate": "2026-05-18",
  "dueDate": "2026-08-18",
  "faceCurrencyId": "uuid-da-moeda-original",
  "paymentCurrencyId": "uuid-da-moeda-pagamento"
}
```

Tipos suportados:

| Tipo | Descrição |
|---|---|
| `MERCANTILE_DUPLICATE` | Duplicata mercantil |
| `POSTDATED_CHECK` | Cheque pré-datado |

A tela de resultado deve exibir informações como:

- valor de face;
- valor presente;
- valor convertido;
- taxa base;
- spread;
- taxa total;
- prazo em dias;
- prazo em meses;
- taxa de câmbio utilizada;
- `exchangeRateId`, quando houver conversão.

---

### Nova liquidação

Permite liquidar um lote com um ou mais recebíveis.

Endpoint utilizado:

```http
POST /settlements
```

Exemplo:

```json
{
  "assignorId": "uuid-do-cedente",
  "paymentCurrencyId": "uuid-da-moeda-pagamento",
  "baseRate": "0.012",
  "idempotencyKey": "external-operation-123",
  "receivables": [
    {
      "type": "MERCANTILE_DUPLICATE",
      "faceValue": "10000.00",
      "faceCurrencyId": "uuid-da-moeda-original",
      "issueDate": "2026-05-18",
      "dueDate": "2026-08-18"
    }
  ]
}
```

A API garante:

- transação ACID;
- rollback em falha de qualquer item;
- proteção contra duplicidade com `idempotencyKey`;
- resposta `409` quando a mesma chave idempotente já foi processada.

---

### Extrato de liquidação

Permite consultar recebíveis liquidados com filtros e paginação server-side.

Endpoint utilizado:

```http
GET /settlements/extract
```

Filtros suportados:

| Filtro | Descrição |
|---|---|
| `from` | Data inicial |
| `to` | Data final |
| `assignorId` | Cedente |
| `currencyId` | Moeda geral |
| `faceCurrencyId` | Moeda original do título |
| `paymentCurrencyId` | Moeda de pagamento |
| `receivableType` | Tipo do recebível |
| `status` | Status do lote |
| `page` | Página atual |
| `pageSize` | Itens por página |

Exemplo:

```http
GET /settlements/extract?from=2026-01-01T00:00:00.000Z&to=2026-12-31T23:59:59.999Z&page=1&pageSize=20
```

Status possíveis:

```text
PENDING, SETTLED, FAILED, CANCELLED
```

---

## Trace ID

A API retorna um header de rastreabilidade:

```text
x-trace-id
```

O frontend não gera esse valor manualmente. O Axios captura o header retornado em caso de erro para exibir detalhes técnicos ao usuário.

Exemplo de mensagem:

```text
Erro ao liquidar lote. Trace ID: 7b7a0d1b-83d7-4ef8-a5d7-0e1c89f0a7a2
```

Isso ajuda a correlacionar o erro visto na interface com os logs do backend.

---

## Tratamento de erros

O frontend centraliza a integração HTTP com Axios em:

```text
src/lib/api.ts
```

Em caso de erro, a aplicação deve exibir:

- mensagem amigável;
- status HTTP, quando disponível;
- `Trace ID`, quando retornado pela API.

Casos importantes:

### 400 - Payload inválido

```text
Verifique os campos informados e tente novamente.
```

### 409 - Liquidação duplicada

```text
Esta liquidação já foi processada para a mesma chave idempotente.
```

### Erro de conexão

```text
Não foi possível conectar à API. Verifique se o backend está em execução.
```

---

## Gerenciamento de estado remoto

O projeto usa TanStack Query para chamadas HTTP.

Configuração global:

- `staleTime` de 30 segundos para queries;
- `retry: false` para mutations.

Isso evita reenvio automático de operações financeiras sensíveis, como liquidações.

---

## Validações

As telas usam React Hook Form e Zod para validação.

Validações esperadas:

- valores monetários positivos;
- taxa base igual ou maior que zero;
- vencimento maior que emissão;
- documento do cedente com apenas números;
- lote com pelo menos um recebível;
- moeda origem diferente da moeda destino em câmbio;
- `idempotencyKey` obrigatória em liquidação.

---

## Formatação

O frontend deve formatar valores financeiros e datas de forma legível.

Exemplos:

- valores monetários com `Intl.NumberFormat`;
- percentuais convertendo `0.012` para `1,20%`;
- datas com `date-fns`.

---

## Fluxo principal para teste manual

1. Subir o backend `srm-credit-engine`.
2. Acessar o Swagger em `http://localhost:8080/docs`, se necessário.
3. Subir o frontend.
4. Criar moedas, por exemplo BRL e USD.
5. Criar uma taxa de câmbio entre as moedas.
6. Criar um cedente.
7. Simular precificação de um recebível.
8. Criar uma liquidação com um ou mais recebíveis.
9. Consultar o extrato em `/settlements/extract`.

---

## Exemplo de execução completa

### 1. Backend

No repositório backend:

```bash
npm install
npm run start:dev
```

Backend esperado em:

```text
http://localhost:8080
```

### 2. Frontend

No repositório frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend esperado em:

```text
http://localhost:5173
```

---

## Critérios de aceite

- A aplicação abre em `http://localhost:5173`.
- O backend pode ser configurado via `VITE_API_BASE_URL`.
- Todas as rotas principais renderizam.
- Os formulários possuem validação.
- As telas consomem endpoints reais.
- Não há mocks substituindo a API.
- Mutations exibem sucesso ou erro.
- Erros mostram `Trace ID` quando disponível.
- O extrato usa paginação server-side.
- `npm run build` executa sem erros.

---

## Próximos passos sugeridos

- Adicionar autenticação quando a API suportar.
- Criar testes de componentes.
- Criar testes e2e com Playwright ou Cypress.
- Adicionar exportação CSV no extrato.
- Adicionar gráficos no dashboard.
- Criar pipeline CI para lint e build.
- Criar deploy com Docker ou ambiente estático.
