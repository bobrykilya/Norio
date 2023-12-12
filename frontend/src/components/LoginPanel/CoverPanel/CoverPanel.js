



const CoverPanel = () => {

    const cover_cont = document.getElementById('cover-cont')
    const sign_in_cont = document.getElementById('sign_in-cont')
    const sign_up_cont = document.getElementById('sign_up-cont')

    const handleToggleCoverPanel = () => {
        cover_cont.classList.toggle('opened_sign_up')
        sign_in_cont.classList.toggle('active')
        sign_up_cont.classList.toggle('active')
    }

    return ( 
        <div id='cover-cont' className='cont opened_sign_up'>
            <div id='cover-content' className='cont'>
                <section id='sign_up_info-cont' className='cont'>
                    <h1>Нет аккаунта?</h1>
                    <p>Подай заявку на регистрацию и дождись активации профиля пользователя</p>
                    <button id='open_sign_up-but' onClick={handleToggleCoverPanel}>
                        <label htmlFor="open_sign_up-but">
                            Регистрация
                        </label>
                    </button>
                </section>
                <section id='sign_in_info-cont' className='cont'>
                    <h1>Есть аккаунт?</h1>
                    <p>Выполни вход по регистрационным данным</p>
                    <button id='open_sign_in-but' onClick={handleToggleCoverPanel}>
                        <label htmlFor="open_sign_in-but">
                            Авторизация
                        </label>
                    </button>
                </section>
            </div>
        </div>
     )
}
 
export default CoverPanel