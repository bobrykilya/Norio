import { useState, useEffect } from 'react';
import LoginPanel from './components/LoginPanel/LoginPanel';
import backVideo from './imgs/background.webm';
import './App.css';

function App() {

    const [state, setState] = useState(null);

    const callBackendAPI = async () => {
        const response = await fetch('/api');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    // получение GET маршрута с сервера Express, который соответствует GET из server.js 
    useEffect(() => {
        callBackendAPI()
            .then(res => setState(res.express))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="main-body cont">
            <video className='videoTag' autoPlay loop muted>
                <source src={backVideo} type='video/webm' />
            </video>
            <LoginPanel />
        </div>
    )
}

export default App;