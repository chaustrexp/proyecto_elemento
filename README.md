# 🏢 Sistema de Gestión de Bienes SENA

Un sistema completo y moderno para la gestión de bienes institucionales del SENA, desarrollado con React y diseño responsive.

![SENA Logo](https://img.shields.io/badge/SENA-Sistema%20de%20Bienes-green?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)

## 🚀 Características Principales

### ✨ Interfaz de Usuario
- **🎨 Diseño Moderno**: Interfaz limpia y profesional con colores institucionales SENA
- **📱 Completamente Responsive**: Optimizado para desktop, tablet y móvil
- **🌙 Tema Oscuro/Claro**: Cambio dinámico entre modos con persistencia
- **🎯 Tipografía Poppins**: Sistema tipográfico consistente y legible
- **⚡ Animaciones Suaves**: Transiciones y efectos visuales optimizados

### 📊 Dashboard Avanzado
- **📈 Tarjetas de Estadísticas Mejoradas**: Con gráficos interactivos y animaciones
- **📊 Panel de Analytics**: Visualización de datos en tiempo real
- **🔍 Búsqueda Global**: Sistema de búsqueda inteligente across all modules
- **📋 Feed de Actividad**: Seguimiento de acciones en tiempo real
- **📤 Exportador de Reportes**: Generación de reportes en múltiples formatos

### 🗃️ Gestión de Datos
- **🏠 Bienes**: Registro completo de activos institucionales
- **👥 Personas**: Gestión de cuentadantes y responsables
- **📋 Asignaciones**: Control de asignación de bienes
- **🏢 Sedes**: Administración de ubicaciones
- **👤 Roles**: Sistema de permisos y roles de usuario

### 🌐 Características Técnicas
- **🔐 Sistema de Autenticación**: Login seguro con recuperación de contraseña
- **🌍 Multi-idioma**: Soporte para Español, Inglés y Portugués
- **🔔 Notificaciones**: Sistema de alertas y notificaciones en tiempo real
- **📱 Mobile-First**: Diseño optimizado para dispositivos móviles
- **♿ Accesibilidad**: Cumple con estándares de accesibilidad web

## 🛠️ Stack Tecnológico

### Frontend
- **⚛️ React 18**: Biblioteca principal de UI
- **⚡ Vite**: Build tool y dev server ultrarrápido
- **🎨 Tailwind CSS**: Framework de CSS utilitario
- **🎯 CSS Custom**: Estilos personalizados para componentes específicos
- **📱 Responsive Design**: Mobile-first approach

### Arquitectura
- **🏗️ Component-Based**: Arquitectura modular y reutilizable
- **🔄 Context API**: Gestión de estado global
- **🪝 Custom Hooks**: Lógica reutilizable encapsulada
- **📁 Folder Structure**: Organización clara y escalable

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn
- Git

### 🚀 Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/chaustrexp/proyecto_elemento.git

# Navegar al directorio
cd proyecto_elemento

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

### 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con hot reload

# Producción
npm run build        # Build para producción
npm run preview      # Preview del build de producción

# Utilidades
npm run lint         # Linting del código
npm run format       # Formateo automático
```

## 📱 Responsive Design

El sistema está optimizado para múltiples dispositivos:

### 📊 Breakpoints
- **📱 Mobile**: 320px - 640px
- **📱 Mobile Large**: 640px - 768px  
- **📟 Tablet**: 768px - 1024px
- **💻 Desktop**: 1024px - 1200px
- **🖥️ Large Desktop**: 1200px+

### 🎯 Optimizaciones Móviles
- **👆 Touch-Friendly**: Botones y áreas de toque optimizadas
- **📜 Scroll Horizontal**: Tablas con scroll inteligente
- **🔤 Tipografía Adaptativa**: Tamaños de fuente que se ajustan
- **🎨 Layout Flexible**: Componentes que se reorganizan automáticamente

## 🎨 Sistema de Diseño

### 🎨 Paleta de Colores
```css
/* Colores Principales SENA */
--sena-green: #39A900
--sena-dark-green: #2d8000
--sena-light-green: #4ade80

/* Colores de Sistema */
--primary: #0f172a
--secondary: #64748b
--success: #10b981
--warning: #f59e0b
--error: #ef4444
```

### 📝 Tipografía
- **Fuente Principal**: Poppins (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Escalas**: Responsive typography scale

## 🌙 Tema Oscuro

Sistema completo de tema oscuro con:
- **🔄 Cambio Dinámico**: Toggle en el header
- **💾 Persistencia**: Guarda preferencia del usuario
- **🎨 Variables CSS**: Sistema de colores adaptativo
- **🌐 Detección Automática**: Respeta preferencias del sistema

## 🔍 Características Avanzadas

### 📊 Dashboard Analytics
- Gráficos interactivos con Chart.js
- Métricas en tiempo real
- Indicadores de rendimiento (KPIs)
- Tendencias y comparativas

### 🔍 Búsqueda Global
- Búsqueda across all modules
- Filtros inteligentes
- Resultados instantáneos
- Navegación directa a resultados

### 📋 Sistema de Tablas
- Ordenamiento por columnas
- Filtros avanzados
- Paginación inteligente
- Exportación de datos
- Responsive con scroll horizontal

## 🚀 Deployment

### 📦 Build de Producción
```bash
npm run build
```

### 🌐 Opciones de Deploy
- **Vercel**: Deploy automático desde GitHub
- **Netlify**: Continuous deployment
- **GitHub Pages**: Hosting gratuito
- **Docker**: Containerización disponible

## 🤝 Contribución

### 📋 Proceso de Contribución
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

### 📝 Convenciones de Código
- **ESLint**: Linting automático
- **Prettier**: Formateo de código
- **Conventional Commits**: Mensajes de commit estandarizados
- **Component Structure**: Estructura consistente de componentes

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo de Desarrollo

- **Desarrollador Principal**: Cristian Chaustre (@chaustrexp)
- **Institución**: SENA (Servicio Nacional de Aprendizaje)
- **Propósito**: Sistema de gestión de bienes institucionales

## 📞 Soporte

Para soporte técnico o consultas:
- 📧 Email: cristianchaustre90@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/chaustrexp/proyecto_elemento/issues)
- 📖 Documentación: Ver carpeta `/docs`

## 🔄 Changelog

### v1.0.0 (2024-01-20)
- ✨ Lanzamiento inicial
- 🎨 Sistema completo de UI/UX
- 📱 Responsive design implementado
- 🌙 Tema oscuro/claro
- 📊 Dashboard con analytics
- 🔍 Búsqueda global
- 📋 Sistema de tablas limpias
- 🌐 Multi-idioma (ES, EN, PT)
- 🔐 Sistema de autenticación
- 📊 Gestión completa de bienes

---

<div align="center">

**🏢 Desarrollado para el SENA con ❤️**

[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>