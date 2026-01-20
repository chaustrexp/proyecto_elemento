import { useState, useEffect } from 'react'
import { useNotifications } from '../../hooks/useNotifications'
import '../../assets/css/CleanTable.css'

const SedesTable = ({ onEdit }) => {
  const notifications = useNotifications()
  const [sedes, setSedes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSedes()
  }, [])

  const loadSedes = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/api/sedes')
      const data = await response.json()
      setSedes(data)
    } catch (error) {
      console.error('Error al cargar sedes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSedes = sedes.filter(sede => {
    return sede.sede_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="clean-table-container">
      {/* Filtros */}
      <div className="clean-table-filters">
        <div className="clean-table-filters-row">
          <input
            type="text"
            placeholder="Buscar sede..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="clean-table-search"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="clean-table-wrapper">
        <table className="clean-table">
          <thead className="clean-table-head">
            <tr>
              <th className="clean-table-th">ID</th>
              <th className="clean-table-th">Nombre de la Sede</th>
              <th className="clean-table-th">Acciones</th>
            </tr>
          </thead>
          <tbody className="clean-table-body">
            {loading ? (
              <tr>
                <td colSpan="3" className="clean-table-empty">
                  Cargando sedes...
                </td>
              </tr>
            ) : filteredSedes.length === 0 ? (
              <tr>
                <td colSpan="3" className="clean-table-empty">
                  No se encontraron sedes
                </td>
              </tr>
            ) : (
              filteredSedes.map((sede) => (
                <tr key={sede.sede_id} className="clean-table-row">
                  <td className="clean-table-td clean-table-td-secondary">
                    #{sede.sede_id}
                  </td>
                  <td className="clean-table-td clean-table-td-primary">
                    {sede.sede_nombre}
                  </td>
                  <td className="clean-table-td">
                    <button
                      onClick={() => onEdit(sede)}
                      className="clean-action-btn clean-action-btn-primary"
                    >
                      Editar
                    </button>
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
          Mostrando {filteredSedes.length} de {sedes.length} sedes
        </p>
      </div>
    </div>
  )
}

export default SedesTable