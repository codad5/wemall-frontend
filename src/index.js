import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './index.css';
import App from './App';
import View from './View';
import PageNotFound from './404-page';




const rootElement = document.getElementById("root");
render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/men" element={<App gender="men" />} />
        <Route path="/view" element={<View gender="men" />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<PageNotFound />} />
        
      </Routes>
    </BrowserRouter>
  </div>,
  rootElement
);