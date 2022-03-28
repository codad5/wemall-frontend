import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './index.css';
import App from './App';




const rootElement = document.getElementById("root");
render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/men" element={<App gender="men" />} />
        <Route path="*" element={<App />} />
        
      </Routes>
    </BrowserRouter>
  </div>,
  rootElement
);