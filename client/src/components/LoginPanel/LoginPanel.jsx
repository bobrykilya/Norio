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
    const act_form = useSelector(state => state.coverPanel.coverPanel)

    return ( 
        <div id='login_panel-cont' className='cont'>
            <div id='signs-cont' className='cont'>
                <SignInCont act_form={act_form}/>
                <SignUpSecondCont act_form={act_form} />
                <SignUpCont act_form={act_form} />
            </div>
            <CoverPanel />
        </div>
    )
}

export default LoginPanel