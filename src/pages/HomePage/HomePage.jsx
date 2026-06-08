import EmptyState from '@/components/molecules/EmptyState/EmptyState'
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout'
import { profile } from '../../services/auth.service'

function HomePage() {
  const getProfile = async () => {
    const response = await profile()
    return response.data
  }
  return (
    <DefaultLayout>
      <EmptyState
        title="Welcome to Trello Web"
        description="Atomic Design scaffolding is set up. Continue migrating components feature by feature."
        ctaLabel="Get started"
        onCtaClick={() => {
          getProfile()
        }}
      />
    </DefaultLayout>
  )
}

export default HomePage

