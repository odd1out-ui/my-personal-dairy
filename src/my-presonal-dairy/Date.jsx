import { useContext, useEffect, useState } from "react";
import { ContextDairy } from "./OpenDairy";
import { useParams } from "react-router-dom";


const Date=()=>{
    const {date}=useParams();
    const[receiveddata,setReceivedData]=useState('')
    const [error, setError] = useState(null);
    
   useEffect(()=>{
     const fetchData=()=>{
      
      
    
              
              
        
          
        fetch(`http://localhost:5000/api/searchbydate?searchDate=${date}`, {
        method: 'GET',
        })
        .then((res) => {
        if (!res.ok) {
         throw new Error('Network response was not ok');
          }
        return res.json();
        })
         .then((data) => {
         if (!data || data.length === 0) {
        console.log('No data received');
        } else {
        console.log('Received data:', data);
        setReceivedData(data.data)
                  
        // Set the received data in state
        }
        })
        .catch((error) => {
         console.error('Error fetching data:', error);
        setError(error.message);  // Set the error message in state
        });
        
        
                
      }
      fetchData();
      },[date])
      
      
                
          
      return(
          
            <div>
              <div className="searchpage">
        <div style={{display:'inline'}}><h3>Date:</h3></div>
        <div styel={{display:'inline'}}> <h3>{date}</h3></div>
        {error && <p>Error: {error}</p>}
        <div>
        <br/>
        <br/>
        <br/>
        {receiveddata.length > 0 ? (
          receiveddata.map((item, index) => (
            <div key={index}>
              <h4>Result {index + 1}</h4>
              <pre>{item.content}</pre> 
            </div>
          ))
        ) : (
          <p>No results found for the selected date.</p>
        )}
        </div>
      </div>
    </div>
  
            

    
    
      )
    

}
export default Date;