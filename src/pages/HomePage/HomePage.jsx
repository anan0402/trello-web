import EmptyState from '@/components/molecules/EmptyState/EmptyState'
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout'

function HomePage() {
  return (
    <DefaultLayout>
      <EmptyState
        title="Welcome to Trello Web"
        description="Atomic Design scaffolding is set up. Continue migrating components feature by feature."
        ctaLabel="Get started"
        onCtaClick={() => {
          // TODO: 接上你的业务逻辑（比如路由跳转/打开弹窗）
        }}
      />
    </DefaultLayout>
  )
}

export default HomePage

