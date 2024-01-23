import SignUpSecondForm from './SignUpSecondForm/SignUpSecondForm'




const SignUpSecondCont = ({ coverPanelState }) => {

    // console.log(coverPanelState)

    return ( 
        <section
            id='sign_up_2-cont'
            className={`sign-cont cont ${coverPanelState === 'opened_sign_up_2' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Ещё немного<br/>данных...</h1>
            </div>
            < SignUpSecondForm />
        </section>
     )
}
 
export default SignUpSecondCont