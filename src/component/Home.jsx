import React ,{useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"  
import axios from "axios"
import Pagination from "./Pagination"
import { Offline, Online } from "react-detect-offline";
import IMGOFF from "./Imge/IMGOFF.jpg"
function Home() {

  const navigate = useNavigate()
 
  const [posts,setPosts]=useState([]);
 
 
  useEffect(() => {
   
    getAllpost();
   
  },[])
  
    // data get json place holder
  async function getAllpost(){
      try {
      const allpost = await axios.get("https://jsonplaceholder.typicode.com/posts")
     
      setPosts( allpost.data);
      
  } catch (error){
      console.log("Something is wrong")
  }
}



 const[veiw,setVeiw]=useState("List")
  const [mode,setMode]=useState(false)
 const [perPageShow,setPerPageShow]=useState(10)
const [pagination,setPagination]=useState({
  start:0,
  end:perPageShow
})
// call in pagination and arragument put
const onpagination=(start,end)=>{
    setPagination({start:start,end:end})
}
  //dark mode btn
  const darkmodebtn=()=>{
    if(mode===true){
      setMode(false)
    }else{
       setMode(true)
    }
  }
  const logout =()=>{
    localStorage.setItem("admin",JSON.stringify({login:false})) 
    navigate("/") 
  }
  return (<>
<Online>
<div className={` ${mode===true?"bg-dark":null}`}>
   <nav class="navbar navbar-light bg-warning">
  <div>
   <h4 className="btn btn-light" onClick={logout}>logout</h4>
    
    
  </div>
</nav>
   
  
     
        <div className="container">
          <div>
            <button className="btn btn-primary mx-3 mt-3"  onClick={()=>{setVeiw("grid")}}>grid veiw</button>
                        <button className="btn btn-primary mx-3 mt-3" onClick={()=>{setVeiw("List")}}>List Veiw</button>
          </div>
          <div className="row">
          {
              veiw==="grid"&& posts.slice(pagination.start,pagination.end).map((post)=>{
       return (  <div className=' col-sm-3 col-xs-12  m-4 ' key={post.id}>
           <div className="card bg-light">
             <div className="card-body">
               <h5>#{post.id} {post.title}</h5>
               <p>{post.body}</p>
             </div>
           </div>
         </div>)
     }) 
           
   }
            { 
               veiw==="List"&& 
               posts.slice(pagination.start,pagination.end).map((post)=>{
       return (  <div className='  m-3' key={post.id}>
           <div className="card bg-light">
             <div className="card-body">
               <h5>#{post.id} {post.title}</h5>
               <p>{post.body}</p>
             </div>
           </div>
         </div>)
     })
            }
          </div>
          <Pagination perPageShow={perPageShow} onpagination={onpagination} total={ 100} />
         
        </div>

        
    </div>
</Online>
 <Offline>
<div className="text-center">
          <img src={IMGOFF} alt="" />
          </div>
</Offline>
  </>
   
  );
}

export default Home;
