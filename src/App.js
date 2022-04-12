import { useState } from 'react';
import './App.css';
import Header from './Header'
import Hero from './Hero'
import Featured from './Featured'
import ProductShow from './ProductShow'
import Footer from './Footer'
import {BaseUrl} from './components/BaseUrl';



function App(props) {
  const baseUrl = BaseUrl();
  console.log(props)
  const [fImages, setFImage] = useState([baseUrl + '../assets/image/gallery/6227999d42d640.77877086.png', baseUrl + '../assets/image/gallery/6227999d41b853.64190340.png', baseUrl +'../assets/image/gallery/622513e1570d21.57700185.png'])

  return (
    <div className="App">
      <Header color='var(--main-white)' colorImportant="true"></Header>
      <main>
        <Hero bannerImage={baseUrl+"../assets/image/gallery/622513e152fd34.82554223.png"}></Hero>
        <Featured fImages={fImages} ></Featured>
        <section className="whyus">
            wh
        </section>
        <ProductShow value="100" param="category/all"></ProductShow> 
        <ProductShow value="100" heading="If you are a female"></ProductShow> 
      </main>
      
      <Footer></Footer>

    </div>
  );
}

export default App;
