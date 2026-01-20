/**
 * ============================================
 * ENHANCED STATS CARDS - Tarjetas mejoradas con animaciones y gráficos
 * ============================================
 */

import { useState, useEffect } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import '../../assets/css/EnhancedStatsCards.css'

const EnhancedStatsCards = ({ stats }) => {
  const { t } = useTranslation()
  const [animatedStats, setAnimatedStats] = useState({
    totalBienes: 0,
    entradasHoy: 0,
    salidasHoy: 0,
    alertas: 0
  })

  // Animación de contadores
  useEffect(() => {
    const animateValue = (key, start, end, duration) => {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const current = Math.floor(start + (end - start) * progress)
        
        setAnimatedStats(prev => ({ ...prev, [key]: current }))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }

    Object.keys(stats).forEach((key, index) => {
      setTimeout(() => {
        animateValue(key, 0, stats[key], 1500)
      }, index * 200)
    })
  }, [stats])

  const cards = [
    {
      title: t('dashboard.totalBienes') || 'Total Bienes',
      value: animatedStats.totalBienes,
      icon: '💻',
      color: 'blue',
      description: t('dashboard.bienesRegistrados') || 'Bienes registrados en el sistema',
      trend: '+12%',
      trendUp: true,
      chart: 'line'
    },
    {
      title: t('dashboard.entradasHoy') || 'Entradas Hoy',
      value: animatedStats.entradasHoy,
      icon: '📥',
      color: 'green',
      description: t('dashboard.nuevosIngresos') || 'Nuevos ingresos del día',
      trend: '+5%',
      trendUp: true,
      chart: 'bar'
    },
    {
      title: t('dashboard.salidasHoy') || 'Salidas Hoy',
      value: animatedStats.salidasHoy,
      icon: '📤',
      color: 'orange',
      description: t('dashboard.asignacionesRealizadas') || 'Asignaciones realizadas hoy',
      trend: '-2%',
      trendUp: false,
      chart: 'area'
    },
    {
      title: t('dashboard.alertas') || 'Alertas',
      value: animatedStats.alertas,
      icon: '⚠️',
      color: 'red',
      description: t('dashboard.notificacionesPendientes') || 'Notificaciones pendientes',
      trend: '+8%',
      trendUp: false,
      chart: 'donut'
    }
  ]

  const MiniChart = ({ type, color }) => {
    const generateData = () => {
      return Array.from({ length: 7 }, () => Math.random() * 100)
    }

    const data = generateData()
    const max = Math.max(...data)

    switch (type) {
      case 'line':
        const points = data.map((value, index) => 
          `${(index / (data.length - 1)) * 60},${60 - (value / max) * 40}`
        ).join(' ')
        
        return (
          <svg className="mini-chart" viewBox="0 0 60 60">
            <polyline
              points={points}
              fill="none"
              stroke={`var(--color-${color})`}
              strokeWidth="2"
              className="chart-line"
            />
            {data.map((value, index) => (
              <circle
                key={index}
                cx={(index / (data.length - 1)) * 60}
                cy={60 - (value / max) * 40}
                r="2"
                fill={`var(--color-${color})`}
                className="chart-point"
              />
            ))}
          </svg>
        )

      case 'bar':
        return (
          <svg className="mini-chart" viewBox="0 0 60 60">
            {data.map((value, index) => (
              <rect
                key={index}
                x={index * 8}
                y={60 - (value / max) * 50}
                width="6"
                height={(value / max) * 50}
                fill={`var(--color-${color})`}
                className="chart-bar"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </svg>
        )

      case 'area':
        const areaPoints = data.map((value, index) => 
          `${(index / (data.length - 1)) * 60},${60 - (value / max) * 40}`
        ).join(' ')
        
        return (
          <svg className="mini-chart" viewBox="0 0 60 60">
            <polygon
              points={`0,60 ${areaPoints} 60,60`}
              fill={`var(--color-${color})`}
              opacity="0.3"
              className="chart-area"
            />
            <polyline
              points={areaPoints}
              fill="none"
              stroke={`var(--color-${color})`}
              strokeWidth="2"
              className="chart-line"
            />
          </svg>
        )

      case 'donut':
        const percentage = (data[0] / max) * 100
        const circumference = 2 * Math.PI * 18
        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
        
        return (
          <svg className="mini-chart" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="4"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke={`var(--color-${color})`}
              strokeWidth="4"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="chart-donut"
              transform="rotate(-90 20 20)"
            />
          </svg>
        )

      default:
        return null
    }
  }

  return (
    <div className="enhanced-stats-grid">
      {cards.map((card, index) => (
        <div 
          key={card.title} 
          className={`enhanced-stats-card enhanced-stats-card-${card.color}`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="enhanced-stats-header">
            <div className="enhanced-stats-icon">
              {card.icon}
            </div>
            <div className="enhanced-stats-chart">
              <MiniChart type={card.chart} color={card.color} />
            </div>
          </div>
          
          <div className="enhanced-stats-content">
            <div className="enhanced-stats-value">
              {card.value.toLocaleString()}
            </div>
            <div className="enhanced-stats-title">
              {card.title}
            </div>
            <div className="enhanced-stats-description">
              {card.description}
            </div>
          </div>
          
          <div className="enhanced-stats-footer">
            <div className={`enhanced-stats-trend ${card.trendUp ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-icon">
                {card.trendUp ? '↗' : '↘'}
              </span>
              <span className="trend-value">
                {card.trend}
              </span>
            </div>
            <div className="enhanced-stats-period">
              {t('dashboard.ultimoMes') || 'Último mes'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EnhancedStatsCards