import React,{ useEffect, useState,createContext,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "./store/DairyDataBase";
import 'bootstrap/dist/css/bootstrap.min.css';
import App  from '../App'
import Page from './Page'
import AppendDairy from "./Date";


const OpenDairy=()=>{
    
  
    let [date,setDate]=useState('')
    const [pageNO, setPageNO] = useState();  // To store fetched data
      const [error, setError] = useState(null); // To store any error message
    const[appendDB,setAppendDB]=useState('')
    const refTextArea=useRef("")
    const refPageNo=useRef('')
    const refDate=useRef('')
    
        
    

     
     
     const loadingPageNo=()=>{

      
      
        fetch('http://localhost:5000/api/count', {
            method: 'GET',
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then((data) =>setPageNO(data[0]["COUNT(pageno)"]+1))
            .catch((error) => {
              console.error('Error fetching data:', error);
              setError(error.message);  // Set the error message in state
            });
          
            
         }
  const formatDate=(e)=>{
    
  

    const inputDate=e.target.value
    const formattedDate= new Date(inputDate).toISOString().split('T')[0] 
    console.log(formattedDate)
    setDate(formattedDate)
       
          
          
          
       }
       
    
    const handleWrite=()=>{
      
      if(refPageNo.current.value!=''&&refDate.current.value!=''&&refTextArea.current.value!='')
      {
        
      fetch("http://localhost:5000/api/write", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pageAtServer: pageNO,
          contentAtServer: appendDB,
          dateAtServer: date
        })
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);  
      });
    
      
      refPageNo.current.value="";
      refTextArea.current.value="";
      refDate.current.value=""
        
      }
      else
      {
        alert('Fill date and text')
          
      }  
    }
      
        
    
    return(
      <div>
        <div className="background ">
            
                
            
            
      <div className="write fst-italic fs-6">
      <div>
      <div style={{display:'inline-block',padding:'0px 20px'}}>      
      <button class="btn btn-dark" onClick={loadingPageNo} >PageNo</button> 
      <input type='number' value={pageNO} ref={refPageNo} style={{width:'90px',marginLeft:'2px'}}></input>
      </div>
      
      <input type='date' class="btn btn-dark" onChange={(e)=>formatDate(e)} ref={refDate} style={{marginLeft:'25px'}}/>
      </div>         
                
      <p style={{padding:'0px 20px'}}> Previous pages filled</p>           

<textarea className="textstyle  " type="text" rows='14'  placeholder="Write Something!" onChange={(e)=>setAppendDB(e.target.value)} ref={refTextArea} ></textarea>
<br/>
<div className="footerSection">    
<button class="btn btn-dark" onClick={handleWrite} style={{marginLeft:'160px'}}>Finish</button>      
      
</div>

                
</div>

            
            
</div>
            
          
           
      
            </div>
            
  
    
    )

}
export default OpenDairy;