/**
 * ============================================
 * AUTHBACKGROUNDSHOWCASE.JSX - Showcase de fondos de autenticación
 * ============================================
 * 
 * Este componente muestra diferentes opciones de fondo
 * para la pantalla de autenticación del sistema SENA
 */

import '../../assets/css/AuthBackgroundShowcase.css'

const AuthBackgroundShowcase = ({ onBack, onSelect }) => {
  const backgroundOptions = [
    {
      id: 'gradient',
      name: 'Gradiente SENA',
      description: 'Fondo con gradiente en colores institucionales del SENA',
      features: [
        'Colores oficiales SENA',
        'Diseño moderno y limpio',
        'Excelente legibilidad',
        'Carga rápida'
      ],
      className: 'gradient-background'
    },
    {
      id: 'image',
      name: 'Imagen Personalizada',
      description: 'Fondo con imagen institucional personalizada',
      features: [
        'Imagen institucional',
        'Overlay para legibilidad',
        'Diseño profesional',
        'Branding reforzado'
      ],
      className: 'image-background'
    },
    {
      id: 'pattern',
      name: 'Patrón Geométrico',
      description: 'Fondo con patrón geométrico sutil sobre color SENA',
      features: [
        'Patrón geométrico elegante',
        'Color base SENA',
        'Textura sutil',
        'Diseño contemporáneo'
      ],
      className: 'pattern-background'
    },
    {
      id: 'animated',
      name: 'Gradiente Animado',
      description: 'Fondo con gradiente animado en movimiento',
      features: [
        'Animación suave',
        'Colores dinámicos',
        'Efecto moderno',
        'Atractivo visual'
      ],
      className: 'animated-background'
    }
  ]

  return (
    <div className="auth-background-showcase">
      <div className="showcase-title">
        <h1>Opciones de Fondo - Autenticación SENA</h1>
        <p>Selecciona el estilo de fondo que mejor se adapte a tu preferencia</p>
      </div>

      <div className="showcase-grid">
        {backgroundOptions.map((option) => (
          <div key={option.id} className="showcase-option">
            <div className={`showcase-preview ${option.className}`}>
              <div className="preview-content">
                <div className="preview-logo">SENA</div>
                <div className="preview-title">SENA BIENES</div>
                <div className="preview-subtitle">Sistema Integral de Control</div>
              </div>
            </div>
            <div className="showcase-info">
              <h3>{option.name}</h3>
              <p>{option.description}</p>
              <ul className="showcase-features">
                {option.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="showcase-nav">
        <button 
          className="nav-button secondary"
          onClick={onBack}
        >
          ← Volver al Dashboard
        </button>
        <button 
          className="nav-button"
          onClick={() => onSelect && onSelect('current')}
        >
          Usar Configuración Actual
        </button>
      </div>
    </div>
  )
}

export default AuthBackgroundShowcase