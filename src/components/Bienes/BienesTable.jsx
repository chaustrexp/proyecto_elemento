import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { useNotifications } from '../../hooks/useNotifications'
import { useTranslation } from '../../hooks/useTranslation'
import '../../assets/css/CleanTable.css'

const BienesTable = ({ onEdit }) => {
  const { bienes, desasignarBien } = useData()
  const notifications = useNotifications()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState('todos')

  const filteredBienes = bienes.filter(bien => {
    const matchesSearch = 
      bien.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bien.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bien.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesEstado = filterEstado === 'todos' || bien.estado === filterEstado

    return matchesSearch && matchesEstado
  })

  const handleDesasignar = (bien) => {
    if (window.confirm(`${t('bienes.confirmarDesasignar')} ${bien.codigo}?`)) {
      desasignarBien(bien.id)
      notifications.success(t('notifications.bienDesasignado'))
    }
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      disponible: {
        className: 'clean-badge clean-badge-green',
        label: t('bienes.disponible')
      },
      asignado: {
        className: 'clean-badge clean-badge-blue',
        label: t('bienes.asignado')
      },
      mantenimiento: {
        className: 'clean-badge clean-badge-yellow',
        label: t('bienes.mantenimiento')
      },
      baja: {
        className: 'clean-badge clean-badge-red',
        label: t('bienes.baja')
      }
    }
    const badge = badges[estado] || badges.disponible
    return (
      <span className={badge.className}>
        {badge.label}
      </span>
    )
  }

  return (
    <div className="clean-table-container">
      {/* Filtros */}
      <div className="clean-table-filters">
        <div className="clean-table-filters-row">
          <input
            type="text"
            placeholder={t('bienes.buscar')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="clean-table-search"
          />
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="clean-table-select"
          >
            <option value="todos">{t('bienes.todosEstados')}</option>
            <option value="disponible">{t('bienes.disponible')}</option>
            <option value="asignado">{t('bienes.asignado')}</option>
            <option value="mantenimiento">{t('bienes.mantenimiento')}</option>
            <option value="baja">{t('bienes.baja')}</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="clean-table-wrapper">
        <table className="clean-table">
          <thead className="clean-table-head">
            <tr>
              <th className="clean-table-th">{t('bienes.modelo')}</th>
              <th className="clean-table-th">{t('bienes.descripcion')}</th>
              <th className="clean-table-th">{t('bienes.serial')}</th>
              <th className="clean-table-th">{t('bienes.estado')}</th>
              <th className="clean-table-th">{t('bienes.costo')}</th>
              <th className="clean-table-th">{t('bienes.sede')}</th>
              <th className="clean-table-th">{t('bienes.acciones')}</th>
            </tr>
          </thead>
          <tbody className="clean-table-body">
            {filteredBienes.length === 0 ? (
              <tr>
                <td colSpan="7" className="clean-table-empty">
                  {t('bienes.noEncontrados')}
                </td>
              </tr>
            ) : (
              filteredBienes.map((bien) => (
                <tr key={bien.id} className="clean-table-row">
                  <td className="clean-table-td clean-table-td-primary">
                    {bien.codigo}
                  </td>
                  <td className="clean-table-td">
                    {bien.descripcion}
                  </td>
                  <td className="clean-table-td clean-table-td-secondary">
                    {bien.categoria}
                  </td>
                  <td className="clean-table-td">
                    {getEstadoBadge(bien.estado)}
                  </td>
                  <td className="clean-table-td clean-table-td-number">
                    {bien.valor ? `$${bien.valor.toLocaleString()}` : '-'}
                  </td>
                  <td className="clean-table-td">
                    <div>{bien.ubicacion}</div>
                    {bien.cuentadante && (
                      <div className="clean-table-info-secondary">
                        {t('bienes.asignadoA')}: {bien.cuentadante}
                      </div>
                    )}
                  </td>
                  <td className="clean-table-td">
                    <div className="clean-table-actions">
                      <button
                        onClick={() => onEdit(bien)}
                        className="clean-action-btn clean-action-btn-primary"
                      >
                        {t('bienes.editar')}
                      </button>
                      {bien.estado === 'asignado' && (
                        <button
                          onClick={() => handleDesasignar(bien)}
                          className="clean-action-btn clean-action-btn-danger"
                        >
                          {t('bienes.desasignar')}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="clean-table-pagination">
        <p className="clean-table-pagination-text">
          {t('bienes.mostrando')} {filteredBienes.length} {t('bienes.de')} {bienes.length} {t('sidebar.bienes').toLowerCase()}
        </p>
      </div>
    </div>
  )
}

export default BienesTable