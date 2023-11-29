// import { useState, useEffect } from 'react';
import './App.css';
 
function App() {
  
  // const [state, setState] = useState(null);

  // const callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // };
  
  // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  // useEffect(() => {
  //   callBackendAPI()
  //   .then(res => setState(res.express))
  //   .catch(err => console.log(err));
  // }, [])

  // return (
  //   <div className="App">
  //     {/* вывод данных, полученных с сервера Express */}
  //     <div>
  //         {state}
  //     </div>
  //   </div>
  // );
  
  return(
    <div className="main-body cont">
      Привет Мир
    </div>
  )
}
 
export default App;