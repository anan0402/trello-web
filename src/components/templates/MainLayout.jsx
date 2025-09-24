import Text from '../atoms/Text'

function MainLayout({ children }) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <Text as="h1">Trello Web</Text>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default MainLayout


