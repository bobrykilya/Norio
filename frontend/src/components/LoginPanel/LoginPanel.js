// import { useState } from 'react';
import SignInCont from './SignConts/SignInCont/SignInCont'
import SignUpCont from './SignConts/SignUpCont/SignUpCont'
import CoverPanel from './CoverPanel/CoverPanel'
// import mainLogo from '../../assets/logos/full_logo_vertic.png'
import './LoginPanel.sass'



const LoginPanel = () => {

    // const [user, setUser] = useState(null)

    return ( 
        <div id='login_panel-cont' className='cont'>
            <div id='signs-cont' className='cont'>
                <SignInCont />
                <SignUpCont />
            </div>
            <CoverPanel />
        </div>
    )
}

export default LoginPanel