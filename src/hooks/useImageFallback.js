/**
 * ============================================
 * useImageFallback - Hook para manejar errores de imágenes
 * ============================================
 * 
 * Este hook proporciona funcionalidad para manejar errores de carga de imágenes
 * y mostrar fallbacks apropiados.
 */

import { useState, useCallback } from 'react'

/**
 * Hook para manejar fallbacks de imágenes
 * @param {string} fallbackSrc - URL de imagen de respaldo
 * @param {string} fallbackIcon - Icono emoji como último recurso
 * @returns {object} - Objeto con src actual y handler de error
 */
export const useImageFallback = (fallbackSrc = null, fallbackIcon = '🏛️') => {
  const [currentSrc, setCurrentSrc] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

  const handleImageError = useCallback((originalSrc) => {
    return (event) => {
      if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
        // Primer error: intentar con imagen de respaldo
        setCurrentSrc(fallbackSrc)
        setHasError(true)
        event.target.src = fallbackSrc
      } else {
        // Segundo error o no hay fallback: mostrar icono
        setShowIcon(true)
        event.target.style.display = 'none'
        
        // Buscar el contenedor padre y mostrar el fallback
        const parent = event.target.parentElement
        const fallbackElement = parent?.querySelector('.image-fallback')
        if (fallbackElement) {
          fallbackElement.style.display = 'flex'
        }
      }
    }
  }, [currentSrc, hasError, fallbackSrc])

  const getImageProps = useCallback((src) => {
    const actualSrc = currentSrc || src
    return {
      src: actualSrc,
      onError: handleImageError(src),
      style: showIcon ? { display: 'none' } : {}
    }
  }, [currentSrc, showIcon, handleImageError])

  const getFallbackProps = useCallback(() => {
    return {
      className: 'image-fallback',
      style: { 
        display: showIcon ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        fontSize: '2rem'
      },
      children: fallbackIcon
    }
  }, [showIcon, fallbackIcon])

  return {
    getImageProps,
    getFallbackProps,
    hasError: showIcon
  }
}

export default useImageFallback