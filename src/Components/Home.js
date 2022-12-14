import React from 'react';
import { Navigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
class Home extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      redirect:false
  }

  }
  onChange=(params)=> {
  this.setState({name:params.target.value})
 }

 render() {

  return (
  
    <div className="home-container" style={{display:'flex',height:"100vh",backgroundColor:'#FFF4EE',justifyContent:'center',alignItems:'center'}}>
      <div style={{padding:'30px', width:"50vh",border:'3px solid #fff',borderRadius:'10px',backgroundColor:'white',boxShadow:"5px 4px 6px 5px rgb(86 38 223 / 10%)"}}>
      <h1 style={{color:'#352477'}}>Kitap Hazırla</h1>
        <div style ={{height:"20px"}}></div>
      <h6 style={{color:'#352477'}}>Hayal gücünü geliştiren, yaratıcılığı destekleyen, isme özel en güzel hediye
</h6>
<div style ={{height:"5px"}}></div>

      <FloatingLabel
        controlId="floatingInput"
        label="Çocuğun Adı"
        placeholder='Tuğçem'
        className="mb-3"
        ref={this.state.name}
        onChange={this.onChange}

      >
        <Form.Control style = {{border:'3px solid #352477'}}type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <Button style= {{backgroundColor:'#352477'}} variant="primary" size="lg" onClick={()=>{this.setState({redirect:true})}}>
        ÖNİZLEME
      </Button>
      { 
   this.state.redirect && <Navigate to={"story/"+this.state.name} replace={true}/>
}
      </div>
  
    </div>
  ); 
}
}

export default Home;
