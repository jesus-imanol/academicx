# 📝 Feature: Create Subject

## Descripción
Feature completa para la creación de materias/asignaturas con diseño centrado, efectos visuales y sistema de notificaciones.

## 🎯 Ubicación
`src/features/subjects/CreateSubjectPage.jsx`

## 🧩 Componentes Creados

### Nuevos Componentes

#### 1. **Toast** (Molecule)
`src/components/molecules/Toast.jsx`

Componente de notificación reutilizable con 4 tipos:
- ✅ `success` - Verde (#2ECC71)
- ❌ `error` - Rojo (#E74C3C)
- ⚠️ `warning` - Amarillo (#F39C12)
- ℹ️ `info` - Azul (#3498DB)

**Uso:**
```jsx
import { Toast } from './components/molecules';

<Toast
  type="success"
  message="Subject created successfully!"
  visible={true}
  onClose={() => console.log('Closed')}
/>
```

**Props:**
- `type`: 'success' | 'error' | 'warning' | 'info'
- `message`: string
- `visible`: boolean
- `onClose`: function (opcional)

**Características:**
- Auto-cierre después de 3 segundos
- Animación de entrada (slide-in desde la derecha)
- Posicionamiento fijo en bottom-right
- Icono dinámico según el tipo

#### 2. **SubjectForm** (Organism)
`src/components/organisms/SubjectForm.jsx`

Formulario completo para crear materias con:
- Input para nombre de la materia
- Input para semestre
- Botón de envío con gradiente animado
- Botón de cancelar
- Diseño responsive

**Uso:**
```jsx
import { SubjectForm } from './components/organisms';

<SubjectForm
  onSubmit={(data) => console.log(data)}
  onCancel={() => console.log('Cancelled')}
/>
```

**Props:**
- `onSubmit`: function - Recibe `{ subjectName, semester }`
- `onCancel`: function

#### 3. **CenteredLayout** (Layout)
`src/layouts/CenteredLayout.jsx`

Layout centrado con efectos decorativos de fondo:
- Gradientes difuminados (blur)
- Formas geométricas SVG
- Diseño responsive

**Uso:**
```jsx
import CenteredLayout from './layouts/CenteredLayout';

<CenteredLayout>
  {/* Tu contenido centrado aquí */}
</CenteredLayout>
```

## 🎨 Estilos Nuevos

### CSS Agregado en `index.css`

```css
/* Gradiente radial para botones */
.noisy-gradient-radial {
  background-image: radial-gradient(...);
  background-blend-mode: color-dodge;
  transition: background-position 0.4s ease-in-out;
}

/* Animación para Toast */
@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
```

## 🚀 Ruta

**URL:** `/subjects/create`

Ya configurada en `App.jsx`:
```jsx
<Route path="/subjects/create" element={<CreateSubjectPage />} />
```

## 📊 Flujo de la Feature

```
Usuario accede a /subjects/create
    ↓
CenteredLayout renderiza el fondo decorativo
    ↓
SubjectForm muestra los campos
    ↓
Usuario completa y envía el formulario
    ↓
CreateSubjectPage valida los datos
    ↓
Si válido: Toast de éxito (verde)
Si inválido: Toast de error (rojo)
    ↓
Toast se auto-cierra después de 3 segundos
```

## 💡 Validación

El formulario valida:
- ✅ Que el nombre de la materia no esté vacío
- ✅ Que el semestre no esté vacío

**Ejemplo de validación:**
```jsx
const handleSubmit = (data) => {
  if (!data.subjectName || !data.semester) {
    showToast('error', 'Please fill out all required fields.');
    return;
  }
  showToast('success', 'Subject created successfully!');
};
```

## 🔌 Integración con Backend

Para conectar con tu API, modifica el `handleSubmit` en `CreateSubjectPage.jsx`:

```jsx
const handleSubmit = async (data) => {
  if (!data.subjectName || !data.semester) {
    showToast('error', 'Please fill out all required fields.');
    return;
  }

  try {
    const response = await fetch('/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showToast('success', 'Subject created successfully!');
      // Opcional: Redirigir o limpiar el formulario
    } else {
      showToast('error', 'Failed to create subject.');
    }
  } catch (error) {
    showToast('error', 'Network error. Please try again.');
  }
};
```

## 🎯 Diferencias con Study Programs Feature

| Característica | Study Programs | Subjects |
|---------------|----------------|----------|
| Layout | MainLayout (sidebar) | CenteredLayout (centrado) |
| Campos | Program Name, Semesters | Subject Name, Semester |
| Notificaciones | No incluidas | Toast notifications |
| Fondo | Limpio | Decorativo con gradientes |
| Visualizador | Panel lateral | No incluido |

## 🧪 Testing Manual

1. Navega a `http://localhost:5173/subjects/create`
2. Deja los campos vacíos y envía → Debe mostrar toast de error
3. Completa ambos campos y envía → Debe mostrar toast de éxito
4. Verifica que el toast desaparece después de 3 segundos
5. Haz clic en el botón de cerrar del toast → Debe cerrarse inmediatamente
6. Verifica responsive en móvil

## 📦 Componentes Reutilizables

Estos componentes pueden usarse en otras features:

### Toast
```jsx
// Notificación de éxito
<Toast type="success" message="Action completed!" visible={true} />

// Notificación de error
<Toast type="error" message="Something went wrong" visible={true} />

// Con auto-cierre
const [show, setShow] = useState(true);
setTimeout(() => setShow(false), 3000);
<Toast type="info" message="Info message" visible={show} />
```

### CenteredLayout
```jsx
// Para cualquier página que necesite diseño centrado
<CenteredLayout>
  <YourContent />
</CenteredLayout>
```

## 🎨 Paleta de Colores Adicionales

```css
/* Success */
#2ECC71

/* Error */
#E74C3C

/* Warning */
#F39C12

/* Info */
#3498DB

/* Purple gradient */
#8A2BE2

/* Cyan */
#00FFFF
```

## 🔄 Próximas Mejoras

- [ ] Agregar validación de formato de semestre
- [ ] Integrar con backend real
- [ ] Agregar loading state durante el envío
- [ ] Implementar confirmación antes de salir con datos sin guardar
- [ ] Agregar campo de descripción opcional
- [ ] Implementar drag & drop para adjuntar archivos
