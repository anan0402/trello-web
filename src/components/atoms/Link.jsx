import React from "react"
import { Link as RouterLink } from 'react-router-dom'

function Link({ to, children, className = '' }) {
  return (
    <RouterLink to={to} className={className}>
      {children}
    </RouterLink>
  )
}

export default React.memo(Link)

