import { useContext } from 'react'
import SignInCont from '../../components/AuthPage/SignConts/SignInCont/SignInCont'
import SignUpCont from '../../components/AuthPage/SignConts/SignUpCont/SignUpCont'
import SignUpInfoCont from '../../components/AuthPage/SignConts/SignUpInfoCont/SignUpInfoCont'
import CoverPanel from '../../components/AuthPage/CoverPanel/CoverPanel'
import { AuthContext } from './../../context/Auth-context'
import './AuthPage.sass'




const AuthPage = () => {
    const { coverPanelState } = useContext(AuthContext)
    // console.log(coverPanelState)

    return ( 
        <div id='login_panel-cont' className='cont'>
            <div id='signs-cont' className='cont'>
                <SignInCont act_form={ coverPanelState }/>
                <SignUpCont act_form={ coverPanelState } />
                {coverPanelState !== 'sign_in' && <SignUpInfoCont act_form={ coverPanelState } />}
            </div>
            <CoverPanel />
        </div>
    )
}

export default AuthPage