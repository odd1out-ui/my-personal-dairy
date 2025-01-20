import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './my-presonal-dairy/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpenDairy, { ContextDairy } from './my-presonal-dairy/OpenDairy'
import Login from './my-presonal-dairy/Login'
import Page from './my-presonal-dairy/Page';
import Date from './my-presonal-dairy/Date';




function App() {
  

  
    


  
  
  return (
    <div>
     <Router>
  <Routes>
    
    <Route path="/" element={<Login />} />

    
    <Route path="home" element={<Sidebar />}>
      
      
      <Route index element={<OpenDairy />} />

      
      <Route path="page/:pageNumber" element={<Page />} />
      
    
      <Route path="date/:date" element={<Date />} />
    </Route>
  </Routes>
</Router>

    </div>
    
    
    
    

    
    

    
  );
}

export default App;
