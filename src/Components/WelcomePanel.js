import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React,{useState,useEffect} from 'react';

function WelcomePanel(name) {
  const newArray=Array.from(name)

  return (
    <div className = "welcomePanel">
      <h3>{name} için</h3>
      <h3 >için hazırlanmış özel bir kitap</h3>
      <h3>Resimlere tıklayarak hikayeleri değiştirebilirsiniz.</h3>
    </div>
    
  
  );
}

export default WelcomePanel;