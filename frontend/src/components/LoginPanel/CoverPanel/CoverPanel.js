import './CoverPanel.sass'


const CoverPanel = () => {
    return ( 
        <div id='cover-cont' className='cont'>
            <div id='cover' className='cont'>
                <h1>Новенький?</h1>
                <p>Ты можешь подать заявку на регистрацию и в скором времени приступить к работе</p>
                <button id='toggle-but'>
                    <label for="toggle-but">
                        Регистрация
                    </label>
                </button>
            </div>
        </div>
     )
}
 
export default CoverPanel