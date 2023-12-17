import { useState } from 'react'
import SignInCont from './SignConts/SignInCont/SignInCont'
import SignUpCont from './SignConts/SignUpCont/SignUpCont'
import CoverPanel from './CoverPanel/CoverPanel'
// import mainLogo from '../../assets/logos/full_logo_vertic.png'
import './LoginPanel.sass'



const LoginPanel = () => {

    // const [user, setUser] = useState(null)
    const [isOpenedSignUp, setIsOpenedSignUp] = useState(true)

    const handleToggleCoverPanel = () => {
        setIsOpenedSignUp(!isOpenedSignUp)
    }

    return ( 
        <div id='login_panel-cont' className='cont'>
            <div id='signs-cont' className='cont'>
                <SignInCont isOpenedSignUp={isOpenedSignUp}/>
                <SignUpCont isOpenedSignUp={isOpenedSignUp}/>
            </div>
            <CoverPanel onToggleCoverPanel={handleToggleCoverPanel} isOpenedSignUp={isOpenedSignUp}/>
        </div>
    )
}

export default LoginPanel