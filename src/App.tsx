import RouteCalculater from './containers/route-calculator'
import CommonLayout from './layouts/common/CommonLayout'

function App() {
  return (
    <CommonLayout>
      <h1>Delivery Service</h1>
      <RouteCalculater />
    </CommonLayout>
  )
}

export default App
