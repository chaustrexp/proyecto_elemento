/**
 * ============================================
 * CLEAN HEADER - Header minimalista y elegante
 * ============================================
 */

import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'
import { useAuth } from '../contexts/AuthContext'
import NotificationCenter from './Notification/NotificationCenter'
import LanguageSelector from './LanguageSelector'
import ReportExporter from './Reports/ReportExporter'
import FontSelector from './UI/FontSelector'
import '../assets/css/CleanHeader.css'

const CleanHeader = ({ onMenuClick, activeView = 'dashboard' }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showReportExporter, setShowReportExporter] = useState(false)
  const [showFontSelector, setShowFontSelector] = useState(false)
  
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const { user } = useAuth()

  // Actualizar hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Obtener el título según la vista activa
  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      bienes: 'Bienes',
      personas: 'Personas',
      asignaciones: 'Asignaciones',
      roles: 'Roles',
      sedes: 'Sedes'
    }
    return titles[activeView] || 'Dashboard'
  }

  // Formatear hora
  const formatTime = () => {
    return currentTime.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Cerrar menús al hacer clic fuera
  // (Eliminado - ya no hay menú desplegable de usuario)

  return (
    <header className="clean-header">
      <div className="clean-header-container">
        {/* Sección izquierda */}
        <div className="clean-header-left">
          {/* Botón hamburguesa */}
          <button
            onClick={onMenuClick}
            className="clean-hamburger-btn"
            title="Menú"
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Logo y título */}
          <div className="clean-brand">
            <div className="brand-logo">
              <img 
                src="/sena-logo.png" 
                alt="SENA" 
                className="logo-img"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="logo-fallback" style={{ display: 'none' }}>
                🏛️
              </div>
            </div>
            <div className="brand-text">
              <h1 className="brand-title poppins-font">SENA Bienes</h1>
            </div>
          </div>

          {/* Separador */}
          <div className="header-separator"></div>

          {/* Título de página */}
          <div className="page-info">
            <h2 className="page-title poppins-font">{getPageTitle()}</h2>
          </div>
        </div>

        {/* Sección derecha */}
        <div className="clean-header-right">
          {/* Hora actual */}
          <div className="current-time">
            <span className="time-text">{formatTime()}</span>
          </div>

          {/* Controles */}
          <div className="header-controls">
            {/* Selector de idioma */}
            <LanguageSelector />

            {/* Botón de reportes */}
            <button
              onClick={() => setShowReportExporter(true)}
              className="control-btn"
              title="Exportar Reportes"
            >
              <span className="btn-icon">📊</span>
            </button>

            {/* Toggle de tema */}
            <button
              onClick={toggleTheme}
              className="control-btn theme-btn"
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              <span className="btn-icon theme-icon">
                {isDark ? '☀️' : '🌙'}
              </span>
            </button>

            {/* Notificaciones */}
            <NotificationCenter />
          </div>
        </div>
      </div>

      {/* Modales */}
      <ReportExporter 
        isOpen={showReportExporter}
        onClose={() => setShowReportExporter(false)}
      />
      
      <FontSelector 
        isOpen={showFontSelector}
        onClose={() => setShowFontSelector(false)}
      />
    </header>
  )
}

export default CleanHeader