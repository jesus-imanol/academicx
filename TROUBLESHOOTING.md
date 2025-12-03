# 🔧 Solución de Problemas - Backend Connection

## ❌ Error: Network Error (ERR_NETWORK)

Este error significa que **el frontend no puede conectarse con el backend**.

### 📋 Checklist de Verificación

#### 1️⃣ ¿Está el backend corriendo?

Abre una terminal y verifica:

```bash
# Verifica si algo está corriendo en el puerto 3000
netstat -ano | findstr :3000

# O intenta hacer una petición directa
curl http://localhost:3000/api/alumno
```

Si no ves ningún proceso, **tu backend NO está corriendo**.

#### 2️⃣ Inicia tu backend

```bash
# Navega a tu carpeta de backend
cd ruta/a/tu/backend

# Instala dependencias (si no lo has hecho)
npm install
# o
pnpm install

# Inicia el servidor
npm run dev
# o
node server.js
# o el comando que uses
```

#### 3️⃣ Verifica el puerto correcto

Tu frontend está configurado para conectar a:
```
http://localhost:3000/api
```

Si tu backend corre en **otro puerto** (por ejemplo 8080, 4000, etc.), actualiza el archivo `.env`:

```env
# Cambia el puerto al que usa tu backend
VITE_API_BASE_URL=http://localhost:PUERTO_CORRECTO/api
```

Luego **reinicia el servidor de desarrollo** de Vite:
```bash
# Detén el servidor (Ctrl+C) y vuelve a iniciar
pnpm dev
```

#### 4️⃣ Verifica CORS en el backend

Tu backend debe permitir peticiones desde `http://localhost:5173` (puerto de Vite).

**Para Express.js:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

**Para Fastify:**
```javascript
await fastify.register(require('@fastify/cors'), {
  origin: 'http://localhost:5173',
  credentials: true
});
```

**Para NestJS:**
```typescript
// main.ts
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

#### 5️⃣ Prueba la conexión manualmente

Abre el navegador y ve a:
```
http://localhost:3000/api/alumno
```

Deberías ver:
- ✅ JSON con datos (lista vacía `[]` o lista de alumnos)
- ✅ O un status `204 No Content`

Si ves:
- ❌ "No se puede acceder al sitio"
- ❌ "ERR_CONNECTION_REFUSED"

Entonces tu backend **NO está corriendo** en ese puerto.

## 🔍 Comandos de Diagnóstico

### Windows (PowerShell)
```powershell
# Ver qué está usando el puerto 3000
Get-NetTCPConnection -LocalPort 3000

# Matar proceso en puerto 3000 (si necesitas liberarlo)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Windows (CMD)
```cmd
# Ver qué está usando el puerto 3000
netstat -ano | findstr :3000

# Matar proceso por PID (reemplaza PID con el número que veas)
taskkill /PID [PID] /F
```

## ✅ Solución Rápida

1. **Abre 2 terminales:**

**Terminal 1 - Backend:**
```bash
cd ruta/a/tu/backend
npm run dev
```

Deberías ver algo como:
```
✓ Server running on http://localhost:3000
✓ API ready at http://localhost:3000/api
```

**Terminal 2 - Frontend:**
```bash
cd ruta/a/tu/frontend
pnpm dev
```

2. **Verifica en el navegador:**
   - Backend: `http://localhost:3000/api/alumno`
   - Frontend: `http://localhost:5173`

3. **Intenta registrar un alumno nuevamente**

## 🎯 Configuración Recomendada

### Backend (ejemplo con Express)

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/alumno', alumnoRoutes);

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API ready at http://localhost:${PORT}/api`);
});
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📱 Aún no funciona?

Revisa estos logs en la consola del backend:
- ¿Hay errores al iniciar?
- ¿Muestra el puerto correcto?
- ¿Hay errores de base de datos?

Revisa estos logs en la consola del frontend (DevTools):
- ¿Cuál es la URL exacta que intenta llamar?
- ¿Hay algún error de CORS?

## 💡 Tip Pro

Agrega este script en tu `package.json` del backend:

```json
{
  "scripts": {
    "dev": "node server.js",
    "dev:debug": "DEBUG=* node server.js"
  }
}
```

Y en el frontend, puedes ver todas las peticiones HTTP con más detalle en la pestaña **Network** de las DevTools del navegador.
