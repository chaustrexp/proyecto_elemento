/**
 * ============================================
 * HEADERCOMPARISON.JSX - Comparación de headers
 * ============================================
 * 
 * Este componente muestra una comparación detallada
 * entre diferentes estilos de header para el sistema
 */

import EnhancedHeader from '../EnhancedHeader'
import CleanHeader from '../CleanHeader'
import '../../assets/css/HeaderComparison.css'

const HeaderComparison = ({ onBack, onSelect }) => {
  const headerOptions = [
    {
      id: 'enhanced',
      name: 'Header Mejorado (Enhanced)',
      description: 'Header completo con todas las funcionalidades avanzadas, notificaciones, búsqueda global y múltiples opciones de navegación.',
      component: EnhancedHeader,
      features: {
        'Funcionalidades': [
          'Búsqueda global integrada',
          'Centro de notificaciones',
          'Selector de idioma',
          'Selector de tema',
          'Menú de usuario completo',
          'Breadcrumbs dinámicos'
        ],
        'Diseño': [
          'Interfaz rica en elementos',
          'Múltiples secciones',
          'Iconografía extensa',
          'Animaciones avanzadas',
          'Gradientes y efectos'
        ],
        'Navegación': [
          'Acceso rápido a funciones',
          'Shortcuts de teclado',
          'Menús desplegables',
          'Indicadores de estado'
        ]
      },
      pros: [
        'Máxima funcionalidad disponible',
        'Acceso rápido a todas las herramientas',
        'Experiencia de usuario rica',
        'Ideal para usuarios avanzados'
      ],
      cons: [
        'Puede resultar abrumador',
        'Ocupa más espacio vertical',
        'Mayor complejidad visual',
        'Curva de aprendizaje más alta'
      ]
    },
    {
      id: 'clean',
      name: 'Header Limpio (Clean)',
      description: 'Header minimalista enfocado en la simplicidad y claridad, con solo los elementos esenciales para una experiencia limpia.',
      component: CleanHeader,
      features: {
        'Funcionalidades': [
          'Logo y título principal',
          'Menú de usuario básico',
          'Selector de tema',
          'Logout funcional',
          'Información de usuario'
        ],
        'Diseño': [
          'Interfaz minimalista',
          'Espacios amplios',
          'Tipografía clara',
          'Colores institucionales',
          'Diseño responsive'
        ],
        'Navegación': [
          'Navegación simplificada',
          'Elementos esenciales',
          'Fácil comprensión',
          'Acceso directo'
        ]
      },
      pros: [
        'Diseño limpio y claro',
        'Fácil de usar y entender',
        'Carga más rápida',
        'Menos distracciones',
        'Ideal para usuarios nuevos'
      ],
      cons: [
        'Funcionalidades limitadas',
        'Menos opciones de acceso rápido',
        'Puede requerir más clics',
        'Menos información visible'
      ]
    }
  ]

  return (
    <div className="header-comparison-container">
      <div className="comparison-title">
        <h1>Comparación de Headers</h1>
        <p>Elige el estilo de header que mejor se adapte a las necesidades de tu equipo</p>
      </div>

      <div className="comparison-grid">
        {headerOptions.map((option) => (
          <div key={option.id} className="header-option">
            <div className="header-preview">
              <option.component 
                user={{ nombre: 'Usuario Demo', rol: 'Administrador' }}
                onLogout={() => {}}
                isDemo={true}
              />
            </div>
            <div className="header-info">
              <h3>{option.name}</h3>
              <p>{option.description}</p>
              
              <div className="feature-grid">
                {Object.entries(option.features).map(([category, features]) => (
                  <div key={category} className="feature-category">
                    <h4>{category}</h4>
                    <ul className="feature-list">
                      {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="pros-cons">
                <div className="pros">
                  <h4>Ventajas</h4>
                  <ul>
                    {option.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4>Consideraciones</h4>
                  <ul>
                    {option.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-nav">
        <button 
          className="nav-button secondary"
          onClick={onBack}
        >
          ← Volver al Dashboard
        </button>
        <button 
          className="nav-button primary"
          onClick={() => onSelect && onSelect('clean')}
        >
          Usar Header Limpio (Recomendado)
        </button>
      </div>
    </div>
  )
}

export default HeaderComparison