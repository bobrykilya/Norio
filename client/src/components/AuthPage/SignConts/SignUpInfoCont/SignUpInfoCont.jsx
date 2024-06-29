import { useContext } from 'react'
import { AuthContext } from '../../../../context/Auth-context'
import SignUpInfoForm from './SignUpInfoForm/SignUpInfoForm'
import { AVATARS_LIST, JOBS_LIST, STORES_LIST } from '../../../../assets/AuthPage/AuthPage-data'



const SignUpInfoCont = ({ act_form }) => {

    const { listOfUsedAvatars } = useContext(AuthContext)

    // console.log('Form updated')

        const FILTERED_LIST = listOfUsedAvatars[0] ? AVATARS_LIST.filter(avatar => !listOfUsedAvatars.includes(avatar.id)) : AVATARS_LIST //* Filtering of used avatars
        const SORTED_AND_FILTERED_LIST = FILTERED_LIST.sort((a, b) => a.title.localeCompare(b.title)) //* Sorting of avatar list by title

    return ( 
        <section
            id='sign_up_info-cont'
            className={`sign-cont cont ${act_form === 'sign_up_info' ? 'active' : ''}`}
        >
            < SignUpInfoForm STORES_LIST={STORES_LIST} JOBS_LIST={JOBS_LIST} AVATARS_LIST={SORTED_AND_FILTERED_LIST} isFormBlur={act_form !== 'sign_up_info'} />
        </section>
     )
}
 
export default SignUpInfoCont