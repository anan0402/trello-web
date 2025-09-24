import Card from '../molecules/Card'
import Text from '../atoms/Text'

function Board() {
  return (
    <div>
      <Text as="h2">Board</Text>
      <div style={{ display: 'grid', gap: 12 }}>
        <Card><Text>Card item 1</Text></Card>
        <Card><Text>Card item 2</Text></Card>
      </div>
    </div>
  )
}

export default Board


