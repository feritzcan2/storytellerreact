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
import Button from 'react-bootstrap/Button';
import { jsPDF } from "jspdf";

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
    const nameArr=Array.from(name.toLocaleUpperCase('tr-TR'))

    var actives = {}
    for (let index = 0; index < nameArr.length; index++) {
      const element = nameArr[index];
      if(element ===' ') continue;
      console.log(element)

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
makePdf=()=>{

  const doc = new jsPDF({
    orientation: 'p',
    unit: 'px',
    format: 'letter'
  })

  // Add an image to the PDF
  doc.addImage(require("../StaticImages/last.jpeg"), "JPEG", 0, 40, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getWidth()*540/960);

  // Save the PDF
  doc.save("my-pdf.pdf");
  
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
        <Button style= {{backgroundColor:'#352477'}} variant="primary" size="lg" onClick={()=>{this.makePdf()}}>
        PDF OLARAK İNDİR
      </Button>
      </div>
    );  }
}


export default withParams(StoryScreen);
