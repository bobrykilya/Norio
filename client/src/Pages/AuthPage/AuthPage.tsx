import React from 'react'
import SignInCont from '../../components/_AuthPage/SignConts/SignInCont/SignInCont'
import SignUpCont from '../../components/_AuthPage/SignConts/SignUpCont/SignUpCont'
import SignUpInfoCont from '../../components/_AuthPage/SignConts/SignUpInfoCont/SignUpInfoCont'
import CoverPanel from '../../components/_AuthPage/CoverPanel/CoverPanel'
import AppTitle from '../../components/AppTitle/AppTitle'
import LogBookButton from '../../components/LogBook/LogBookButton'
import { AuthPageAnim } from '../../utils/pageTransitions'
import './AuthPage.sass'
import { useBlockError } from "../../stores/Device-store"
import CoverAppTitle from "../../components/_AuthPage/CoverAppTitle/CoverAppTitle"
import { useCoverPanelState } from "../../stores/Auth-store"
import { useAnyCoverModalState } from "../../stores/Global-store"



const AuthPage = () => {
    const coverPanelState = useCoverPanelState(s => s.coverPanelState)
    const blockErrorMessage = useBlockError(s => s.blockErrorMessage)
    const { isAnyCoverModalOpened, isAnyJumpingListOpened } = useAnyCoverModalState()

    return (
        <>
            <AppTitle />
            <LogBookButton />
            <CoverAppTitle block={!!blockErrorMessage}/>
            <AuthPageAnim>
                <div id="auth_panel-cont" className={`cont ${blockErrorMessage && 'block'}`}>
                    <div id="signs-cont" className="cont">
                        <SignInCont
                            actForm={coverPanelState}
                            isFormDisabled={isAnyJumpingListOpened || !!blockErrorMessage}
                        />
                        <SignUpCont
                            actForm={coverPanelState}
                            isFormDisabled={isAnyJumpingListOpened || !!blockErrorMessage}
                            isAnyCoverModalOpened={isAnyCoverModalOpened}
                        />
                        {coverPanelState !== 'sign_in' &&
                            <SignUpInfoCont
                                actForm={coverPanelState}
                                isFormDisabled={isAnyJumpingListOpened || !!blockErrorMessage}
                                isAnyCoverModalOpened={isAnyCoverModalOpened}
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