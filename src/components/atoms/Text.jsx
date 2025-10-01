import React from "react"

function Text({ children, as: Component = 'span', className = '' }) {
  return (
    <Component className={className}>{children}</Component>
  )
}

export default React.memo(Text)


