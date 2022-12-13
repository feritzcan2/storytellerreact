import React from 'react';
import './App.css';
import DropDownPanel from './Components/DropDownPanel';
import WelcomePanel from './Components/WelcomePanel';
import dict from './Utils/ImageLoader';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { name: "FERİİT" ,activesForIndex : this.getActiveForWord("FERİİT")};
  }

  getActiveForWord(name){
    const nameArr=Array.from(name.toUpperCase())

    var actives = {}
    for (let index = 0; index < nameArr.length; index++) {
      const element = nameArr[index];
      var el = this.getActiveForChar(element,index)
      actives[index] = el
    }
    return actives;
  }

  getActiveForChar(char,index){
    for (let index = 0; index < dict[char].length; index++) {
      const element = dict[char][index];
      if(element.active ==false){
        element.active = true;
        element.activeCharIndex = index
        return element
      }
    }

  }
   handleChange=(char,index,name)=>{
    var activesForIndex = this.state.activesForIndex;
    for (let arrIndex = 0; arrIndex < dict[char].length; arrIndex++) {
      const element = dict[char][arrIndex];
      if(element.active ==true && element.activeCharIndex ==index){
        element.active = false
        element.activeCharIndex = -1
      }
   }
   for (let arrIndex = 0; arrIndex < dict[char].length; arrIndex++) {
    const element = dict[char][arrIndex];
    if(element.name ==name){
      element.active = true;
      element.activeCharIndex = index
      activesForIndex[index] = element
      this.setState({activesForIndex:activesForIndex})
    }
 }
   
 
}
  
  render() {
    return (
    
      <div className="App">
        {WelcomePanel(this.state.name)}
        <DropDownPanel 
        name={this.state.name} images = {dict}
         activesForIndex = {this.state.activesForIndex}
         handleChange = {this.handleChange}
         />

        <div className="image-slider">
        {Object.entries(this.state.activesForIndex).map((key, index)=>{
        return(   
          <img key = {index} src={key[1].src} />
          )
      })}
          {/* <img src={image2} />
          <img src={image3} />
          <img src={image4} /> */}
        </div>
      </div>
    );  }
}


export default App;
