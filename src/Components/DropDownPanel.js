import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React,{useState,useEffect} from 'react';

function DropDownPanel(name) {
  const newArray=Array.from(name)

  return (
    <div className = "topPanel">
      {newArray.map((item,index)=>{
      return(   
         <Dropdown key = {index}>
        <Dropdown.Toggle  id="dropdown-button-dark-example1" variant="secondary" className='dropDownButotn'>
          {item}
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1" active>
            Action
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>)
    })}
    </div>
    
  
  );
}

export default DropDownPanel;