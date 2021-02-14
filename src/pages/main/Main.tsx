import CommonLayout from '../../layouts/common/CommonLayout'
import DeliveryCalculatorContainer from '../../containers/delivery-calculater'

const MainPage: React.FC = () => {
  return (
    <CommonLayout>
      <h1>Delivery Service</h1>
      <DeliveryCalculatorContainer />
    </CommonLayout>
  )
}

export default MainPage
