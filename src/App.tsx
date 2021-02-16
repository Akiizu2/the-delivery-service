import MainPage from './pages/main'

import { Provider } from 'react-redux'
import { store } from './stores/reducer'

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  )
}

export default App
