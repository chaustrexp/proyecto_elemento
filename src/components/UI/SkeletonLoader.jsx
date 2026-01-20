/**
 * ============================================
 * SKELETON LOADER - Componente de carga con esqueletos
 * ============================================
 */

import '../../assets/css/SkeletonLoader.css'

const SkeletonLoader = ({ 
  type = 'card', 
  count = 1, 
  height = 'auto',
  width = '100%',
  className = '' 
}) => {
  
  const CardSkeleton = () => (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-circle"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line skeleton-line-title"></div>
          <div className="skeleton-line skeleton-line-subtitle"></div>
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-line-full"></div>
        <div className="skeleton-line skeleton-line-medium"></div>
        <div className="skeleton-line skeleton-line-small"></div>
      </div>
    </div>
  )

  const TableSkeleton = () => (
    <div className="skeleton-table">
      <div className="skeleton-table-header">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-table-header-cell">
            <div className="skeleton-line skeleton-line-small"></div>
          </div>
        ))}
      </div>
      <div className="skeleton-table-body">
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div key={rowIndex} className="skeleton-table-row">
            {Array.from({ length: 4 }).map((_, cellIndex) => (
              <div key={cellIndex} className="skeleton-table-cell">
                <div className="skeleton-line skeleton-line-medium"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  const StatsSkeleton = () => (
    <div className="skeleton-stats-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton-stats-card">
          <div className="skeleton-stats-header">
            <div className="skeleton-circle skeleton-stats-icon"></div>
            <div className="skeleton-stats-chart">
              <div className="skeleton-line skeleton-line-chart"></div>
            </div>
          </div>
          <div className="skeleton-stats-content">
            <div className="skeleton-line skeleton-line-number"></div>
            <div className="skeleton-line skeleton-line-title"></div>
            <div className="skeleton-line skeleton-line-subtitle"></div>
          </div>
        </div>
      ))}
    </div>
  )

  const ChartSkeleton = () => (
    <div className="skeleton-chart">
      <div className="skeleton-chart-header">
        <div className="skeleton-line skeleton-line-title"></div>
        <div className="skeleton-chart-controls">
          <div className="skeleton-pill"></div>
          <div className="skeleton-pill"></div>
          <div className="skeleton-pill"></div>
        </div>
      </div>
      <div className="skeleton-chart-content">
        <div className="skeleton-chart-bars">
          {Array.from({ length: 7 }).map((_, i) => (
            <div 
              key={i} 
              className="skeleton-chart-bar"
              style={{ 
                height: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 100}ms`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )

  const ActivitySkeleton = () => (
    <div className="skeleton-activity">
      <div className="skeleton-activity-header">
        <div className="skeleton-line skeleton-line-title"></div>
        <div className="skeleton-circle skeleton-activity-toggle"></div>
      </div>
      <div className="skeleton-activity-filters">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-pill"></div>
        ))}
      </div>
      <div className="skeleton-activity-list">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-activity-item">
            <div className="skeleton-circle skeleton-activity-icon"></div>
            <div className="skeleton-activity-content">
              <div className="skeleton-line skeleton-line-title"></div>
              <div className="skeleton-line skeleton-line-medium"></div>
              <div className="skeleton-line skeleton-line-small"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const LineSkeleton = () => (
    <div 
      className={`skeleton-line ${className}`}
      style={{ height, width }}
    ></div>
  )

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <CardSkeleton />
      case 'table':
        return <TableSkeleton />
      case 'stats':
        return <StatsSkeleton />
      case 'chart':
        return <ChartSkeleton />
      case 'activity':
        return <ActivitySkeleton />
      case 'line':
        return <LineSkeleton />
      default:
        return <CardSkeleton />
    }
  }

  if (count === 1) {
    return renderSkeleton()
  }

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader