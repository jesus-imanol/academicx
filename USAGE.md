# 🚀 Guía de Uso Rápido

## Ejecutar el Proyecto

```bash
# Instalar dependencias (si no lo has hecho)
pnpm install

# Ejecutar en modo desarrollo
pnpm dev
```

## 🎯 Acceder a las Páginas

- **Página de Inicio**: `http://localhost:5173/`
- **Crear Programa de Estudios**: `http://localhost:5173/study-programs/create`

## 📦 Componentes Creados

### ✨ Átomos (Atoms)
```jsx
import { Button, Input, Icon, Logo } from './components/atoms';

// Botón primario
<Button variant="primary" onClick={handleClick}>
  Crear Programa
</Button>

// Botón secundario
<Button variant="secondary" onClick={handleCancel}>
  Cancelar
</Button>

// Botón de ícono
<Button variant="icon">
  <Icon name="close" />
</Button>

// Input
<Input 
  type="text" 
  placeholder="Escribe algo..." 
  value={value}
  onChange={handleChange}
/>

// Ícono
<Icon name="school" filled={true} />

// Logo
<Logo size={10} />
```

### 🧪 Moléculas (Molecules)
```jsx
import { TextField, NavItem, PageHeader } from './components/molecules';

// Campo de texto con label
<TextField
  label="Nombre del Programa"
  placeholder="Ej: Ingeniería en Sistemas"
  value={value}
  onChange={handleChange}
  helperText="Texto de ayuda opcional"
/>

// Item de navegación
<NavItem
  icon="school"
  label="Programas de Estudio"
  active={true}
  filled={true}
/>

// Encabezado de página
<PageHeader
  title="Crear Nuevo Programa"
  subtitle="Completa los detalles a continuación"
  onClose={handleClose}
/>
```

### 🏗️ Organismos (Organisms)
```jsx
import { SideNavBar, CreateProgramForm, ProgramVisualizer } from './components/organisms';

// Barra lateral de navegación
<SideNavBar activeItem="study-programs" />

// Formulario de creación
<CreateProgramForm
  onSubmit={(data) => console.log(data)}
  onCancel={() => console.log('Cancelado')}
/>

// Visualizador
<ProgramVisualizer />
```

### 📄 Layout
```jsx
import MainLayout from './layouts/MainLayout';

<MainLayout activeNavItem="study-programs">
  {/* Tu contenido aquí */}
</MainLayout>
```

### 🎨 Features
```jsx
import { CreateStudyProgramPage } from './features/study-programs';

// Usar en React Router
<Route path="/study-programs/create" element={<CreateStudyProgramPage />} />
```

## 🎨 Colores Disponibles

Los colores están configurados en Tailwind:

```jsx
// Colores primarios
className="bg-primary"           // #330df2
className="text-primary"
className="border-primary"

// Backgrounds
className="bg-background-dark"   // #131022
className="bg-background-light"  // #f6f5f8

// Colores del diseño
className="bg-[#1A1A2E]"        // Sidebar y cards
className="text-[#a19cba]"      // Texto secundario
className="text-[#888]"         // Texto de ayuda
```

## 📱 Responsive

Los componentes ya incluyen clases responsive:

```jsx
// Ejemplo de grid responsive
<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
  <div className="lg:col-span-3">
    {/* Formulario */}
  </div>
  <div className="lg:col-span-2 hidden lg:flex">
    {/* Visualizador */}
  </div>
</div>
```

## 🔧 Personalización

### Agregar nuevas variantes de botones

Edita `src/components/atoms/Button.jsx`:

```jsx
const variants = {
  primary: '...',
  secondary: '...',
  danger: 'bg-red-600 text-white hover:bg-red-700', // Nueva variante
};
```

### Agregar nuevos items al sidebar

Edita `src/components/organisms/SideNavBar.jsx`:

```jsx
const navItems = [
  // ... items existentes
  { id: 'reports', icon: 'bar_chart', label: 'Reportes', href: '#' },
];
```

## 📝 Formularios

El formulario ya maneja el estado internamente. Para integrarlo con tu backend:

```jsx
const handleSubmit = async (data) => {
  try {
    const response = await fetch('/api/programs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      console.log('Programa creado exitosamente');
      // Redirigir o mostrar mensaje de éxito
    }
  } catch (error) {
    console.error('Error al crear programa:', error);
  }
};

<CreateProgramForm onSubmit={handleSubmit} />
```

## 🎯 Próximos Pasos

1. **Añadir validación de formularios**: Integrar con `react-hook-form` o `formik`
2. **Agregar estado global**: Implementar Context API o Zustand
3. **Conectar con backend**: Agregar llamadas a API
4. **Agregar autenticación**: Proteger rutas y manejar sesiones
5. **Testing**: Agregar tests con Vitest y React Testing Library

## 📚 Más Información

- Ver `ARCHITECTURE.md` para detalles de la arquitectura
- Documentación de Tailwind CSS: https://tailwindcss.com
- Atomic Design: https://bradfrost.com/blog/post/atomic-web-design/
