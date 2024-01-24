// App.jsx
import React from 'react';
import { Route, Routes } from "react-router-dom";
// import { Provider } from 'react-redux';
// import store from './store/configureStore';
import { Login } from './components/page/Login';
import { NavBar } from './components/NavBar';
import { HomePage } from './components/HomePage';

const App = () => {
  return (
    // <Provider store={store}>
    <div>
        <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/detail/:id" element={<Login/>} /> */}
      </Routes>
    </div>
    // </Provider>
  );
};

export default App;
