import React from 'react'
import SignUpInfoForm from './SignUpInfoForm/SignUpInfoForm'
import { AVATARS_LIST, JOBS_LIST, STORES_LIST } from '../../../../assets/AuthPage/AuthPage-data'


interface SignUpInfoContProps {
    act_form: string;
}
const SignUpInfoCont = ({ act_form }: SignUpInfoContProps) => {
    // console.log('Form updated')

    return ( 
        <section
            id='sign_up_info-cont'
            className={`sign-cont cont ${act_form === 'sign_up_info' ? 'active' : ''}`}
        >
            < SignUpInfoForm STORES_LIST={STORES_LIST} JOBS_LIST={JOBS_LIST} AVATARS_LIST={AVATARS_LIST} isFormBlur={act_form !== 'sign_up_info'} />
        </section>
     )
}
 
export default SignUpInfoCont