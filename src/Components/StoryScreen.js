import React from 'react';
import '../App.css';
import DropDownPanel from './DropDownPanel';
import WelcomePanel from './WelcomePanel';
import dict from '../Utils/ImageLoader';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstImage1 from '../StaticImages/first1.jpeg'
import firstImage2 from '../StaticImages/first2.jpeg'
import last from '../StaticImages/last.jpeg'
import { useParams } from "react-router-dom";
function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class StoryScreen extends React.Component {

  constructor(props) {
    super(props);
    let { cocugunAdi } = props.params;
    console.log("params "+cocugunAdi)
    this.state = { name: cocugunAdi ,activesForIndex : this.getActiveForWord(cocugunAdi)};
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

    for (let arrIndex = 0; arrIndex < dict[char].length; arrIndex++) {
      const element = dict[char][arrIndex];
      if(element.active ==false || element.activeCharIndex ==index){
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
      if(element.activeCharIndex ==index){
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
      return;
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
           <img src={firstImage1} />
          <img src={firstImage2} />
        {Object.entries(this.state.activesForIndex).map((key, index)=>{
       
          return key[1].pages.map((name,index2)=>{
            return(   
              <img key = {index+":"+index2} src={name.src} />
              )
          })
        
      })}
                <img src={last} />

          {/* <img src={image2} />
          <img src={image3} />
          <img src={image4} /> */}
        </div>
      </div>
    );  }
}


export default withParams(StoryScreen);
