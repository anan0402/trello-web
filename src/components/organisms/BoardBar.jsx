import Text from '../atoms/Text'

function BoardBar({ boardId }) {
  return (
    <div style={{ padding: '12px 0', marginBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
      <Text as="h2">Board #{boardId}</Text>
      {/* Add controls like filters, members, menu, etc. */}
    </div>
  )
}

export default BoardBar


