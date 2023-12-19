



const ButtonsCont = () => {

    return (
        <div className='buts-cont cont'>
            {/* <button
                id='new-user-but'
                title='Создать заявку на регистрацию нового пользователя'
                className='cont'>
                    <i className="fa-regular fa-address-card"></i>
            </button> */}
            <button 
                title='Создать ярлык на рабочем столе'
                className='pwa-but cont'
                tabIndex={-1}
                >
                    <i className="fa-solid fa-desktop"></i>
            </button>
            <button
                title='Описание приложения и инструкция'
                className='info-but cont'
                tabIndex={-1}
                >
                    <i className="fa-solid fa-info"></i>
            </button>
        </div>
    )
}

export default ButtonsCont