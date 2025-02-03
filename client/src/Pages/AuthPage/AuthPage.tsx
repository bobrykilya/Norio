import React from 'react'
import SignInCont from '../../components/_AuthPage/SignConts/SignInCont/SignInCont'
import SignUpCont from '../../components/_AuthPage/SignConts/SignUpCont/SignUpCont'
import SignUpInfoCont from '../../components/_AuthPage/SignConts/SignUpInfoCont/SignUpInfoCont'
import CoverPanel from '../../components/_AuthPage/CoverPanel/CoverPanel'
import AppTitle from '../../components/common/AppTitle/AppTitle'
import LogBookButton from '../../components/others/LogBook/LogBookButton'
import { AuthPageAnim } from '../../utils/pageTransitions'
import './AuthPage.sass'
import { useCoverPanelState } from "../../stores/Auth-store"
import { useModalState } from "../../stores/Global-store"



type AuthPageProps = {
    blockErrorMessage: string;
}
const AuthPage = ({ blockErrorMessage }: AuthPageProps) => {
    
    const coverPanelState = useCoverPanelState(s => s.coverPanelState)
    const blurModalState = useModalState(s => s.blurModalState)

    return (
        <>
            <div
                className={'auth_page-header cont'}
            >
                <AppTitle />
                <LogBookButton isAuthPage={true} />
            </div>
            <AuthPageAnim>
                <div
                    id="auth_page-cont"
                    className={`cont ${blockErrorMessage ? 'block' : ''}`}
                >
                    <div id="signs-cont" className="cont">
                        <SignInCont
                            actForm={coverPanelState}
                            isFormDisabled={blurModalState || !!blockErrorMessage}
                        />
                        <SignUpCont
                            actForm={coverPanelState}
                            isFormDisabled={blurModalState || !!blockErrorMessage}
                        />
                        {coverPanelState !== 'sign_in' &&
                            <SignUpInfoCont
                                actForm={coverPanelState}
                                isFormDisabled={blurModalState || !!blockErrorMessage}
                            />
                        }
                    </div>
                    <CoverPanel disabled={!!blockErrorMessage} />
                </div>
            </AuthPageAnim>
        </>
    )
}

export default AuthPage