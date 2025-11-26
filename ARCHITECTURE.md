# Arquitectura de Componentes - Atomic Design

Este proyecto utiliza **Atomic Design** para organizar los componentes de React de manera escalable y mantenible.

## 📁 Estructura de Carpetas

```
src/
├── components/
│   ├── atoms/              # Componentes básicos más pequeños
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Icon.jsx
│   │   └── Logo.jsx
│   ├── molecules/          # Combinaciones de átomos
│   │   ├── TextField.jsx
│   │   ├── NavItem.jsx
│   │   └── PageHeader.jsx
│   └── organisms/          # Componentes complejos
│       ├── SideNavBar.jsx
│       ├── CreateProgramForm.jsx
│       └── ProgramVisualizer.jsx
├── layouts/                # Layouts de página
│   └── MainLayout.jsx
├── features/               # Features organizadas por dominio
│   └── study-programs/
│       ├── CreateStudyProgramPage.jsx
│       └── index.js
├── pages/                  # Páginas simples (legacy)
│   └── HomeView.jsx
└── assets/                 # Recursos estáticos
```

## 🧩 Niveles de Atomic Design

### Atoms (Átomos)
Componentes básicos e indivisibles que no pueden descomponerse más:
- **Button**: Botón reutilizable con variantes (primary, secondary, icon)
- **Input**: Campo de entrada de texto base
- **Icon**: Icono de Material Symbols
- **Logo**: Logo de la aplicación

### Molecules (Moléculas)
Combinaciones simples de átomos que forman componentes funcionales:
- **TextField**: Input con label y texto de ayuda
- **NavItem**: Elemento de navegación con icono y label
- **PageHeader**: Encabezado de página con título, subtítulo y botón de cierre

### Organisms (Organismos)
Componentes complejos compuestos de moléculas y/o átomos:
- **SideNavBar**: Barra lateral de navegación completa
- **CreateProgramForm**: Formulario de creación de programas
- **ProgramVisualizer**: Panel visualizador de programas

### Layouts
Estructuras de página que definen la disposición general:
- **MainLayout**: Layout principal con sidebar y área de contenido

### Features
Funcionalidades completas organizadas por dominio de negocio:
- **study-programs**: Feature de gestión de programas de estudio
  - CreateStudyProgramPage: Página de creación de programas

## 🎨 Sistema de Diseño

### Colores
```css
--primary: #330df2
--background-light: #f6f5f8
--background-dark: #131022
```

### Tipografía
- Fuente principal: **Space Grotesk**

### Iconos
- **Material Symbols Outlined** de Google Fonts

## 🚀 Uso

### Acceder a la página de creación de Study Programs

```jsx
// Navega a: /study-programs/create
import { CreateStudyProgramPage } from './features/study-programs';

// En App.jsx ya está configurada la ruta
<Route path="/study-programs/create" element={<CreateStudyProgramPage />} />
```

### Reutilizar componentes

```jsx
// Usar el Button
import Button from './components/atoms/Button';

<Button variant="primary" onClick={handleClick}>
  Click me
</Button>

// Usar el TextField
import TextField from './components/molecules/TextField';

<TextField
  label="Email"
  type="email"
  placeholder="tu@email.com"
  helperText="Ingresa un email válido"
/>
```

## 🔄 Escalabilidad

Esta arquitectura facilita:
- ✅ **Reutilización**: Componentes pequeños y enfocados
- ✅ **Mantenibilidad**: Jerarquía clara y predecible
- ✅ **Testing**: Componentes aislados fáciles de probar
- ✅ **Colaboración**: Estructura familiar para equipos
- ✅ **Crecimiento**: Añadir nuevas features sin afectar existentes

## 📝 Convenciones

1. Cada componente debe tener PropTypes definidos
2. Los componentes deben ser lo más puros posible
3. La lógica de negocio debe estar en las features, no en los componentes
4. Los estilos deben usar Tailwind CSS
5. Mantener la jerarquía: Atoms → Molecules → Organisms → Features

## 🛠️ Próximos Pasos

Para agregar nuevas funcionalidades:

1. **Nueva feature**: Crear carpeta en `features/`
2. **Nuevos componentes**: Identificar nivel en Atomic Design
3. **Reutilizar**: Verificar componentes existentes antes de crear nuevos
4. **Documentar**: Actualizar este README con cambios importantes
