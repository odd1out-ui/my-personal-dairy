import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from './Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css';

const Page = () => {
  const { pageNumber } = useParams();  // Get the page number from URL parameters
  const [error, setError] = useState(null);
  const [receivedData, setReceivedData] = useState('');

  useEffect(() => {
    const fetchData = () => {
      if (!pageNumber || isNaN(pageNumber) || pageNumber <= 0) {
        setError("Invalid page number");
        return;
      }

      fetch(`http://localhost:5000/api/data?searchPage=${pageNumber}`, {
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
            setReceivedData(data.data);  // Update the received data state
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError(error.message);  // Set the error message in state
        });
    };
  
  fetchData();
  
  },[pageNumber])

      // This hook runs whenever the pageNumber in the URL changes

  return (
    <div >
      <div className="searchpage">
      <div style={{display: 'inline'}}>
        <h3>Page </h3>
        </div>
        <div style={{display: 'inline'}}>
        <h3>Number </h3>
        </div>
      
          <div style={{display: 'inline'}}>
        <h3> {pageNumber}</h3>
        </div>

      {error && <p>Error: {error}</p>}
      <div>
      <br/>
      <br/>
      <br/>
      
      {receivedData.length > 0 ? (
      receivedData.map((item, index) => (
      <div key={index}>
    
      <h3 >Result {index + 1}</h3>
      <p >{item.content}</p>
      </div>
          ))
        ) : (
          <p>No results found for the selected date.</p>
        )}
        </div>
           </div>
      

    </div>
  );
};

export default Page;
