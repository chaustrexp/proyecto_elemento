import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import '../../assets/css/CleanTable.css'

const AsignacionesTable = () => {
  const { movimientos } = useData()
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar solo movimientos de asignación
  const asignaciones = movimientos.filter(m => m.tipo === 'asignacion')

  // Filtrar por búsqueda
  const filteredAsignaciones = asignaciones.filter(asignacion =>
    asignacion.cuentadante?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asignacion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asignacion.bienesInfo?.some(info => info.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="clean-table-container">
      {/* Filtros */}
      <div className="clean-table-filters">
        <div className="clean-table-filters-row">
          <input
            type="text"
            placeholder="Buscar asignaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="clean-table-search"
          />
          <div className="clean-table-info-secondary">
            {filteredAsignaciones.length} asignación(es) registrada(s)
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="clean-table-wrapper">
        {filteredAsignaciones.length === 0 ? (
          <div className="clean-table-empty">
            {asignaciones.length === 0 
              ? 'No hay asignaciones registradas'
              : 'No se encontraron asignaciones con ese criterio de búsqueda'
            }
          </div>
        ) : (
          <table className="clean-table">
            <thead className="clean-table-head">
              <tr>
                <th className="clean-table-th">Fecha</th>
                <th className="clean-table-th">Cuentadante</th>
                <th className="clean-table-th">Bienes</th>
                <th className="clean-table-th">Descripción</th>
                <th className="clean-table-th">Estado</th>
              </tr>
            </thead>
            <tbody className="clean-table-body">
              {filteredAsignaciones.map((asignacion) => (
                <tr key={asignacion.id} className="clean-table-row">
                  <td className="clean-table-td clean-table-td-secondary">
                    {formatDate(asignacion.fecha)}
                  </td>
                  <td className="clean-table-td clean-table-td-primary">
                    {asignacion.cuentadante}
                    {asignacion.cuentadanteInfo && (
                      <div className="clean-table-info-secondary">
                        CC: {asignacion.cuentadanteInfo.cedula}
                      </div>
                    )}
                  </td>
                  <td className="clean-table-td">
                    <span className="clean-badge clean-badge-blue">
                      {asignacion.bienes.length} bien(es)
                    </span>
                    {asignacion.bienesInfo && asignacion.bienesInfo.length > 0 && (
                      <div className="clean-table-info-secondary">
                        {asignacion.bienesInfo[0]}
                        {asignacion.bienesInfo.length > 1 && ` y ${asignacion.bienesInfo.length - 1} más`}
                      </div>
                    )}
                  </td>
                  <td className="clean-table-td clean-table-td-secondary">
                    {asignacion.descripcion}
                  </td>
                  <td className="clean-table-td">
                    <span className="clean-badge clean-badge-green">
                      Completada
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación */}
      <div className="clean-table-pagination">
        <p className="clean-table-pagination-text">
          Mostrando {filteredAsignaciones.length} de {asignaciones.length} asignaciones
        </p>
      </div>
    </div>
  )
}

export default AsignacionesTable