// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import StackNav from './src/navigation/StackNav';
import { Provider } from 'react-redux'
import { persistore, store } from './stores'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <PaperProvider>
          <StackNav />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;