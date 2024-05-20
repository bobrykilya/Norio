import { useContext } from 'react'
import SignInCont from '../../components/AuthPage/SignConts/SignInCont/SignInCont.jsx'
import SignUpCont from '../../components/AuthPage/SignConts/SignUpCont/SignUpCont.jsx'
import SignUpInfoCont from '../../components/AuthPage/SignConts/SignUpInfoCont/SignUpInfoCont.jsx'
import CoverPanel from '../../components/AuthPage/CoverPanel/CoverPanel.jsx'
import { AuthContext } from './../../context/Auth-context'
import { AuthPageAnim } from '../../utils/PageTransitions.jsx'
import './AuthPage.sass'




const AuthPage = () => {
    const { coverPanelState } = useContext(AuthContext)
    // console.log(coverPanelState)

    return ( 
        <AuthPageAnim>
            <div id='auth_panel-cont' className='cont'>
                <div id='signs-cont' className='cont'>
                    <SignInCont act_form={ coverPanelState }/>
                    <SignUpCont act_form={ coverPanelState } />
                    {coverPanelState !== 'sign_in' && <SignUpInfoCont act_form={ coverPanelState } />}
                </div>
                <CoverPanel />
            </div>
        </AuthPageAnim>
    )
}

export default AuthPage