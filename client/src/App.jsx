// import { useState, useEffect } from 'react'
import LoginPanel from './components/LoginPanel/LoginPanel'
import HomePage from './components/Pages/HomePage/HomePage'
import './App.sass'



const App = () => {

    // const [state, setState] = useState(null)

    // const callBackendAPI = async () => {
    //     const response = await fetch('/api')
    //     const body = await response.json()

    //     if (response.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     return body
    // }

    //* получение GET маршрута с сервера Express, который соответствует GET из server.js 
    // useEffect(() => {
    //     callBackendAPI()
    //         .then(res => setState(res.express))
    //         .catch(err => console.log(err))
    // }, [])

    return (
        <div id='main_body-cont' className="cont">
            <LoginPanel />
            {/* <HomePage /> */}
        </div>
    )
}

export default App
