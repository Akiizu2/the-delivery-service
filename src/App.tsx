import Main from './containers/main'
import RouteCalculater from './containers/route-calculator'
import CommonLayout from './layouts/common/CommonLayout'

function App() {
  return (
    <CommonLayout>
      <h1>Delivery Service</h1>
      <RouteCalculater />
      {/* TODO: remove main later */}
      <Main />
    </CommonLayout>
  )
}

export default App
