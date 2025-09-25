import { useParams } from 'react-router-dom'
import MainLayout from '../components/templates/MainLayout'
import BoardBar from '../components/organisms/BoardBar'
import Board from '../components/organisms/Board'

function BoardPage() {
  const { id } = useParams()

  return (
    <MainLayout>
      {/* <BoardBar boardId={id} /> */}
    </MainLayout>
  )
}

export default BoardPage


