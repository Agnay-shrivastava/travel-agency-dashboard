//@ts-nocheck
import { Header } from "../../../components"

const Dashboard = () => {
  const user = {user : 'Agnay'};
  return (
    <main className="dashboard wrapper">
      <Header
      title={`Welcome ${user?.name ?? 'Guest'} 👋`}
      description="Track activity , trends and popular destinations in real time" />
      Dashboard Page Contents
    </main>
  )
}

export default Dashboard