import DeliveryCalculatorContainer from './containers/delivery-calculater'
import CommonLayout from './layouts/common/CommonLayout'

function App() {
  return (
    <CommonLayout>
      <h1>Delivery Service</h1>
      <DeliveryCalculatorContainer />
    </CommonLayout>
  )
}

export default App
