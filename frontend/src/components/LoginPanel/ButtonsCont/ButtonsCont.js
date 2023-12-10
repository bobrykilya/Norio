



const ButtonsCont = () => {

    return (
        <div id='buts-cont' className='cont'>
            {/* <button
                id='new-user-but'
                title='Создать заявку на регистрацию нового пользователя'
                className='cont'>
                    <i className="fa-regular fa-address-card"></i>
            </button> */}
            <button 
                id='pwa-but'
                title='Создать ярлык на рабочем столе'
                className='cont'>
                    <i className="fa-solid fa-desktop"></i>
            </button>
            <button
                id='info-but'
                title='Описание приложения и инструкция'
                className='cont'>
                    <i className="fa-solid fa-info"></i>
            </button>
        </div>
    )
}

export default ButtonsCont