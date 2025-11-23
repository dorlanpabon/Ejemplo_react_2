# Proyecto: Shopping (React + Vite)

Breve: ejemplo de tienda con React + Vite, Tailwind y consumo a un backend REST (autenticación JWT, carrito, pedidos, CRUD admin).

**Requisitos**
- Node.js 18+ (o compatible con la versión usada en el proyecto)
- npm (incluido con Node.js)
- Un backend disponible (por defecto `http://localhost:3000`) que exponga los endpoints usados en `src/lib/api.js`

**Estructura mínima**
- `src/` – código fuente React
- `src/pages` – páginas (Home, Products, Cart, Orders, Admin)
- `src/contexts` – `AuthContext`, `CartContext`
- `src/lib/api.js` – cliente HTTP centralizado (base URL configurable)

**Variables de entorno**
La app lee la variable `VITE_API_BASE` para construir la URL del API. Puedes crear un archivo `.env` en la raíz del proyecto con por ejemplo:

```
VITE_API_BASE=http://localhost:3000
```

Cómo ejecutar (PowerShell)

1) Instalar dependencias (solo la primera vez o cuando cambies `package.json`):

```powershell
npm install
```

2) Ejecutar entorno de desarrollo (Vite):

```powershell
npm run dev
```

El servidor de desarrollo te mostrará la URL (por defecto `http://localhost:5173`).

3) Construir para producción:

```powershell
npm run build
# y para previsualizar el build estático
npm run preview
```

Autenticación y roles
- El frontend espera que el backend devuelva un JWT en el endpoint `/login` y que ese token incluya un `role` en su payload (por ejemplo `role: 'admin'` o `role: 'client'`).
- El token se guarda en `localStorage` con la clave `auth_token`.

API esperada (resumen)
- `POST /login` → devuelve JWT 200 / 401
- `POST /register` → crea usuario
- `GET /products`, `GET /products/:id` → productos
- `GET /cart`, `POST /cart/items`, `DELETE /cart/items/:id` → carrito
- `POST /orders`, `GET /orders`, `PUT /orders/:id` → pedidos (el endpoint `GET /orders` puede devolver todos los pedidos si el token pertenece a un admin)
- Admin: `POST /products`, `PUT /products/:id`, `DELETE /products/:id` (CRUD)

Notas importantes
- Rutas administrativas en frontend: `/admin/products` y `/admin/orders`. El enlace aparece en el `Header` cuando el usuario autenticado tiene `role === 'admin'`.
- Recomiendo añadir protección de rutas (`RequireAuth` / `RequireAdmin`) en el frontend para evitar que usuarios no autorizados visiten páginas administrativas.
- Si tu backend usa nombres de campos diferentes (por ejemplo `estado` vs `status`, `creado_at` vs `created_at`), adapta `src/pages/AdminOrders.jsx` o `src/lib/api.js` a esas claves.

Desarrollo y estilo
- Tailwind CSS ya está configurado; los estilos principales están en `src/index.css` con las directivas `@tailwind base; @tailwind components; @tailwind utilities;`.
- Para compilar los estilos en desarrollo usa `npm run dev` (Vite hace el trabajo automáticamente).

Testing manual rápido
1. Arranca el backend (si corresponde).
2. `npm run dev` en este repo.
3. Registra un usuario o crea uno en el backend y haz login.
4. Si tienes un usuario admin, inicia sesión con él y visita `http://localhost:5173/admin/orders` para cambiar estados de pedido.

Debug y logs
- Revisa la consola del navegador y el terminal donde corre Vite para mensajes de error.
- Si alguna petición falla con 401/403 verifica el token JWT y los encabezados `Authorization: Bearer <token>`.

Contribuciones
- Si vas a modificar el cliente API, centraliza cambios en `src/lib/api.js`.
- Para agregar protección de rutas, crea componentes `RequireAuth.jsx` y `RequireAdmin.jsx` y envuelve las rutas sensibles.

Contacto
- Si necesitas que implemente la protección de rutas o pruebas automatizadas, dímelo y lo hago.
