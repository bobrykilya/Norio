import { useContext } from 'react'
import SignInCont from '../../components/AuthPage/SignConts/SignInCont/SignInCont'
import SignUpCont from '../../components/AuthPage/SignConts/SignUpCont/SignUpCont'
import SignUpInfoCont from '../../components/AuthPage/SignConts/SignUpInfoCont/SignUpInfoCont'
import CoverPanel from '../../components/AuthPage/CoverPanel/CoverPanel'
import { AuthContext } from './../../context/Auth-context'
import { AuthPageAnim } from '../../utils/pageTransitions'
import './AuthPage.sass'
import AppTitle from './../../components/AppTitle/AppTitle';
import LogBookButton from '../../components/LogBook/LogBookButton'




const AuthPage = () => {
    const { coverPanelState, blockAuthPage } = useContext(AuthContext)
    // console.log(coverPanelState)

    return ( 
        <>
            <div className='page_header-cont cont'>
                <AppTitle />
                <LogBookButton />
            </div>
            <AuthPageAnim>
                <div id='auth_panel-cont' className={`cont ${blockAuthPage && 'block'}`}>
                    <div id='signs-cont' className='cont'>
                        <SignInCont act_form={ coverPanelState }/>
                        <SignUpCont act_form={ coverPanelState } />
                        {coverPanelState !== 'sign_in' && <SignUpInfoCont act_form={ coverPanelState } />}
                    </div>
                    <CoverPanel />
                </div>
            </AuthPageAnim>
        </>
    )
}

export default AuthPage