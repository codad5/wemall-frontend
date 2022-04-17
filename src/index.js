import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './index.css';
import './smscreen.css';
import App from './App';
import View from './View';
import PageNotFound from './404-page';
import Checkout from './Checkout'




const rootElement = document.getElementById("root");
render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<Checkout gender="men" />} />
        <Route path="/login" element={<Checkout gender="men" />} />
        <Route path="/view/:id" element={<View key={Math.random()} />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<PageNotFound />} />
        
      </Routes>
    </BrowserRouter>
  </div>,
  rootElement
);