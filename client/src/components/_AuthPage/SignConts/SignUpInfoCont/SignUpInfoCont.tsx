import React from 'react'
import SignUpInfoForm from './SignUpInfoForm/SignUpInfoForm'
import { AVATARS_LIST, JOBS_LIST, STORES_LIST } from '../../../../assets/AuthPage/AuthPage-data'
import { SignContProps } from "../../../../types/Auth-types"



const SignUpInfoCont = ({ actForm, isFormDisabled }: SignContProps) => {

    return ( 
        <section
            id='sign_up_info-cont'
            className={`sign-cont cont ${actForm === 'sign_up_info' ? 'active' : ''}`}
        >
            <SignUpInfoForm
                STORES_LIST={STORES_LIST}
                JOBS_LIST={JOBS_LIST}
                AVATARS_LIST={AVATARS_LIST}
                isFormDisabled={isFormDisabled || actForm !== 'sign_up_info'}
                isAvatarButDisabled={actForm !== 'sign_up_info'}
            />
        </section>
     )
}
 
export default SignUpInfoCont