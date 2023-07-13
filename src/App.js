import './App.css';
import React from 'react';
import logoHome from './components/logo-Home.png';

 function App() {

   return (
     <div className="App">
       
       <header className="App-header">     
  
       <img src={logoHome} alt="logo"/>
  
       <div className="inside-App-Header">
         
       <input type="text" id='idInput' placeholder="Search characters"/><br></br>
       <button>Search</button>
       </div> 
       </header>
     </div>
   );

 }

export default App;