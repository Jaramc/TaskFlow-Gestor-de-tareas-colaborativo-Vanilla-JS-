# TaskFlow - Gestor de Tareas Colaborativo

Un sistema básico de gestión de tareas desarrollado con **HTML**, **CSS**, **JavaScript** y **Bootstrap** para principiantes.

## 📁 Estructura del Proyecto

```
TaskFlow/
├── index.html              # Página principal (dashboard)
├── index.js                # Lógica del dashboard
├── style.css               # Estilos del dashboard
├── auth/                   # Carpeta de autenticación
│   ├── login.html          # Página de inicio de sesión
│   └── register.html       # Página de registro
├── css/                    # Estilos organizados
│   └── auth.css            # Estilos para login y registro
├── js/                     # JavaScript organizado
│   ├── login.js            # Lógica de inicio de sesión
│   └── register.js         # Lógica de registro
├── Imagenes/               # Imágenes del proyecto
└── README.md               # Este archivo
```

## 🚀 Cómo usar el proyecto

### 1. Registro de Usuario
1. Abre `auth/register.html` en tu navegador
2. Llena todos los campos del formulario
3. Haz clic en "Registrarse"
4. El usuario se guardará en el navegador

### 2. Iniciar Sesión
1. Ve a `auth/login.html`
2. Ingresa tu usuario y contraseña
3. Haz clic en "Iniciar Sesión"
4. Serás redirigido al dashboard

### 3. Dashboard
- Muestra la fecha y hora actual
- Permite cerrar sesión
- Muestra información del usuario logueado

## 📝 Características del Código (Nivel Principiante)

### ✅ Buenas Prácticas Implementadas:

1. **Código Comentado**: Cada función tiene comentarios explicativos
2. **Nombres Descriptivos**: Variables y funciones con nombres claros
3. **Validaciones Básicas**: Verificación de campos vacíos y formato de email
4. **Manejo de Errores**: Mensajes informativos para el usuario
5. **Almacenamiento Local**: Uso básico de localStorage
6. **Responsive Design**: Compatible con móviles y escritorio

### 🔧 Tecnologías Utilizadas:

- **HTML5**: Estructura de las páginas
- **CSS3**: Estilos y diseño
- **JavaScript ES6**: Lógica de la aplicación
- **Bootstrap 5**: Framework CSS para diseño
- **LocalStorage**: Almacenamiento en el navegador

## 📚 Conceptos de JavaScript que aprenderás:

1. **DOM Manipulation**: 
   - `document.getElementById()`
   - `addEventListener()`
   - Cambiar contenido de elementos

2. **Eventos**:
   - `DOMContentLoaded`
   - `submit` en formularios
   - `click` en botones

3. **Validación de Formularios**:
   - Verificar campos vacíos
   - Validar formato de email
   - Comparar contraseñas

4. **LocalStorage**:
   - Guardar datos: `localStorage.setItem()`
   - Obtener datos: `localStorage.getItem()`
   - Eliminar datos: `localStorage.removeItem()`

5. **JSON**:
   - Convertir a string: `JSON.stringify()`
   - Convertir a objeto: `JSON.parse()`

## 🎯 Flujo de la Aplicación:

```
Usuario nuevo → Registro → Login → Dashboard
Usuario existente → Login → Dashboard
```

## 🛠️ Próximas mejoras sugeridas:

1. Agregar más páginas (tareas, proyectos, configuración)
2. Implementar sistema de tareas completo
3. Agregar validaciones más robustas
4. Mejorar el diseño visual
5. Agregar funcionalidad de "recordar sesión"

## 📱 Compatibilidad:

- ✅ Chrome
- ✅ Firefox  
- ✅ Safari
- ✅ Edge
- ✅ Móviles (responsive)

## 💡 Para principiantes:

Este proyecto es ideal para aprender:
- Manipulación básica del DOM
- Eventos en JavaScript
- Trabajo con formularios
- Almacenamiento local en el navegador
- Diseño responsive con Bootstrap

## 🔒 Nota de Seguridad:

Este es un proyecto educativo. En una aplicación real, **NUNCA** se deben almacenar contraseñas sin encriptar ni usar localStorage para datos sensibles.

---

**¡Feliz aprendizaje! 🎉**
