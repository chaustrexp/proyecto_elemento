/**
 * ============================================
 * TYPOGRAPHYSHOWCASE.JSX - Showcase de tipografía
 * ============================================
 * 
 * Este componente muestra diferentes opciones de fuentes
 * para el sistema SENA con ejemplos y características
 */

import { useState } from 'react'
import '../../assets/css/TypographyShowcase.css'

const TypographyShowcase = ({ onBack, onSelect }) => {
  const [selectedFont, setSelectedFont] = useState('inter')

  const fonts = [
    {
      id: 'inter',
      name: 'Inter',
      description: 'Fuente moderna diseñada específicamente para interfaces digitales. Excelente legibilidad en pantallas.',
      className: 'inter-font',
      characteristics: {
        legibilidad: '9.5/10',
        modernidad: '9/10',
        versatilidad: '9/10',
        profesional: '8.5/10'
      },
      useCases: [
        'Interfaces de usuario',
        'Dashboards y paneles',
        'Formularios y campos',
        'Navegación y menús'
      ],
      samples: {
        heading: 'Sistema SENA - Control de Bienes',
        body: 'Esta es una muestra de texto en párrafo para evaluar la legibilidad y el espaciado de la fuente Inter en diferentes tamaños.',
        ui: 'Iniciar Sesión • Dashboard • Configuración'
      }
    },
    {
      id: 'roboto',
      name: 'Roboto',
      description: 'Fuente desarrollada por Google, ampliamente utilizada en aplicaciones web y móviles. Muy legible y familiar.',
      className: 'roboto-font',
      characteristics: {
        legibilidad: '9/10',
        modernidad: '8/10',
        versatilidad: '9.5/10',
        profesional: '8/10'
      },
      useCases: [
        'Aplicaciones web',
        'Contenido extenso',
        'Formularios largos',
        'Documentación'
      ],
      samples: {
        heading: 'Sistema SENA - Control de Bienes',
        body: 'Esta es una muestra de texto en párrafo para evaluar la legibilidad y el espaciado de la fuente Roboto en diferentes tamaños.',
        ui: 'Iniciar Sesión • Dashboard • Configuración'
      }
    },
    {
      id: 'poppins',
      name: 'Poppins',
      description: 'Fuente geométrica con personalidad moderna. Ideal para títulos y elementos que requieren impacto visual.',
      className: 'poppins-font',
      characteristics: {
        legibilidad: '8.5/10',
        modernidad: '9.5/10',
        versatilidad: '8/10',
        profesional: '8.5/10'
      },
      useCases: [
        'Títulos y encabezados',
        'Elementos destacados',
        'Branding y logos',
        'Llamadas a la acción'
      ],
      samples: {
        heading: 'Sistema SENA - Control de Bienes',
        body: 'Esta es una muestra de texto en párrafo para evaluar la legibilidad y el espaciado de la fuente Poppins en diferentes tamaños.',
        ui: 'Iniciar Sesión • Dashboard • Configuración'
      }
    },
    {
      id: 'opensans',
      name: 'Open Sans',
      description: 'Fuente humanista muy legible y neutral. Excelente para contenido extenso y lectura prolongada.',
      className: 'opensans-font',
      characteristics: {
        legibilidad: '9.5/10',
        modernidad: '7.5/10',
        versatilidad: '9/10',
        profesional: '9/10'
      },
      useCases: [
        'Contenido de lectura',
        'Documentos largos',
        'Descripciones detalladas',
        'Texto informativo'
      ],
      samples: {
        heading: 'Sistema SENA - Control de Bienes',
        body: 'Esta es una muestra de texto en párrafo para evaluar la legibilidad y el espaciado de la fuente Open Sans en diferentes tamaños.',
        ui: 'Iniciar Sesión • Dashboard • Configuración'
      }
    },
    {
      id: 'lato',
      name: 'Lato',
      description: 'Fuente semi-redondeada que combina seriedad con calidez. Muy versátil para diferentes contextos.',
      className: 'lato-font',
      characteristics: {
        legibilidad: '9/10',
        modernidad: '8/10',
        versatilidad: '9/10',
        profesional: '8.5/10'
      },
      useCases: [
        'Interfaces corporativas',
        'Presentaciones',
        'Contenido mixto',
        'Aplicaciones empresariales'
      ],
      samples: {
        heading: 'Sistema SENA - Control de Bienes',
        body: 'Esta es una muestra de texto en párrafo para evaluar la legibilidad y el espaciado de la fuente Lato en diferentes tamaños.',
        ui: 'Iniciar Sesión • Dashboard • Configuración'
      }
    },
    {
      id: 'nunito',
      name: 'Nunito',
      description: 'Fuente redondeada y amigable. Ideal para crear interfaces más accesibles y menos intimidantes.',
      className: 'nunito-font',
      characteristics: {
        legibilidad: '8.5/10',
        modernidad: '8.5/10',
        versatilidad: '7.5/10',
        profesional: '7.5/10'
      },
      useCases: [
        'Interfaces amigables',
        'Aplicaciones educativas',
        'Onboarding y tutoriales',
        'Elementos interactivos'
      ],
      samples: {
        heading: 'Sistema SENA - Control de Bienes',
        body: 'Esta es una muestra de texto en párrafo para evaluar la legibilidad y el espaciado de la fuente Nunito en diferentes tamaños.',
        ui: 'Iniciar Sesión • Dashboard • Configuración'
      }
    }
  ]

  const handleFontSelect = (fontId) => {
    setSelectedFont(fontId)
    if (onSelect) {
      onSelect(fontId)
    }
  }

  return (
    <div className="typography-showcase">
      <div className="showcase-header">
        <h1 className="inter-font">Tipografía del Sistema</h1>
        <p className="inter-font">
          Selecciona la fuente que mejor represente la identidad del sistema SENA
          y proporcione la mejor experiencia de lectura para los usuarios.
        </p>
      </div>

      <div className="typography-grid">
        {fonts.map((font) => (
          <div key={font.id} className="font-card">
            <div className={`font-preview ${font.className}`}>
              <div className="font-samples">
                <div className="sample-text">
                  <div className="sample-label">Título Principal</div>
                  <div className="sample-content" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                    {font.samples.heading}
                  </div>
                </div>
                <div className="sample-text">
                  <div className="sample-label">Texto de Párrafo</div>
                  <div className="sample-content" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                    {font.samples.body}
                  </div>
                </div>
                <div className="sample-text">
                  <div className="sample-label">Elementos de UI</div>
                  <div className="sample-content" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                    {font.samples.ui}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="font-info">
              <h3 className="font-name">{font.name}</h3>
              <p className="font-description">{font.description}</p>
              
              <div className="font-characteristics">
                {Object.entries(font.characteristics).map(([key, value]) => (
                  <div key={key} className="characteristic">
                    <span className="characteristic-value">{value}</span>
                    <span className="characteristic-label">{key}</span>
                  </div>
                ))}
              </div>

              <div className="use-cases">
                <h4>Casos de Uso Ideales</h4>
                <ul className="use-case-list">
                  {font.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>

              <button
                className={`select-font-btn ${selectedFont === font.id ? 'selected' : ''}`}
                onClick={() => handleFontSelect(font.id)}
              >
                {selectedFont === font.id ? '✓ Fuente Seleccionada' : 'Seleccionar Esta Fuente'}
              </button>
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
          onClick={() => onSelect && onSelect(selectedFont)}
        >
          Aplicar Fuente Seleccionada
        </button>
      </div>
    </div>
  )
}

export default TypographyShowcase