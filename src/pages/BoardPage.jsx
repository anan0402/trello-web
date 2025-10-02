import { useParams } from 'react-router-dom'
import BoardBar from '../components/organisms/BoardBar'
import MainLayout from '../components/templates/MainLayout'

function BoardPage() {
  const { id } = useParams()

  return (
    <MainLayout>
      <BoardBar boardId={id} />
    </MainLayout>
  )
}

export default BoardPage


