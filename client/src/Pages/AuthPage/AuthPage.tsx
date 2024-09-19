import React, { useContext } from 'react'
import SignInCont from '../../components/_AuthPage/SignConts/SignInCont/SignInCont'
import SignUpCont from '../../components/_AuthPage/SignConts/SignUpCont/SignUpCont'
import SignUpInfoCont from '../../components/_AuthPage/SignConts/SignUpInfoCont/SignUpInfoCont'
import CoverPanel from '../../components/_AuthPage/CoverPanel/CoverPanel'
import AppTitle from '../../components/AppTitle/AppTitle'
import LogBookButton from '../../components/LogBook/LogBookButton'
import { AuthContext } from '../../context/Auth-context'
import { AuthPageAnim } from '../../utils/pageTransitions'
import './AuthPage.sass'
import { useBlockError } from "../../stores/Device-store"
import CoverAppTitle from "../../components/_AuthPage/CoverAppTitle/CoverAppTitle"



const AuthPage = () => {
    const { coverPanelState } = useContext(AuthContext)
    const blockErrorMessage = useBlockError(s => s.blockErrorMessage)
    // console.log(coverPanelState)

    return (
        <>
            <AppTitle />
            <LogBookButton />
            <CoverAppTitle block={!!blockErrorMessage}/>
            <AuthPageAnim>
                <div id="auth_panel-cont" className={`cont ${blockErrorMessage && 'block'}`}>
                    <div id="signs-cont" className="cont">
                        <SignInCont act_form={coverPanelState} blur_form={!!blockErrorMessage} />
                        <SignUpCont act_form={coverPanelState} blur_form={!!blockErrorMessage} />
                        {coverPanelState !== 'sign_in' &&
                            <SignUpInfoCont act_form={coverPanelState} blur_form={!!blockErrorMessage} />
                        }
                    </div>
                    <CoverPanel disabled={!!blockErrorMessage} />
                </div>
            </AuthPageAnim>
        </>
    )
}

export default AuthPage