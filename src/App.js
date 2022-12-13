import React from 'react';
import './App.css';
import Dropdown from './Components/TopPanel';

import image1 from './Images/A - ALACAKARANLIK KUŞLARI - 1. SAYFA.png';
import image2 from './Images/A - ALACAKARANLIK KUŞLARI - 1. SAYFA.png';
import image3 from './Images/A - ALACAKARANLIK KUŞLARI - 1. SAYFA.png';
import image4 from './Images/A - ALACAKARANLIK KUŞLARI - 1. SAYFA.png';


function App() {
  return (
    
    <div className="App">
      <Dropdown/>
      <div class="btn-group">
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Action
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>

      <div className="image-slider">
        <img src={image1} />
        <img src={image2} />
        <img src={image3} />
        <img src={image4} />
      </div>
    </div>
  );
}

export default App;
