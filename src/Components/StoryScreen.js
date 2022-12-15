import React from 'react';
import '../App.css';
import DropDownPanel from './DropDownPanel';
import WelcomePanel from './WelcomePanel';
import dict from '../Utils/ImageLoader';
import 'bootstrap/dist/css/bootstrap.min.css';
import kapak from '../StaticImages/kapak.jpg'
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
  var y = 0;
  var height =
  doc.addImage(require("../StaticImages/kapak.jpg"), "JPEG", 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()/2);
  doc.addImage(require("../StaticImages/first1.jpeg"), "JPEG", 0,  doc.internal.pageSize.getHeight()/2,  doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()/2);
doc.addPage();
doc.addImage(require("../StaticImages/first2.jpeg"), "JPEG", 0,  0,  doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()/2);
let cift = false;
const nameArr=Array.from(this.state.name.toLocaleUpperCase('tr-TR'))

var actives = {}
for (let index = 0; index < nameArr.length; index++) {
  var pages = this.state.activesForIndex[index].pages
  console.log(pages)
  for (let index2 = 0; index2 < pages.length; index2++) {
    var element = pages[index2]
    if(cift==false){
      doc.addImage(require("../Images/"+element.link), "JPEG", 0,  doc.internal.pageSize.getHeight()/2,  doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()/2);
        cift=true;
    }
    else{
      cift = false;
      doc.addPage()
      doc.addImage(require("../Images/"+element.link), "JPEG", 0,  0,  doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()/2);
    }
  }
}
if(cift==false){
  doc.addImage(require("../StaticImages/last.jpeg"), "JPEG", 0,  doc.internal.pageSize.getHeight()/2,  doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()/2);
  doc.setFontSize(17);     
  doc.setTextColor(255, 255, 255);
  doc.text(140,doc.internal.pageSize.getHeight()/2+120, this.state.name);
  cift=true;
}
else{
  cift = false;
  doc.addPage()
  doc.addImage(require("../StaticImages/last.jpeg"), "JPEG", 0,  0,  doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()/2);
  doc.setFontSize(17);     
  doc.setTextColor(255, 255, 255);
  doc.text(140,120, this.state.name);
}


  // Save the PDF
  doc.save("my-pdf.pdf");
  
}
  
  render() {
    return (
    
      <div className="App" style ={{alignItems:"center"}}>
        {WelcomePanel(this.state.name)}
        <DropDownPanel 
        name={this.state.name} images = {dict}
         activesForIndex = {this.state.activesForIndex}
         handleChange = {this.handleChange}
         />

        <div className="image-slider">
        <img src={kapak} />
        <img src={firstImage1} />
          <img src={firstImage2} />
        {Object.entries(this.state.activesForIndex).map((key, index)=>{
       
       console.log(key[1])

          return key[1].pages.map((name,index2)=>{
            return(   
              <img key = {index+":"+index2} src={name.src} />
              )
          })
        
      })}
  <div className = "head-text">
        <div className = "head-image">
          <img src = {last} alt = "Freedom Blog" />
        </div>
          <div class='text-on-image'>
             <h3> {this.state.name}</h3>
          </div>
      </div>

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
