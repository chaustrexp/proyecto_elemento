import { useState, useEffect } from 'react'
import { useNotifications } from '../../hooks/useNotifications'
import '../../assets/css/CleanTable.css'

const RolesTable = ({ onEdit }) => {
  const notifications = useNotifications()
  const [roles, setRoles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/api/roles')
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      console.error('Error al cargar roles:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRoles = roles.filter(rol => {
    return rol.rol_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="clean-table-container">
      {/* Filtros */}
      <div className="clean-table-filters">
        <div className="clean-table-filters-row">
          <input
            type="text"
            placeholder="Buscar rol..."
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
              <th className="clean-table-th">Nombre del Rol</th>
              <th className="clean-table-th">Acciones</th>
            </tr>
          </thead>
          <tbody className="clean-table-body">
            {loading ? (
              <tr>
                <td colSpan="3" className="clean-table-empty">
                  Cargando roles...
                </td>
              </tr>
            ) : filteredRoles.length === 0 ? (
              <tr>
                <td colSpan="3" className="clean-table-empty">
                  No se encontraron roles
                </td>
              </tr>
            ) : (
              filteredRoles.map((rol) => (
                <tr key={rol.rol_id} className="clean-table-row">
                  <td className="clean-table-td clean-table-td-secondary">
                    #{rol.rol_id}
                  </td>
                  <td className="clean-table-td clean-table-td-primary">
                    {rol.rol_nombre}
                  </td>
                  <td className="clean-table-td">
                    <button
                      onClick={() => onEdit(rol)}
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
          Mostrando {filteredRoles.length} de {roles.length} roles
        </p>
      </div>
    </div>
  )
}

export default RolesTable