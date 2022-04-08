
import './App.css';


import {BrowserRouter,Routes,Route} from "react-router-dom";
import Loginpage from './component/Loginpage';
import Home from './component/Home';
import Registerpage from './component/Registerpage';
import Pagination from './component/Pagination';


function App() {



  return (
    <div>
<BrowserRouter>
{/* <Loginpage/> */}
  <Routes>
      <Route path = "/" element={<Loginpage/>} />
      <Route path = "/admin" element={<Home/>} />
      <Route path = "/register" element={<Registerpage/>} />
      <Route path = "/pagination" element={<Pagination/>} />
  </Routes>
  </BrowserRouter>,

     
    </div>
  );
}

export default App;
