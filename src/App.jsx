import AppRoutes from './Layout/Approutes'
import { CarFilterProvider } from './Pages/CarFilterContext'

function App() {
   return (
    <>
    <CarFilterProvider>
    <AppRoutes/>
    </CarFilterProvider>
    </>
  ) 
}

export default App
