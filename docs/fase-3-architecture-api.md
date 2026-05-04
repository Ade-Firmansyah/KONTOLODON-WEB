# Fase 3 - Arsitektur dan API Design

## Backend Flow

```text
Route -> Controller -> Service -> Repository -> External API
```

## Folder Backend

```text
backend/src/
  config/
  modules/
  routes/
  services/
  repositories/
  middlewares/
  utils/
  workers/
```

## API Contract

Auth:

- `POST /api/login`

Products:

- `GET /api/products`

Order:

- `POST /api/order`
- `GET /api/order/:invoice`

Deposit:

- `POST /api/deposit`

Withdraw:

- `POST /api/withdraw`

Saldo:

- `GET /api/saldo`

Admin:

- `GET /api/admin/users`
- `POST /api/admin/create-user`
- `PATCH /api/admin/update-user/:id`
- `DELETE /api/admin/delete-user/:id`
- `POST /api/admin/update-saldo`
- `GET /api/admin/transactions`
- `GET /api/admin/markup`
- `PATCH /api/admin/markup`

Webhook:

- `POST /api/callback/premku`

Docs:

- `GET /api/docs`

## Frontend Bridge

- `src/services/api.ts`: wrapper request ke backend.
- `src/hooks/useApi.ts`: helper state loading/error.
- `src/store/useAuth.ts`: helper session ringan.
- `src/pages/order.tsx`: order product from API.
- `src/pages/admin/pages/UserManagementPage.tsx`: CRUD user by admin.
- `src/pages/admin/pages/SettingMarkupPage.tsx`: sync markup tier to backend.
