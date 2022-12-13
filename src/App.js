import React from 'react';
import './App.css';
import DropDownPanel from './Components/DropDownPanel';
import WelcomePanel from './Components/WelcomePanel';
import images from './Utils/ImageLoader';
import 'bootstrap/dist/css/bootstrap.min.css';






function App() {

  return (
    
    <div className="App">
      {WelcomePanel("ferit")}
      {DropDownPanel("ferit")}

      <div className="image-slider">
      {Object.entries(images).map((key, index)=>{
        console.log(key)
      return(   
        <img src={images[key[0]]} />
        )
    })}
        {/* <img src={image2} />
        <img src={image3} />
        <img src={image4} /> */}
      </div>
    </div>
  );
}

export default App;
