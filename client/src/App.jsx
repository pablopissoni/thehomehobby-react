// App.jsx
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import { Provider } from 'react-redux';
// import store from './store/configureStore';

import { Login } from "./components/page/Login";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./components/HomePage";
import { Details } from "./components/page/Details";
import { Register } from "./components/page/Register";
import { PasswordReset } from "./components/page/PasswordReset";
import { ContactUs } from "./components/page/ContactUs";
import { FAQs } from "./components/page/FAQs";
import { Checkout } from "./components/page/Checkout";
import { UserProfile } from "./components/page/UserProfile";
import { SearchProducts } from "./components/page/SearchProducts";
import { Footer } from "./components/Footer";
import { AdminDashboard } from "./components/page/AdminDashboard";
import { SubCategories } from "./components/page/SubCategories";
import { ProdByCards } from "./components/page/ProdByCards";
import { ShoppingCartPage } from "./components/ShoppingCartPage";
const App = () => {
  // Obtengo las ubicaciones y guardo en una variable las que quiero ignorar después
  const { pathname } = useLocation();
  const ignorePaths = ["/login", "/register", "/password-reset"];
  const ignoreFooter = ["/adminDashboard"];

  const isIgnoredFooter = ignoreFooter.includes(pathname);
  const isIgnored = ignorePaths.includes(pathname);
  //-------------------------------
  const stripePromise = loadStripe(
    "pk_live_51Ovkt4Hf3yjhBctIQNBP2pp5KqvschIdpkztE3mtdl9xOYqJ90uL6GS3cVhNP7liwpx2f3eRd1ofXLh4VyOLyARt00cnWSGmaH"
  );

  return (
    // <Provider store={store}>
    <div>
      <Elements stripe={stripePromise}>
        {!isIgnored && <NavBar />}{" "}
        {/* No aparece en las URLs de "ignorePaths" */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<SearchProducts />} />{" "}
          {/* Se renderiza la lista de produtos relacionados con el producto de la busqueda */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/ShoppingCartPage" element={<ShoppingCartPage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/category/:id" element={<SubCategories />} />
          <Route
            path="/prodbycategory/:id"
            element={<ProdByCards resourceType="category" />}
          />
          <Route
            path="/prodbybrand/:id"
            element={<ProdByCards resourceType="brand" />}
          />
          {/* <Route path="/detail/:id" element={<Login/>} /> */}
        </Routes>
        {!isIgnoredFooter && <Footer />}
      </Elements>
    </div>
    // </Provider>
  );
};

export default App;
