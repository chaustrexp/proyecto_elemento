/**
 * ============================================
 * HEADERSHOW CASE.JSX - Showcase de headers
 * ============================================
 * 
 * Este componente muestra las diferentes opciones
 * de header disponibles para el sistema SENA
 */

import EnhancedHeader from '../EnhancedHeader'
import CleanHeader from '../CleanHeader'
import '../../assets/css/HeaderShowcase.css'

const HeaderShowcase = ({ onBack, onSelect }) => {
  const headerOptions = [
    {
      id: 'enhanced',
      name: 'Header Completo',
      description: 'Header con todas las funcionalidades avanzadas: búsqueda global, notificaciones, configuraciones y accesos rápidos.',
      component: EnhancedHeader,
      isRecommended: false,
      features: {
        'Funcionalidades': [
          'Búsqueda global integrada',
          'Centro de notificaciones',
          'Selector de idioma y tema',
          'Menú de usuario completo',
          'Breadcrumbs dinámicos',
          'Accesos rápidos'
        ],
        'Experiencia': [
          'Interfaz rica en opciones',
          'Acceso inmediato a herramientas',
          'Información contextual',
          'Navegación avanzada'
        ]
      },
      stats: {
        funcionalidad: '10/10',
        simplicidad: '6/10',
        velocidad: '7/10',
        usabilidad: '8/10'
      },
      pros: [
        'Máxima funcionalidad disponible',
        'Ideal para usuarios avanzados',
        'Acceso rápido a todas las herramientas'
      ],
      cons: [
        'Puede resultar abrumador',
        'Curva de aprendizaje más alta',
        'Ocupa más espacio en pantalla'
      ]
    },
    {
      id: 'clean',
      name: 'Header Minimalista',
      description: 'Header limpio y enfocado en lo esencial: logo, usuario y funciones básicas. Ideal para una experiencia sin distracciones.',
      component: CleanHeader,
      isRecommended: true,
      features: {
        'Funcionalidades': [
          'Logo y branding SENA',
          'Información de usuario',
          'Selector de tema',
          'Menú de usuario básico',
          'Logout seguro'
        ],
        'Experiencia': [
          'Interfaz limpia y clara',
          'Navegación intuitiva',
          'Carga rápida',
          'Fácil comprensión'
        ]
      },
      stats: {
        funcionalidad: '7/10',
        simplicidad: '10/10',
        velocidad: '10/10',
        usabilidad: '9/10'
      },
      pros: [
        'Diseño limpio y profesional',
        'Fácil de usar para todos',
        'Carga más rápida',
        'Menos distracciones'
      ],
      cons: [
        'Funcionalidades más limitadas',
        'Requiere más navegación',
        'Menos accesos directos'
      ]
    }
  ]

  return (
    <div className="header-showcase">
      <div className="showcase-title">
        <h1>Opciones de Header</h1>
        <p>
          Elige el estilo de header que mejor se adapte a las necesidades 
          de tu equipo y la experiencia que deseas ofrecer.
        </p>
      </div>

      <div className="header-options">
        {headerOptions.map((option) => (
          <div key={option.id} className="header-option">
            <div className="header-demo">
              <option.component 
                user={{ nombre: 'Usuario Demo', rol: 'Administrador' }}
                onLogout={() => {}}
                isDemo={true}
              />
              <div className="demo-overlay"></div>
            </div>
            
            <div className="header-info">
              {option.isRecommended && (
                <div className="recommendation-badge">
                  ⭐ Recomendado
                </div>
              )}
              
              <h3 className="header-title">{option.name}</h3>
              <p className="header-description">{option.description}</p>

              <div className="stats-grid">
                {Object.entries(option.stats).map(([key, value]) => (
                  <div key={key} className="stat-item">
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{key}</span>
                  </div>
                ))}
              </div>

              <div className="feature-highlights">
                {Object.entries(option.features).map(([category, features]) => (
                  <div key={category} className="feature-group">
                    <h4>{category}</h4>
                    <ul className="feature-list">
                      {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="action-buttons">
                <button 
                  className="btn-secondary"
                  onClick={() => {/* Mostrar más detalles */}}
                >
                  Ver Detalles
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => onSelect && onSelect(option.id)}
                >
                  {option.isRecommended ? 'Usar Este Header ⭐' : 'Seleccionar'}
                </button>
              </div>
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
          onClick={() => onSelect && onSelect('clean')}
        >
          Usar Header Recomendado
        </button>
      </div>
    </div>
  )
}

export default HeaderShowcase