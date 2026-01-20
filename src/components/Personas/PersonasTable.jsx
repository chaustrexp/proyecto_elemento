import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { useTranslation } from '../../hooks/useTranslation'
import '../../assets/css/CleanTable.css'

const PersonasTable = ({ onEdit }) => {
  const { cuentadantes } = useData()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPersonas = cuentadantes.filter(persona => {
    return (
      persona.pers_nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.pers_apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.pers_documento?.toString().includes(searchTerm) ||
      persona.pers_telefono?.toString().includes(searchTerm)
    )
  })

  return (
    <div className="clean-table-container">
      {/* Filtros */}
      <div className="clean-table-filters">
        <div className="clean-table-filters-row">
          <input
            type="text"
            placeholder="Buscar persona..."
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
              <th className="clean-table-th">Documento</th>
              <th className="clean-table-th">Nombres</th>
              <th className="clean-table-th">Apellidos</th>
              <th className="clean-table-th">Teléfono</th>
              <th className="clean-table-th">Roles</th>
              <th className="clean-table-th">Acciones</th>
            </tr>
          </thead>
          <tbody className="clean-table-body">
            {filteredPersonas.length === 0 ? (
              <tr>
                <td colSpan="6" className="clean-table-empty">
                  No se encontraron personas
                </td>
              </tr>
            ) : (
              filteredPersonas.map((persona) => (
                <tr key={persona.id} className="clean-table-row">
                  <td className="clean-table-td clean-table-td-primary">
                    {persona.pers_tipodoc} {persona.pers_documento}
                  </td>
                  <td className="clean-table-td">
                    {persona.pers_nombres}
                  </td>
                  <td className="clean-table-td">
                    {persona.pers_apellidos}
                  </td>
                  <td className="clean-table-td clean-table-td-secondary">
                    {persona.pers_telefono}
                  </td>
                  <td className="clean-table-td">
                    <span className="clean-badge clean-badge-gray">
                      {persona.roles ? persona.roles.join(', ') : 'Sin rol'}
                    </span>
                  </td>
                  <td className="clean-table-td">
                    <button
                      onClick={() => onEdit(persona)}
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
          Mostrando {filteredPersonas.length} de {cuentadantes.length} personas
        </p>
      </div>
    </div>
  )
}

export default PersonasTable