/**
 * ============================================
 * FONT SELECTOR - Selector de fuentes del sistema
 * ============================================
 */

import { useState, useEffect } from 'react'
import '../../assets/css/FontSelector.css'

const FontSelector = ({ isOpen, onClose }) => {
  const [selectedFont, setSelectedFont] = useState('inter')
  const [previewText, setPreviewText] = useState('SENA - Sistema de Gestión de Bienes')

  const fonts = [
    {
      id: 'inter',
      name: 'Inter',
      description: 'Diseñada específicamente para interfaces digitales',
      category: 'Sans-serif',
      googleFont: 'Inter:wght@100;200;300;400;500;600;700;800;900',
      cssFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      pros: [
        'Excelente legibilidad en pantallas',
        'Optimizada para UI/UX',
        'Amplio rango de pesos',
        'Muy popular en aplicaciones modernas'
      ],
      cons: [
        'Puede parecer muy común',
        'Requiere carga desde Google Fonts'
      ],
      recommended: true
    },
    {
      id: 'poppins',
      name: 'Poppins',
      description: 'Fuente geométrica moderna y amigable',
      category: 'Sans-serif',
      googleFont: 'Poppins:wght@100;200;300;400;500;600;700;800;900',
      cssFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      pros: [
        'Muy legible y moderna',
        'Geométrica y balanceada',
        'Excelente para títulos',
        'Amigable y profesional'
      ],
      cons: [
        'Puede ser menos formal',
        'Espaciado amplio'
      ]
    },
    {
      id: 'source-sans',
      name: 'Source Sans Pro',
      description: 'Diseñada por Adobe para interfaces de usuario',
      category: 'Sans-serif',
      googleFont: 'Source+Sans+Pro:wght@200;300;400;600;700;900',
      cssFamily: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif",
      pros: [
        'Diseñada específicamente para UI',
        'Muy profesional',
        'Usada por muchos gobiernos',
        'Excelente legibilidad'
      ],
      cons: [
        'Menos moderna que Inter',
        'Puede parecer corporativa'
      ]
    },
    {
      id: 'roboto',
      name: 'Roboto',
      description: 'La fuente oficial de Google Material Design',
      category: 'Sans-serif',
      googleFont: 'Roboto:wght@100;300;400;500;700;900',
      cssFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
      pros: [
        'Muy familiar para usuarios',
        'Excelente en móviles',
        'Parte de Material Design',
        'Muy legible'
      ],
      cons: [
        'Muy común en Android',
        'Puede parecer genérica'
      ]
    },
    {
      id: 'nunito',
      name: 'Nunito Sans',
      description: 'Fuente redondeada y amigable',
      category: 'Sans-serif',
      googleFont: 'Nunito+Sans:wght@200;300;400;600;700;800;900',
      cssFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      pros: [
        'Muy amigable y accesible',
        'Bordes redondeados',
        'Excelente legibilidad',
        'Moderna y limpia'
      ],
      cons: [
        'Puede ser muy casual',
        'No tan formal para gobierno'
      ]
    },
    {
      id: 'system',
      name: 'System Font',
      description: 'Fuente nativa del sistema operativo',
      category: 'Sistema',
      googleFont: null,
      cssFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      pros: [
        'Carga instantánea',
        'Familiar para el usuario',
        'Optimizada por el SO',
        'Sin dependencias externas'
      ],
      cons: [
        'Diferente en cada sistema',
        'Menos control sobre el diseño'
      ]
    }
  ]

  // Cargar fuente seleccionada del localStorage
  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont')
    if (savedFont && fonts.find(f => f.id === savedFont)) {
      setSelectedFont(savedFont)
    }
  }, [])

  // Aplicar fuente seleccionada
  useEffect(() => {
    const font = fonts.find(f => f.id === selectedFont)
    if (font) {
      // Cargar Google Font si es necesario
      if (font.googleFont) {
        loadGoogleFont(font.googleFont)
      }
      
      // Aplicar fuente al documento
      document.documentElement.style.setProperty('--font-primary', font.cssFamily)
      
      // Guardar selección
      localStorage.setItem('selectedFont', selectedFont)
    }
  }, [selectedFont])

  const loadGoogleFont = (fontQuery) => {
    // Verificar si ya está cargada
    const existingLink = document.querySelector(`link[href*="${fontQuery}"]`)
    if (existingLink) return

    // Crear y agregar el link
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap`
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }

  const handleFontChange = (fontId) => {
    setSelectedFont(fontId)
  }

  const resetToDefault = () => {
    setSelectedFont('inter')
  }

  if (!isOpen) return null

  return (
    <div className="font-selector-overlay">
      <div className="font-selector-modal">
        <div className="font-selector-header">
          <h2 className="font-selector-title">
            🎨 Selector de Tipografía
          </h2>
          <button onClick={onClose} className="font-selector-close">
            ✕
          </button>
        </div>

        <div className="font-selector-content">
          {/* Preview Section */}
          <div className="font-preview-section">
            <h3 className="preview-title">Vista Previa</h3>
            <div className="preview-container" style={{ fontFamily: fonts.find(f => f.id === selectedFont)?.cssFamily }}>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="preview-input"
                placeholder="Escribe aquí para probar la fuente..."
              />
              <div className="preview-samples">
                <div className="preview-sample preview-heading">
                  {previewText}
                </div>
                <div className="preview-sample preview-body">
                  Esta es una muestra de texto normal con la fuente seleccionada. 
                  Incluye números como 123,456 y caracteres especiales como áéíóú ñ.
                </div>
                <div className="preview-sample preview-small">
                  Texto pequeño para etiquetas y descripciones del sistema.
                </div>
              </div>
            </div>
          </div>

          {/* Font Options */}
          <div className="font-options-section">
            <h3 className="options-title">Opciones de Fuente</h3>
            <div className="font-grid">
              {fonts.map(font => (
                <div
                  key={font.id}
                  onClick={() => handleFontChange(font.id)}
                  className={`font-option ${selectedFont === font.id ? 'selected' : ''} ${font.recommended ? 'recommended' : ''}`}
                >
                  {font.recommended && (
                    <div className="recommended-badge">
                      ⭐ Recomendada
                    </div>
                  )}
                  
                  <div className="font-option-header">
                    <h4 className="font-name" style={{ fontFamily: font.cssFamily }}>
                      {font.name}
                    </h4>
                    <span className="font-category">{font.category}</span>
                  </div>
                  
                  <p className="font-description">
                    {font.description}
                  </p>
                  
                  <div className="font-sample" style={{ fontFamily: font.cssFamily }}>
                    SENA Bienes - Aa Bb Cc 123
                  </div>
                  
                  <div className="font-details">
                    <div className="font-pros">
                      <h5>✅ Ventajas:</h5>
                      <ul>
                        {font.pros.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="font-cons">
                      <h5>⚠️ Consideraciones:</h5>
                      <ul>
                        {font.cons.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="font-selector-footer">
          <div className="footer-info">
            <span className="info-icon">💡</span>
            <span>La fuente seleccionada se aplicará a todo el sistema</span>
          </div>
          
          <div className="footer-actions">
            <button onClick={resetToDefault} className="font-btn font-btn-reset">
              Restaurar por defecto
            </button>
            <button onClick={onClose} className="font-btn font-btn-apply">
              Aplicar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FontSelector