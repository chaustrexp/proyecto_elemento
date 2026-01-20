/**
 * ============================================
 * REPORT EXPORTER - Sistema de exportación de reportes
 * ============================================
 */

import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { useTranslation } from '../../hooks/useTranslation'
import { useNotifications } from '../../hooks/useNotifications'
import '../../assets/css/ReportExporter.css'

const ReportExporter = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const { bienes, cuentadantes, movimientos } = useData()
  const notifications = useNotifications()
  
  const [reportType, setReportType] = useState('bienes')
  const [format, setFormat] = useState('excel')
  const [dateRange, setDateRange] = useState('all')
  const [customDateFrom, setCustomDateFrom] = useState('')
  const [customDateTo, setCustomDateTo] = useState('')
  const [filters, setFilters] = useState({
    includeInactive: false,
    includeImages: false,
    groupByCategory: false
  })
  const [isExporting, setIsExporting] = useState(false)

  const reportTypes = [
    {
      id: 'bienes',
      name: 'Inventario de Bienes',
      description: 'Listado completo de todos los bienes registrados',
      icon: '💻',
      fields: ['Código', 'Nombre', 'Categoría', 'Estado', 'Ubicación', 'Responsable']
    },
    {
      id: 'asignaciones',
      name: 'Reporte de Asignaciones',
      description: 'Historial de asignaciones y movimientos',
      icon: '📋',
      fields: ['Fecha', 'Bien', 'Responsable Anterior', 'Nuevo Responsable', 'Observaciones']
    },
    {
      id: 'personas',
      name: 'Directorio de Personas',
      description: 'Listado de cuentadantes y responsables',
      icon: '👥',
      fields: ['Nombre', 'Documento', 'Cargo', 'Área', 'Contacto']
    },
    {
      id: 'estadisticas',
      name: 'Estadísticas del Sistema',
      description: 'Métricas y análisis de uso del sistema',
      icon: '📊',
      fields: ['Período', 'Total Bienes', 'Entradas', 'Salidas', 'Asignaciones']
    }
  ]

  const formats = [
    { id: 'excel', name: 'Excel (.xlsx)', icon: '📊', description: 'Formato de hoja de cálculo' },
    { id: 'pdf', name: 'PDF (.pdf)', icon: '📄', description: 'Documento portable' },
    { id: 'csv', name: 'CSV (.csv)', icon: '📝', description: 'Valores separados por comas' },
    { id: 'json', name: 'JSON (.json)', icon: '🔧', description: 'Formato de datos estructurados' }
  ]

  const dateRanges = [
    { id: 'all', name: 'Todos los registros' },
    { id: 'today', name: 'Hoy' },
    { id: 'week', name: 'Última semana' },
    { id: 'month', name: 'Último mes' },
    { id: 'quarter', name: 'Último trimestre' },
    { id: 'year', name: 'Último año' },
    { id: 'custom', name: 'Rango personalizado' }
  ]

  const generateExcelData = (data, type) => {
    // Simulación de generación de Excel
    const headers = reportTypes.find(rt => rt.id === type)?.fields || []
    const rows = data.map(item => {
      switch (type) {
        case 'bienes':
          return [
            item.codigo || `BIEN-${item.id}`,
            item.nombre || 'Sin nombre',
            item.categoria || 'Sin categoría',
            item.estado || 'Activo',
            item.ubicacion || 'Sin ubicación',
            item.responsable || 'Sin asignar'
          ]
        case 'personas':
          return [
            item.nombre,
            item.cedula || item.pers_documento,
            item.cargo,
            item.area || item.pers_direccion,
            item.correo || item.pers_correo
          ]
        case 'asignaciones':
          return [
            new Date(item.fecha || Date.now()).toLocaleDateString(),
            item.bien_codigo || 'N/A',
            item.responsable_anterior || 'N/A',
            item.persona_nombre || 'N/A',
            item.observaciones || 'Sin observaciones'
          ]
        default:
          return Object.values(item)
      }
    })
    
    return { headers, rows }
  }

  const generatePDFData = (data, type) => {
    // Simulación de generación de PDF
    return {
      title: reportTypes.find(rt => rt.id === type)?.name || 'Reporte',
      subtitle: `Generado el ${new Date().toLocaleDateString()}`,
      data: generateExcelData(data, type)
    }
  }

  const filterDataByDateRange = (data) => {
    if (dateRange === 'all') return data
    
    const now = new Date()
    let startDate = new Date()
    
    switch (dateRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0)
        break
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      case 'custom':
        if (customDateFrom && customDateTo) {
          startDate = new Date(customDateFrom)
          const endDate = new Date(customDateTo)
          return data.filter(item => {
            const itemDate = new Date(item.fecha || item.created_at || Date.now())
            return itemDate >= startDate && itemDate <= endDate
          })
        }
        return data
      default:
        return data
    }
    
    return data.filter(item => {
      const itemDate = new Date(item.fecha || item.created_at || Date.now())
      return itemDate >= startDate
    })
  }

  const getDataForReport = () => {
    let data = []
    
    switch (reportType) {
      case 'bienes':
        data = bienes
        if (!filters.includeInactive) {
          data = data.filter(item => item.estado !== 'Inactivo')
        }
        break
      case 'personas':
        data = cuentadantes
        break
      case 'asignaciones':
        data = movimientos
        break
      case 'estadisticas':
        // Generar datos de estadísticas
        data = [
          {
            periodo: 'Último mes',
            totalBienes: bienes.length,
            entradas: Math.floor(Math.random() * 20),
            salidas: Math.floor(Math.random() * 15),
            asignaciones: movimientos.length
          }
        ]
        break
      default:
        data = []
    }
    
    return filterDataByDateRange(data)
  }

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      const data = getDataForReport()
      const timestamp = new Date().toISOString().split('T')[0]
      const reportName = reportTypes.find(rt => rt.id === reportType)?.name || 'Reporte'
      
      let content, filename, mimeType
      
      switch (format) {
        case 'excel':
          const excelData = generateExcelData(data, reportType)
          // Simulación de contenido Excel (en producción usar una librería como xlsx)
          content = `${excelData.headers.join('\t')}\n${excelData.rows.map(row => row.join('\t')).join('\n')}`
          filename = `${reportName}_${timestamp}.xlsx`
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          break
          
        case 'pdf':
          const pdfData = generatePDFData(data, reportType)
          // Simulación de contenido PDF (en producción usar jsPDF o similar)
          content = `${pdfData.title}\n${pdfData.subtitle}\n\n${pdfData.data.headers.join(' | ')}\n${pdfData.data.rows.map(row => row.join(' | ')).join('\n')}`
          filename = `${reportName}_${timestamp}.pdf`
          mimeType = 'application/pdf'
          break
          
        case 'csv':
          const csvData = generateExcelData(data, reportType)
          content = `${csvData.headers.join(',')}\n${csvData.rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')}`
          filename = `${reportName}_${timestamp}.csv`
          mimeType = 'text/csv'
          break
          
        case 'json':
          content = JSON.stringify(data, null, 2)
          filename = `${reportName}_${timestamp}.json`
          mimeType = 'application/json'
          break
          
        default:
          throw new Error('Formato no soportado')
      }
      
      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      downloadFile(content, filename, mimeType)
      
      notifications.success(
        'Reporte exportado',
        `El reporte "${reportName}" se ha exportado exitosamente`,
        5000
      )
      
      onClose()
      
    } catch (error) {
      console.error('Error al exportar:', error)
      notifications.error(
        'Error al exportar',
        'No se pudo generar el reporte. Inténtalo de nuevo.',
        6000
      )
    } finally {
      setIsExporting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="report-exporter-overlay">
      <div className="report-exporter-modal">
        <div className="report-exporter-header">
          <h2 className="report-exporter-title">
            📊 Exportar Reporte
          </h2>
          <button onClick={onClose} className="report-exporter-close">
            ✕
          </button>
        </div>

        <div className="report-exporter-content">
          {/* Tipo de Reporte */}
          <div className="report-section">
            <h3 className="report-section-title">Tipo de Reporte</h3>
            <div className="report-types-grid">
              {reportTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`report-type-card ${reportType === type.id ? 'selected' : ''}`}
                >
                  <div className="report-type-icon">{type.icon}</div>
                  <div className="report-type-content">
                    <div className="report-type-name">{type.name}</div>
                    <div className="report-type-description">{type.description}</div>
                    <div className="report-type-fields">
                      Campos: {type.fields.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formato */}
          <div className="report-section">
            <h3 className="report-section-title">Formato de Exportación</h3>
            <div className="format-selector">
              {formats.map(fmt => (
                <div
                  key={fmt.id}
                  onClick={() => setFormat(fmt.id)}
                  className={`format-option ${format === fmt.id ? 'selected' : ''}`}
                >
                  <div className="format-icon">{fmt.icon}</div>
                  <div className="format-content">
                    <div className="format-name">{fmt.name}</div>
                    <div className="format-description">{fmt.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rango de Fechas */}
          <div className="report-section">
            <h3 className="report-section-title">Rango de Fechas</h3>
            <div className="date-range-selector">
              {dateRanges.map(range => (
                <label key={range.id} className="date-range-option">
                  <input
                    type="radio"
                    name="dateRange"
                    value={range.id}
                    checked={dateRange === range.id}
                    onChange={(e) => setDateRange(e.target.value)}
                  />
                  <span className="date-range-label">{range.name}</span>
                </label>
              ))}
            </div>
            
            {dateRange === 'custom' && (
              <div className="custom-date-inputs">
                <div className="date-input-group">
                  <label>Desde:</label>
                  <input
                    type="date"
                    value={customDateFrom}
                    onChange={(e) => setCustomDateFrom(e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="date-input-group">
                  <label>Hasta:</label>
                  <input
                    type="date"
                    value={customDateTo}
                    onChange={(e) => setCustomDateTo(e.target.value)}
                    className="date-input"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Filtros Adicionales */}
          <div className="report-section">
            <h3 className="report-section-title">Opciones Adicionales</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.includeInactive}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    includeInactive: e.target.checked
                  }))}
                />
                <span>Incluir elementos inactivos</span>
              </label>
              
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.includeImages}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    includeImages: e.target.checked
                  }))}
                />
                <span>Incluir imágenes (solo PDF)</span>
              </label>
              
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.groupByCategory}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    groupByCategory: e.target.checked
                  }))}
                />
                <span>Agrupar por categoría</span>
              </label>
            </div>
          </div>
        </div>

        <div className="report-exporter-footer">
          <div className="report-preview-info">
            <span className="preview-count">
              {getDataForReport().length} registros seleccionados
            </span>
          </div>
          
          <div className="report-actions">
            <button onClick={onClose} className="report-btn report-btn-cancel">
              Cancelar
            </button>
            <button 
              onClick={handleExport} 
              disabled={isExporting}
              className="report-btn report-btn-export"
            >
              {isExporting ? (
                <>
                  <span className="export-spinner">⏳</span>
                  Exportando...
                </>
              ) : (
                <>
                  <span>📥</span>
                  Exportar Reporte
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportExporter