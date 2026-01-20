/**
 * ============================================
 * ACTIVITY FEED - Feed de actividad en tiempo real
 * ============================================
 */

import { useState, useEffect } from 'react'
import { useData } from '../../contexts/DataContext'
import { useTranslation } from '../../hooks/useTranslation'
import '../../assets/css/ActivityFeed.css'

const ActivityFeed = () => {
  const { t } = useTranslation()
  const { movimientos, bienes, cuentadantes } = useData()
  const [activities, setActivities] = useState([])
  const [filter, setFilter] = useState('all')
  const [isLive, setIsLive] = useState(true)

  // Generar actividades simuladas
  useEffect(() => {
    const generateActivities = () => {
      const activityTypes = [
        {
          type: 'bien_created',
          icon: '➕',
          color: 'green',
          title: 'Nuevo bien registrado',
          template: 'Se registró el bien {codigo} - {nombre}'
        },
        {
          type: 'bien_updated',
          icon: '✏️',
          color: 'blue',
          title: 'Bien actualizado',
          template: 'Se actualizó el bien {codigo}'
        },
        {
          type: 'asignacion_created',
          icon: '📋',
          color: 'orange',
          title: 'Nueva asignación',
          template: 'Se asignó {bien_codigo} a {persona_nombre}'
        },
        {
          type: 'persona_created',
          icon: '👤',
          color: 'purple',
          title: 'Nueva persona registrada',
          template: 'Se registró a {nombre} como {cargo}'
        },
        {
          type: 'maintenance_alert',
          icon: '⚠️',
          color: 'yellow',
          title: 'Alerta de mantenimiento',
          template: 'El bien {codigo} requiere mantenimiento'
        },
        {
          type: 'system_backup',
          icon: '💾',
          color: 'gray',
          title: 'Respaldo del sistema',
          template: 'Se realizó respaldo automático del sistema'
        }
      ]

      const newActivities = []
      const now = new Date()

      // Generar actividades de las últimas 24 horas
      for (let i = 0; i < 20; i++) {
        const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
        const timestamp = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000)
        
        let description = activityType.template
        let relatedData = {}

        // Reemplazar placeholders con datos reales
        if (bienes.length > 0) {
          const randomBien = bienes[Math.floor(Math.random() * bienes.length)]
          description = description.replace('{codigo}', randomBien.codigo || `BIEN-${randomBien.id}`)
          description = description.replace('{nombre}', randomBien.nombre || 'Equipo')
          relatedData.bien = randomBien
        }

        if (cuentadantes.length > 0) {
          const randomPersona = cuentadantes[Math.floor(Math.random() * cuentadantes.length)]
          description = description.replace('{persona_nombre}', randomPersona.nombre)
          description = description.replace('{nombre}', randomPersona.nombre)
          description = description.replace('{cargo}', randomPersona.cargo || 'Funcionario')
          relatedData.persona = randomPersona
        }

        if (movimientos.length > 0) {
          const randomMovimiento = movimientos[Math.floor(Math.random() * movimientos.length)]
          description = description.replace('{bien_codigo}', randomMovimiento.bien_codigo || 'BIEN-001')
        }

        newActivities.push({
          id: `activity-${i}`,
          type: activityType.type,
          icon: activityType.icon,
          color: activityType.color,
          title: activityType.title,
          description,
          timestamp,
          user: 'Sistema',
          relatedData,
          isNew: Math.random() > 0.7 // 30% de probabilidad de ser nueva
        })
      }

      return newActivities.sort((a, b) => b.timestamp - a.timestamp)
    }

    setActivities(generateActivities())

    // Simular nuevas actividades cada 30 segundos si está en modo live
    const interval = setInterval(() => {
      if (isLive) {
        setActivities(prev => {
          const newActivity = {
            id: `activity-${Date.now()}`,
            type: 'system_update',
            icon: '🔄',
            color: 'blue',
            title: 'Actualización del sistema',
            description: 'Se sincronizaron los datos del sistema',
            timestamp: new Date(),
            user: 'Sistema',
            relatedData: {},
            isNew: true
          }
          
          return [newActivity, ...prev.slice(0, 19)] // Mantener solo 20 actividades
        })
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [bienes, cuentadantes, movimientos, isLive])

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Ahora'
    if (minutes < 60) return `Hace ${minutes}m`
    if (hours < 24) return `Hace ${hours}h`
    return `Hace ${days}d`
  }

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true
    return activity.type.includes(filter)
  })

  const filters = [
    { id: 'all', name: 'Todas', icon: '📊' },
    { id: 'bien', name: 'Bienes', icon: '💻' },
    { id: 'asignacion', name: 'Asignaciones', icon: '📋' },
    { id: 'persona', name: 'Personas', icon: '👤' },
    { id: 'maintenance', name: 'Mantenimiento', icon: '⚠️' }
  ]

  return (
    <div className="activity-feed">
      <div className="activity-header">
        <div className="activity-title-section">
          <h3 className="activity-title">
            📈 Actividad Reciente
          </h3>
          <div className="activity-live-indicator">
            <div className={`live-dot ${isLive ? 'active' : ''}`}></div>
            <span className="live-text">
              {isLive ? 'En vivo' : 'Pausado'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => setIsLive(!isLive)}
          className={`live-toggle ${isLive ? 'active' : ''}`}
        >
          {isLive ? '⏸️' : '▶️'}
        </button>
      </div>

      <div className="activity-filters">
        {filters.map(filterOption => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`activity-filter ${filter === filterOption.id ? 'active' : ''}`}
          >
            <span className="filter-icon">{filterOption.icon}</span>
            <span className="filter-name">{filterOption.name}</span>
          </button>
        ))}
      </div>

      <div className="activity-list">
        {filteredActivities.map((activity, index) => (
          <div
            key={activity.id}
            className={`activity-item ${activity.isNew ? 'new' : ''}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`activity-icon activity-icon-${activity.color}`}>
              {activity.icon}
            </div>
            
            <div className="activity-content">
              <div className="activity-main">
                <div className="activity-item-title">{activity.title}</div>
                <div className="activity-timestamp">{getTimeAgo(activity.timestamp)}</div>
              </div>
              
              <div className="activity-description">
                {activity.description}
              </div>
              
              {activity.user && (
                <div className="activity-user">
                  Por {activity.user}
                </div>
              )}
            </div>

            {activity.isNew && (
              <div className="activity-new-badge">
                Nuevo
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="activity-empty">
          <div className="empty-icon">📭</div>
          <div className="empty-title">Sin actividad</div>
          <div className="empty-subtitle">
            No hay actividades que mostrar para el filtro seleccionado
          </div>
        </div>
      )}

      <div className="activity-footer">
        <button className="activity-view-all">
          Ver todas las actividades →
        </button>
      </div>
    </div>
  )
}

export default ActivityFeed