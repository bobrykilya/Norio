// import { useState } from 'react'
import { useSelector } from 'react-redux'
import SignInCont from './SignConts/SignInCont/SignInCont'
import SignUpCont from './SignConts/SignUpCont/SignUpCont'
import SignUpSecondCont from './SignConts/SignUpSecondCont/SignUpSecondCont'
import CoverPanel from './CoverPanel/CoverPanel'
// import mainLogo from '../../assets/logos/full_logo_vertic.png'
import './LoginPanel.sass'



const LoginPanel = () => {

    // const [user, setUser] = useState(null)
    const coverPanelState   = useSelector(state => state.coverPanel.coverPanel)

    return ( 
        <div id='login_panel-cont' className='cont'>
            <div id='signs-cont' className='cont'>
                {coverPanelState !== 'opened_sign_up_2' ? <SignInCont /> : <SignUpSecondCont coverPanelState={coverPanelState} />}
                <SignUpCont coverPanelState={coverPanelState} />
            </div>
            <CoverPanel />
        </div>
    )
}

export default LoginPanel