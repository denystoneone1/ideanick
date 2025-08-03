import { TrpcProvider } from './lib/trpc-provider'
import { AllIdeasPage } from './pages/AllIdeasPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

export default App
