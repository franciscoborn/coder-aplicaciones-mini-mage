import { Provider } from 'react-redux';
import { store } from './src/app/store';
import MainNavigator from './src/navigation/MainNavigator';



export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator/>
    </Provider>
  );
}