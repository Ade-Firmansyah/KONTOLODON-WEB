# Fase 2 - Database dan ERD

## Entity

- `users`
- `products`
- `transactions`
- `saldo_logs`
- `deposits`
- `withdraws`
- `webhook_logs`
- `settings`

## ERD

```mermaid
erDiagram
  USERS ||--o{ TRANSACTIONS : has
  USERS ||--o{ SALDO_LOGS : has
  USERS ||--o{ DEPOSITS : has
  USERS ||--o{ WITHDRAWS : has
  PRODUCTS ||--o{ TRANSACTIONS : used_in

  USERS {
    int id PK
    varchar username
    varchar email
    varchar phone
    varchar password_hash
    varchar api_key
    int saldo
    int markup_custom
    varchar role
    varchar status
    varchar full_name
    int orders
    int deposits
    text notes
    timestamp created_at
  }

  PRODUCTS {
    int id PK
    int premku_id
    varchar name
    varchar code
    int price_base
    int price_sell
    int stock
    varchar status
  }

  TRANSACTIONS {
    int id PK
    varchar invoice
    varchar ref_id
    int user_id FK
    int product_id FK
    varchar product_name
    int qty
    int price_base
    int price_sell
    int total_price
    int profit
    varchar status
    text account_data
  }
```

## File Implementasi

- `database/schema.mysql.sql`
- `backend/src/repositories/user.repo.js`
- `backend/src/repositories/settings.repo.js`

## Index Penting

- `users.api_key`
- `users.username`
- `transactions.invoice`
- `transactions.user_id`
- `transactions.status`
- `deposits.invoice`
- `saldo_logs.user_id`
