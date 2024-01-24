// App.jsx
import React from 'react';
// import { Provider } from 'react-redux';
// import store from './store/configureStore';
import { NavBar } from './components/NavBar';
import { HomePage } from './components/HomePage';

const App = () => {
  return (
    // <Provider store={store}>
      <div>
        <NavBar />
        <HomePage />
      </div>
    // </Provider>
  );
};

export default App;
