import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MainNavigator from './src/navigation/MainNavigator';
import { StatusBar } from 'react-native';

export default function App () {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <MainNavigator />
    </Provider>
  );
}

