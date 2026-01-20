/**
 * ============================================
 * SIDEBAR.JSX - Menú lateral de navegación
 * ============================================
 * 
 * Este componente muestra el menú lateral con:
 * - Logo y título SENA BIENES
 * - Información del usuario actual
 * - Menú de navegación (Dashboard, Bienes, Cuentadantes, Asignaciones)
 * - Información del sistema (versión y estado)
 * 
 * Características:
 * - Responsive con menú hamburguesa
 * - Colapsable en todas las resoluciones
 * - Overlay oscuro al abrir
 * 
 * @param {string} activeView - Vista actualmente seleccionada
 * @param {Function} onViewChange - Función para cambiar de vista
 * @param {boolean} isOpen - Estado del sidebar (abierto/cerrado)
 * @param {Function} onClose - Función para cerrar el sidebar
 */

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../hooks/useNotifications'
import { useTranslation } from '../../hooks/useTranslation'
import PerfilModal from '../PerfilModal'
import ConfiguracionModal from '../ConfiguracionModal'
import '../../assets/css/Sidebar.css'

const Sidebar = ({ activeView, onViewChange, isOpen, onClose, onLogout }) => {
  const { user, logout } = useAuth()
  const notifications = useNotifications()
  const { t } = useTranslation()
  const [showPerfilModal, setShowPerfilModal] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)

  const handleLogout = () => {
    notifications.logoutExitoso()
    setTimeout(() => {
      logout()
      onLogout()
    }, 500)
  }

  // ============================================
  // ITEMS DEL MENÚ DE NAVEGACIÓN LIMPIOS
  // ============================================
  const menuItems = [
    {
      id: 'dashboard',
      name: t('sidebar.dashboard'),
      icon: '📊',
      description: t('sidebar.dashboardDesc'),
      badge: null
    },
    {
      id: 'bienes',
      name: t('sidebar.bienes'),
      icon: '💻',
      description: t('sidebar.bienesDesc'),
      badge: '24'
    },
    {
      id: 'personas',
      name: 'Personas',
      icon: '👥',
      description: 'Gestión de personas',
      badge: null
    },
    {
      id: 'asignaciones',
      name: t('sidebar.asignaciones'),
      icon: '📋',
      description: t('sidebar.asignacionesDesc'),
      badge: '3'
    },
    {
      id: 'roles',
      name: 'Roles',
      icon: '🎭',
      description: 'Gestión de roles',
      badge: null
    },
    {
      id: 'sedes',
      name: 'Sedes',
      icon: '🏢',
      description: 'Gestión de sedes',
      badge: null
    }
  ]

  return (
    <>
      {/* ============================================
          OVERLAY - Fondo oscuro cuando el sidebar está abierto
          Al hacer clic en el overlay, se cierra el sidebar
          ============================================ */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}
      
      {/* ============================================
          SIDEBAR CONTAINER - Contenedor principal del menú
          Clase 'sidebar-open' se agrega cuando está abierto
          ============================================ */}
      <div className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`}>
      {/* Logo y título mejorado */}
      <div className="sidebar-logo-section modern">
        <div className="sidebar-logo-content">
          <div className="sidebar-logo-wrapper">
            <img 
              src="/sena-logo.png (2).png" 
              alt="Logo SENA" 
              className="sidebar-logo-img"
            />
          </div>
          <div className="sidebar-brand-text">
            <h1 className="dashboard-title text-lg poppins-bold text-gray-900 dark:text-white">
              {t('sidebar.title')}
            </h1>
            <p className="dashboard-subtitle text-xs poppins-regular text-gray-600 dark:text-gray-400">
              {t('sidebar.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Información del usuario mejorada */}
      <div className="sidebar-user-section modern" onClick={() => setShowPerfilModal(true)} style={{ cursor: 'pointer' }}>
        <div className="sidebar-user-content">
          <div className="sidebar-user-avatar-wrapper">
            <img 
              src="/sena-logo-perfil.png.webp.webp" 
              alt="Perfil" 
              className="sidebar-user-avatar"
            />
            <div className="sidebar-user-status"></div>
          </div>
          <div className="sidebar-user-info">
            <p className="dashboard-text sidebar-user-name poppins-medium">
              {user?.nombre || 'Usuario'}
            </p>
            <p className="dashboard-subtitle sidebar-user-area poppins-regular">
              {user?.area || 'Área no definida'}
            </p>
          </div>
          <div className="sidebar-user-chevron">
            <span className="chevron-icon">⚙️</span>
          </div>
        </div>
      </div>

      {/* Menú de navegación limpio */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-header">
          <h3 className="sidebar-nav-title poppins-medium">Navegación</h3>
        </div>
        <ul className="sidebar-menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`sidebar-menu-item modern ${activeView === item.id ? 'active' : ''}`}
              >
                <div className="sidebar-menu-icon-wrapper">
                  <span className="sidebar-menu-icon">{item.icon}</span>
                </div>
                <div className="sidebar-menu-content">
                  <div className="sidebar-menu-header">
                    <p className="dashboard-text sidebar-menu-name poppins-medium">{item.name}</p>
                    {item.badge && (
                      <span className="sidebar-menu-badge">{item.badge}</span>
                    )}
                  </div>
                  <p className="dashboard-subtitle sidebar-menu-description poppins-regular">{item.description}</p>
                </div>
                <div className="sidebar-menu-arrow">
                  <span className="arrow-icon">→</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sección de botones de acción mejorada */}
      <div className="sidebar-bottom-section modern">
        <div className="sidebar-action-buttons">
          <button
            onClick={() => setShowConfigModal(true)}
            className="sidebar-action-btn config poppins-medium"
          >
            <span className="sidebar-action-icon">⚙️</span>
            <span className="sidebar-action-text">{t('sidebar.configuracion')}</span>
            <span className="sidebar-action-arrow">→</span>
          </button>

          <button
            onClick={handleLogout}
            className="sidebar-action-btn logout poppins-medium"
          >
            <span className="sidebar-action-icon">🚪</span>
            <span className="sidebar-action-text">{t('sidebar.cerrarSesion')}</span>
            <span className="sidebar-action-arrow">→</span>
          </button>
        </div>
      </div>
    </div>

    {/* Modales */}
    {showPerfilModal && (
      <PerfilModal onClose={() => setShowPerfilModal(false)} />
    )}

    {showConfigModal && (
      <ConfiguracionModal onClose={() => setShowConfigModal(false)} />
    )}
    </>
  )
}

export default Sidebar