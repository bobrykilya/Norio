import { useSelector } from 'react-redux'
import SignInCont from '../../components/LoginPage/SignConts/SignInCont/SignInCont'
import SignUpCont from '../../components/LoginPage/SignConts/SignUpCont/SignUpCont'
import SignUpInfoCont from '../../components/LoginPage/SignConts/SignUpInfoCont/SignUpInfoCont'
import CoverPanel from '../../components/LoginPage/CoverPanel/CoverPanel'
import './LoginPage.sass'




const LoginPage = () => {

    const act_form = useSelector(state => state.coverPanel.coverPanel)

    return ( 
        <div id='login_panel-cont' className='cont'>
            <div id='signs-cont' className='cont'>
                <SignInCont act_form={ act_form }/>
                <SignUpCont act_form={ act_form } />
                {act_form !== 'sign_in' && <SignUpInfoCont act_form={ act_form } />}
            </div>
            <CoverPanel />
        </div>
    )
}

export default LoginPage