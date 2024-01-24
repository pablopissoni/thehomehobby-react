// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <HomePage />
      </div>
    </Provider>
  );
};

export default App;
