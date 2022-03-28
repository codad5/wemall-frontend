import { useState } from 'react';
import './App.css';
import Header from './Header'
import Hero from './Hero'
import Featured from './Featured'
import ProductShow from './ProductShow'
import Footer from './Footer'


function App(props) {
  console.log(props)
  const [fImages, setFImage] = useState(['http://localhost/wemall/assets/image/gallery/6227999d42d640.77877086.png', 'http://localhost/wemall/assets/image/gallery/6227999d41b853.64190340.png', 'http://localhost/wemall/assets/image/gallery/622513e1570d21.57700185.png'])

  return (
    <div className="App">
      <Header></Header>
      <main>
        <Hero bannerImage="http://localhost/wemall/assets/image/gallery/?image=622513e152fd34.82554223.png"></Hero>
        <Featured fImages={fImages} ></Featured>
        <section className="whyus">
            wh
        </section>
        <ProductShow value="100" param="category/all"></ProductShow> 
        <ProductShow value="100"></ProductShow> 
      </main>
      <Footer></Footer>

    </div>
  );
}

export default App;
