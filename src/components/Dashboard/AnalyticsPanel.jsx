/**
 * ============================================
 * ANALYTICS PANEL - Panel de análisis con gráficos avanzados
 * ============================================
 */

import { useState, useEffect } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { useData } from '../../contexts/DataContext'
import '../../assets/css/AnalyticsPanel.css'

const AnalyticsPanel = () => {
  const { t } = useTranslation()
  const { stats } = useData()
  const [timeRange, setTimeRange] = useState('7d')
  const [activeChart, setActiveChart] = useState('overview')

  // Datos simulados para gráficos
  const generateChartData = (days) => {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      entradas: Math.floor(Math.random() * 20) + 5,
      salidas: Math.floor(Math.random() * 15) + 3,
      mantenimiento: Math.floor(Math.random() * 5),
      alertas: Math.floor(Math.random() * 8)
    }))
  }

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    setChartData(generateChartData(days))
  }, [timeRange])

  const LineChart = ({ data, metric, color }) => {
    const maxValue = Math.max(...data.map(d => d[metric]))
    const points = data.map((item, index) => 
      `${(index / (data.length - 1)) * 300},${150 - (item[metric] / maxValue) * 120}`
    ).join(' ')

    return (
      <div className="chart-container">
        <svg className="line-chart" viewBox="0 0 300 150">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={30 + i * 30}
              x2="300"
              y2={30 + i * 30}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Area fill */}
          <polygon
            points={`0,150 ${points} 300,150`}
            fill={color}
            opacity="0.1"
            className="chart-area-fill"
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chart-line-path"
          />
          
          {/* Data points */}
          {data.map((item, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 300}
              cy={150 - (item[metric] / maxValue) * 120}
              r="4"
              fill={color}
              className="chart-point-dot"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="chart-labels">
          {data.map((item, index) => (
            <span key={index} className="chart-label">
              {item.date.split('/')[0]}/{item.date.split('/')[1]}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const BarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.entradas, d.salidas)))
    
    return (
      <div className="chart-container">
        <svg className="bar-chart" viewBox="0 0 300 150">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={30 + i * 30}
              x2="300"
              y2={30 + i * 30}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Bars */}
          {data.map((item, index) => {
            const x = (index / data.length) * 300 + 10
            const barWidth = (300 / data.length) * 0.6
            const entradasHeight = (item.entradas / maxValue) * 120
            const salidasHeight = (item.salidas / maxValue) * 120
            
            return (
              <g key={index}>
                {/* Entradas bar */}
                <rect
                  x={x}
                  y={150 - entradasHeight}
                  width={barWidth / 2 - 2}
                  height={entradasHeight}
                  fill="var(--color-green)"
                  className="chart-bar-rect"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
                
                {/* Salidas bar */}
                <rect
                  x={x + barWidth / 2}
                  y={150 - salidasHeight}
                  width={barWidth / 2 - 2}
                  height={salidasHeight}
                  fill="var(--color-orange)"
                  className="chart-bar-rect"
                  style={{ animationDelay: `${index * 100 + 50}ms` }}
                />
              </g>
            )
          })}
        </svg>
        
        <div className="chart-labels">
          {data.map((item, index) => (
            <span key={index} className="chart-label">
              {item.date.split('/')[0]}/{item.date.split('/')[1]}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const DonutChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = 0
    
    return (
      <div className="donut-chart-container">
        <svg className="donut-chart" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const angle = (item.value / total) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            
            const x1 = 100 + 70 * Math.cos((startAngle - 90) * Math.PI / 180)
            const y1 = 100 + 70 * Math.sin((startAngle - 90) * Math.PI / 180)
            const x2 = 100 + 70 * Math.cos((endAngle - 90) * Math.PI / 180)
            const y2 = 100 + 70 * Math.sin((endAngle - 90) * Math.PI / 180)
            
            const largeArcFlag = angle > 180 ? 1 : 0
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ')
            
            currentAngle += angle
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="donut-segment"
                style={{ animationDelay: `${index * 200}ms` }}
              />
            )
          })}
          
          {/* Center circle */}
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="white"
            className="donut-center"
          />
          
          {/* Center text */}
          <text
            x="100"
            y="95"
            textAnchor="middle"
            className="donut-total-label"
          >
            Total
          </text>
          <text
            x="100"
            y="110"
            textAnchor="middle"
            className="donut-total-value"
          >
            {total}
          </text>
        </svg>
        
        <div className="donut-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const chartTypes = [
    { id: 'overview', name: 'Resumen', icon: '📊' },
    { id: 'movements', name: 'Movimientos', icon: '📈' },
    { id: 'distribution', name: 'Distribución', icon: '🥧' }
  ]

  const timeRanges = [
    { id: '7d', name: '7 días' },
    { id: '30d', name: '30 días' },
    { id: '90d', name: '90 días' }
  ]

  const distributionData = [
    { label: 'Computadores', value: 45, color: 'var(--color-blue)' },
    { label: 'Impresoras', value: 23, color: 'var(--color-green)' },
    { label: 'Mobiliario', value: 18, color: 'var(--color-orange)' },
    { label: 'Otros', value: 14, color: 'var(--color-red)' }
  ]

  return (
    <div className="analytics-panel">
      <div className="analytics-header">
        <h2 className="analytics-title">
          📊 {t('dashboard.analytics') || 'Analytics'}
        </h2>
        
        <div className="analytics-controls">
          <div className="chart-type-selector">
            {chartTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveChart(type.id)}
                className={`chart-type-btn ${activeChart === type.id ? 'active' : ''}`}
              >
                <span className="chart-type-icon">{type.icon}</span>
                <span className="chart-type-name">{type.name}</span>
              </button>
            ))}
          </div>
          
          <div className="time-range-selector">
            {timeRanges.map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`time-range-btn ${timeRange === range.id ? 'active' : ''}`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-content">
        {activeChart === 'overview' && (
          <div className="chart-grid">
            <div className="chart-card">
              <h3 className="chart-card-title">Entradas de Bienes</h3>
              <LineChart 
                data={chartData} 
                metric="entradas" 
                color="var(--color-green)" 
              />
            </div>
            
            <div className="chart-card">
              <h3 className="chart-card-title">Salidas de Bienes</h3>
              <LineChart 
                data={chartData} 
                metric="salidas" 
                color="var(--color-orange)" 
              />
            </div>
          </div>
        )}

        {activeChart === 'movements' && (
          <div className="chart-card chart-card-full">
            <h3 className="chart-card-title">Comparación Entradas vs Salidas</h3>
            <BarChart data={chartData} />
            <div className="chart-legend-horizontal">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'var(--color-green)' }}></div>
                <span>Entradas</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'var(--color-orange)' }}></div>
                <span>Salidas</span>
              </div>
            </div>
          </div>
        )}

        {activeChart === 'distribution' && (
          <div className="chart-card chart-card-full">
            <h3 className="chart-card-title">Distribución por Tipo de Bien</h3>
            <DonutChart data={distributionData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsPanel