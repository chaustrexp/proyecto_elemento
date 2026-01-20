/**
 * ============================================
 * ENHANCED HEADER - Barra superior moderna y mejorada
 * ============================================
 */

import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import NotificationCenter from './Notification/NotificationCenter'
import LanguageSelector from './LanguageSelector'
import ReportExporter from './Reports/ReportExporter'
import FontSelector from './UI/FontSelector'
import '../assets/css/EnhancedHeader.css'

const EnhancedHeader = ({ onMenuClick, activeView = 'dashboard' }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [lastSync, setLastSync] = useState(new Date())
  const [syncTimeAgo, setSyncTimeAgo] = useState('hace 0 min')
  const [showReportExporter, setShowReportExporter] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showFontSelector, setShowFontSelector] = useState(false)
  const [systemStatus, setSystemStatus] = useState('online')
  const [connectionQuality, setConnectionQuality] = useState('excellent')
  
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const { user } = useAuth()
  const { stats, refreshData } = useData()

  // Obtener el título según la vista activa
  const getPageTitle = () => {
    const titles = {
      dashboard: '🏠 Dashboard Principal',
      bienes: '💻 Gestión de Bienes',
      personas: '👥 Gestión de Personas',
      asignaciones: '📋 Asignaciones',
      roles: '🎭 Gestión de Roles',
      sedes: '🏢 Gestión de Sedes'
    }
    return titles[activeView] || '🏠 Dashboard Principal'
  }

  // Obtener descripción de la vista
  const getPageDescription = () => {
    const descriptions = {
      dashboard: 'Panel de control y estadísticas del sistema',
      bienes: 'Administra el inventario de bienes institucionales',
      personas: 'Gestiona usuarios y responsables del sistema',
      asignaciones: 'Controla las asignaciones y movimientos',
      roles: 'Administra roles y permisos de usuario',
      sedes: 'Gestiona sedes y ubicaciones'
    }
    return descriptions[activeView] || 'Sistema de gestión de bienes SENA'
  }

  // Actualizar fecha y hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simular sincronización automática
  useEffect(() => {
    const syncTimer = setInterval(() => {
      setLastSync(new Date())
      // Simular calidad de conexión
      const qualities = ['excellent', 'good', 'fair']
      setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)])
    }, 120000) // 2 minutos
    return () => clearInterval(syncTimer)
  }, [])

  // Actualizar tiempo de sincronización
  useEffect(() => {
    const updateSyncTime = () => {
      const now = new Date()
      const diffMs = now - lastSync
      const diffMinutes = Math.floor(diffMs / 60000)
      const diffSeconds = Math.floor((diffMs % 60000) / 1000)

      if (diffMinutes === 0) {
        setSyncTimeAgo(`${diffSeconds}s`)
      } else if (diffMinutes < 60) {
        setSyncTimeAgo(`${diffMinutes}m`)
      } else {
        const diffHours = Math.floor(diffMinutes / 60)
        setSyncTimeAgo(`${diffHours}h`)
      }
    }

    updateSyncTime()
    const timer = setInterval(updateSyncTime, 1000)
    return () => clearInterval(timer)
  }, [lastSync])

  // Formatear fecha y hora
  const formatDateTime = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    return currentDateTime.toLocaleDateString('es-ES', options)
  }

  // Obtener saludo según la hora
  const getGreeting = () => {
    const hour = currentDateTime.getHours()
    if (hour < 12) return '🌅 Buenos días'
    if (hour < 18) return '☀️ Buenas tardes'
    return '🌙 Buenas noches'
  }

  // Acciones rápidas
  const quickActions = [
    {
      id: 'new-bien',
      name: 'Nuevo Bien',
      icon: '➕',
      color: 'green',
      action: () => console.log('Nuevo bien')
    },
    {
      id: 'new-assignment',
      name: 'Nueva Asignación',
      icon: '📋',
      color: 'blue',
      action: () => console.log('Nueva asignación')
    },
    {
      id: 'backup',
      name: 'Respaldo',
      icon: '💾',
      color: 'purple',
      action: () => console.log('Crear respaldo')
    },
    {
      id: 'maintenance',
      name: 'Mantenimiento',
      icon: '🔧',
      color: 'orange',
      action: () => console.log('Modo mantenimiento')
    }
  ]

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false)
      setShowQuickActions(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <header className="enhanced-header">
      <div className="enhanced-header-container">
        {/* Sección izquierda */}
        <div className="enhanced-header-left">
          {/* Botón hamburguesa */}
          <button
            onClick={onMenuClick}
            className="enhanced-hamburger-btn"
            title="Menú de navegación"
          >
            <div className="hamburger-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Logo y título */}
          <div className="enhanced-header-brand">
            <div className="brand-logo">
              <img 
                src="/sena-logo.png" 
                alt="SENA Logo" 
                className="brand-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="brand-logo-fallback" style={{ display: 'none' }}>
                🏛️
              </div>
            </div>
            <div className="brand-content">
              <h1 className="brand-title">SENA BIENES</h1>
              <p className="brand-subtitle">Sistema de Gestión</p>
            </div>
          </div>

          {/* Información de página */}
          <div className="enhanced-page-info">
            <h2 className="page-title">{getPageTitle()}</h2>
            <p className="page-description">{getPageDescription()}</p>
          </div>
        </div>

        {/* Sección central */}
        <div className="enhanced-header-center">
          {/* Estadísticas rápidas */}
          <div className="quick-stats">
            <div className="quick-stat">
              <div className="quick-stat-icon">💻</div>
              <div className="quick-stat-content">
                <div className="quick-stat-value">{stats.totalBienes}</div>
                <div className="quick-stat-label">Bienes</div>
              </div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-icon">📥</div>
              <div className="quick-stat-content">
                <div className="quick-stat-value">{stats.entradasHoy}</div>
                <div className="quick-stat-label">Entradas</div>
              </div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-icon">⚠️</div>
              <div className="quick-stat-content">
                <div className="quick-stat-value">{stats.alertas}</div>
                <div className="quick-stat-label">Alertas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha */}
        <div className="enhanced-header-right">
          {/* Estado del sistema */}
          <div className="system-status">
            <div className={`status-indicator status-${systemStatus}`}>
              <div className="status-dot"></div>
              <div className="status-text">
                <div className="status-main">Sistema Activo</div>
                <div className="status-sub">Última sync: {syncTimeAgo}</div>
              </div>
            </div>
            <div className={`connection-quality quality-${connectionQuality}`}>
              <div className="signal-bars">
                <span className="bar bar-1"></span>
                <span className="bar bar-2"></span>
                <span className="bar bar-3"></span>
                <span className="bar bar-4"></span>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="enhanced-header-controls">
            {/* Acciones rápidas */}
            <div className="quick-actions-container">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowQuickActions(!showQuickActions)
                }}
                className="quick-actions-btn"
                title="Acciones rápidas"
              >
                <span className="quick-actions-icon">⚡</span>
              </button>
              
              {showQuickActions && (
                <div className="quick-actions-menu">
                  <div className="quick-actions-header">
                    <span>Acciones Rápidas</span>
                  </div>
                  {quickActions.map(action => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className={`quick-action-item quick-action-${action.color}`}
                    >
                      <span className="quick-action-icon">{action.icon}</span>
                      <span className="quick-action-name">{action.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selector de idioma */}
            <LanguageSelector />

            {/* Botón de exportar reportes */}
            <button
              onClick={() => setShowReportExporter(true)}
              className="enhanced-export-btn"
              title="Exportar Reportes"
            >
              <span className="export-icon">📊</span>
              <span className="export-label">Reportes</span>
            </button>

            {/* Botón de tema */}
            <button
              onClick={toggleTheme}
              className="enhanced-theme-btn"
              title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              <div className="theme-toggle">
                <div className={`theme-slider ${isDark ? 'dark' : 'light'}`}>
                  <span className="theme-icon">
                    {isDark ? '🌙' : '☀️'}
                  </span>
                </div>
              </div>
            </button>

            {/* Notificaciones */}
            <NotificationCenter />

            {/* Menú de usuario */}
            <div className="user-menu-container">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowUserMenu(!showUserMenu)
                }}
                className="user-menu-btn"
                title="Menú de usuario"
              >
                <div className="user-avatar">
                  <img 
                    src={user?.avatar || '/default-avatar.png'} 
                    alt={user?.nombre}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="user-avatar-fallback" style={{ display: 'none' }}>
                    {user?.nombre?.charAt(0) || 'U'}
                  </div>
                </div>
                <div className="user-info">
                  <div className="user-name">{user?.nombre || 'Usuario'}</div>
                  <div className="user-role">{user?.cargo || 'Administrador'}</div>
                </div>
                <div className="user-menu-arrow">
                  <span className={`arrow ${showUserMenu ? 'up' : 'down'}`}>▼</span>
                </div>
              </button>

              {showUserMenu && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <div className="user-dropdown-avatar">
                      {user?.nombre?.charAt(0) || 'U'}
                    </div>
                    <div className="user-dropdown-info">
                      <div className="user-dropdown-name">{user?.nombre}</div>
                      <div className="user-dropdown-email">{user?.correo}</div>
                      <div className="user-dropdown-greeting">{getGreeting()}</div>
                    </div>
                  </div>
                  
                  <div className="user-dropdown-section">
                    <button className="user-dropdown-item">
                      <span className="dropdown-icon">👤</span>
                      <span>Mi Perfil</span>
                    </button>
                    <button className="user-dropdown-item">
                      <span className="dropdown-icon">⚙️</span>
                      <span>Configuración</span>
                    </button>
                    <button 
                      onClick={() => setShowFontSelector(true)}
                      className="user-dropdown-item"
                    >
                      <span className="dropdown-icon">🎨</span>
                      <span>Tipografía</span>
                    </button>
                    <button className="user-dropdown-item">
                      <span className="dropdown-icon">🔒</span>
                      <span>Privacidad</span>
                    </button>
                  </div>
                  
                  <div className="user-dropdown-section">
                    <button className="user-dropdown-item">
                      <span className="dropdown-icon">❓</span>
                      <span>Ayuda</span>
                    </button>
                    <button className="user-dropdown-item">
                      <span className="dropdown-icon">📞</span>
                      <span>Soporte</span>
                    </button>
                  </div>
                  
                  <div className="user-dropdown-footer">
                    <button className="user-dropdown-logout">
                      <span className="dropdown-icon">🚪</span>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de información adicional */}
      <div className="enhanced-header-info-bar">
        <div className="info-bar-content">
          <div className="current-time">
            <span className="time-icon">🕐</span>
            <span className="time-text">{formatDateTime()}</span>
          </div>
          
          <div className="system-info">
            <span className="info-item">
              <span className="info-icon">🌐</span>
              <span>Conexión: {connectionQuality === 'excellent' ? 'Excelente' : connectionQuality === 'good' ? 'Buena' : 'Regular'}</span>
            </span>
            <span className="info-separator">•</span>
            <span className="info-item">
              <span className="info-icon">💾</span>
              <span>Último respaldo: Hoy 03:00</span>
            </span>
            <span className="info-separator">•</span>
            <span className="info-item">
              <span className="info-icon">👥</span>
              <span>Usuarios activos: 12</span>
            </span>
          </div>
        </div>
      </div>

      {/* Modal de exportación de reportes */}
      <ReportExporter 
        isOpen={showReportExporter}
        onClose={() => setShowReportExporter(false)}
      />
      
      {/* Selector de fuentes */}
      <FontSelector 
        isOpen={showFontSelector}
        onClose={() => setShowFontSelector(false)}
      />
    </header>
  )
}

export default EnhancedHeader