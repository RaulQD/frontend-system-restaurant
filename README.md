# Sistema de Gestión de Pedidos - Frontend

Este es el cliente web del sistema de gestión de pedidos para restaurantes. Permite a los meseros, cocineros y administradores gestionar órdenes en tiempo real de forma eficiente.

## 🚀 Tecnologías usadas

- [React](https://react.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [Shadcn UI](https://ui.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Socket.IO Client](https://socket.io/)

# 🛠️ Funcionalidades principales
- Creación y gestión de ordenes.
- Roles de usuarios(mesero, cocinero, administrador).
- Notificaciones automaticas de cambios en pedidos.
- UI moderna con Shadcn UI y Tailwind.
- Comunicación con el backend mediante WebSocket y API REST.
- Manejo de estados con Tanstack query.

## 📦 Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio_frontend.git

   ```
## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
