/**
 * ============================================
 * GLOBAL SEARCH - Sistema de búsqueda global avanzado
 * ============================================
 */

import { useState, useEffect, useRef } from 'react'
import { useData } from '../../contexts/DataContext'
import { useTranslation } from '../../hooks/useTranslation'
import '../../assets/css/GlobalSearch.css'

const GlobalSearch = ({ onResultSelect, onViewChange }) => {
  const { t } = useTranslation()
  const { bienes, cuentadantes, movimientos } = useData()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [filters, setFilters] = useState({
    bienes: true,
    personas: true,
    asignaciones: true
  })
  const [searchHistory, setSearchHistory] = useState([])
  
  const searchRef = useRef(null)
  const resultsRef = useRef(null)

  // Cargar historial del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    }
  }, [])

  // Búsqueda en tiempo real
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setSelectedIndex(-1)
      return
    }

    const searchResults = []
    const queryLower = query.toLowerCase()

    // Buscar en bienes
    if (filters.bienes) {
      bienes.forEach(bien => {
        const score = calculateRelevanceScore(bien, queryLower, 'bien')
        if (score > 0) {
          searchResults.push({
            id: `bien-${bien.id}`,
            type: 'bien',
            title: bien.nombre || bien.codigo,
            subtitle: `${bien.codigo} - ${bien.categoria}`,
            description: bien.descripcion,
            score,
            data: bien,
            icon: '💻'
          })
        }
      })
    }

    // Buscar en personas
    if (filters.personas) {
      cuentadantes.forEach(persona => {
        const score = calculateRelevanceScore(persona, queryLower, 'persona')
        if (score > 0) {
          searchResults.push({
            id: `persona-${persona.id}`,
            type: 'persona',
            title: persona.nombre,
            subtitle: `${persona.cedula} - ${persona.cargo}`,
            description: persona.area,
            score,
            data: persona,
            icon: '👤'
          })
        }
      })
    }

    // Buscar en asignaciones
    if (filters.asignaciones) {
      movimientos.forEach(asignacion => {
        const score = calculateRelevanceScore(asignacion, queryLower, 'asignacion')
        if (score > 0) {
          searchResults.push({
            id: `asignacion-${asignacion.id}`,
            type: 'asignacion',
            title: `Asignación ${asignacion.id}`,
            subtitle: `${asignacion.bien_codigo} → ${asignacion.persona_nombre}`,
            description: new Date(asignacion.fecha).toLocaleDateString(),
            score,
            data: asignacion,
            icon: '📋'
          })
        }
      })
    }

    // Ordenar por relevancia
    searchResults.sort((a, b) => b.score - a.score)
    setResults(searchResults.slice(0, 10)) // Limitar a 10 resultados
    setSelectedIndex(-1)
  }, [query, filters, bienes, cuentadantes, movimientos])

  const calculateRelevanceScore = (item, query, type) => {
    let score = 0
    
    const searchFields = {
      bien: ['codigo', 'nombre', 'categoria', 'descripcion', 'marca', 'modelo'],
      persona: ['nombre', 'cedula', 'cargo', 'area', 'correo'],
      asignacion: ['bien_codigo', 'persona_nombre', 'observaciones']
    }

    const fields = searchFields[type] || []
    
    fields.forEach(field => {
      const value = String(item[field] || '').toLowerCase()
      
      if (value.includes(query)) {
        // Coincidencia exacta al inicio = mayor puntuación
        if (value.startsWith(query)) {
          score += 10
        }
        // Coincidencia exacta en cualquier parte
        else if (value === query) {
          score += 8
        }
        // Coincidencia parcial
        else {
          score += 5
        }
        
        // Bonus por campo importante
        if (['codigo', 'nombre', 'cedula'].includes(field)) {
          score += 3
        }
      }
    })

    return score
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length >= 2)
  }

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleResultClick(results[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleResultClick = (result) => {
    // Agregar al historial
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))

    // Navegar a la vista correspondiente
    switch (result.type) {
      case 'bien':
        onViewChange('bienes')
        break
      case 'persona':
        onViewChange('personas')
        break
      case 'asignacion':
        onViewChange('asignaciones')
        break
    }

    // Callback opcional para manejar la selección
    if (onResultSelect) {
      onResultSelect(result)
    }

    setIsOpen(false)
    setQuery('')
  }

  const toggleFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }))
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const handleHistoryClick = (historyQuery) => {
    setQuery(historyQuery)
    setIsOpen(true)
  }

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="global-search" ref={searchRef}>
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder={t('search.placeholder') || 'Buscar bienes, personas, asignaciones...'}
            className="search-input"
          />
          {query && (
            <button onClick={clearSearch} className="search-clear">
              ✕
            </button>
          )}
        </div>
        
        <div className="search-filters">
          {Object.entries(filters).map(([key, enabled]) => (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={`filter-btn ${enabled ? 'active' : ''}`}
            >
              {key === 'bienes' && '💻'}
              {key === 'personas' && '👤'}
              {key === 'asignaciones' && '📋'}
              <span className="filter-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="search-results" ref={resultsRef}>
          {query.length < 2 && searchHistory.length > 0 && (
            <div className="search-section">
              <div className="search-section-title">
                🕒 Búsquedas recientes
              </div>
              {searchHistory.map((historyQuery, index) => (
                <div
                  key={index}
                  onClick={() => handleHistoryClick(historyQuery)}
                  className="search-history-item"
                >
                  <span className="history-icon">🔍</span>
                  <span className="history-query">{historyQuery}</span>
                </div>
              ))}
            </div>
          )}

          {results.length > 0 && (
            <div className="search-section">
              <div className="search-section-title">
                📊 Resultados ({results.length})
              </div>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`search-result-item ${
                    index === selectedIndex ? 'selected' : ''
                  }`}
                >
                  <div className="result-icon">{result.icon}</div>
                  <div className="result-content">
                    <div className="result-title">{result.title}</div>
                    <div className="result-subtitle">{result.subtitle}</div>
                    {result.description && (
                      <div className="result-description">{result.description}</div>
                    )}
                  </div>
                  <div className="result-type">
                    {result.type}
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && (
            <div className="search-no-results">
              <div className="no-results-icon">🔍</div>
              <div className="no-results-title">Sin resultados</div>
              <div className="no-results-subtitle">
                No se encontraron elementos que coincidan con "{query}"
              </div>
            </div>
          )}

          <div className="search-footer">
            <div className="search-shortcuts">
              <span className="shortcut">↑↓ Navegar</span>
              <span className="shortcut">↵ Seleccionar</span>
              <span className="shortcut">Esc Cerrar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalSearch