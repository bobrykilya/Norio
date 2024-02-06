import SignUpSecondForm from './SignUpSecondForm/SignUpSecondForm'




const SignUpSecondCont = ({ act_form }) => {

    // console.log('Form updated')
    const STORES_LIST = [
        {
            id: '1',
            title: 'Офис'
        },
        {
            id: '2',
            title: 'Красное'
        },
        {
            id: '3',
            title: 'Полоцк'
        },
        {
            id: '4',
            title: 'БелМаш'
        },
        {
            id: '5',
            title: 'Тюрли'
        },
        {
            id: '6',
            title: 'Глубокое'
        },
        {
            id: '7',
            title: 'Радошковичи'
        },
        {
            id: '8',
            title: 'Спутник'
        },
        {
            id: '9',
            title: 'Либава'
        },
    ]

    const JOBS_LIST = [
        {
            id: 1,
            title: 'Сис. админ.',
        },
        {
            id: 2,
            title: 'Продавец',
        },
        {
            id: 3,
            title: 'Старший продавец',
        },
        {
            id: 4,
            title: 'Бухгалтер',
        },
        {
            id: 5,
            title: 'Менеджер',
        },
        {
            id: 6,
            title: 'Инженер',
        },
        {
            id: 7,
            title: 'Инспектор по кадрам',
        },
        {
            id: 8,
            title: 'Секретарь',
        },
        {
            id: 9,
            title: 'Грузчик',
        },
        {
            id: 10,
            title: 'Механик',
        },
        {
            id: 11,
            title: 'Электрик',
        },
        {
            id: 12,
            title: 'Мерчендайзер',
        },
        {
            id: 13,
            title: 'Кассир',
        },
        {
            id: 14,
            title: 'Старший кассир',
        },
        {
            id: 15,
            title: 'Оператор',
        },
        {
            id: 16,
            title: 'Заведующий',
        },
        {
            id: 17,
            title: 'Заведующий магазинами',
        },
        {
            id: 18,
            title: 'Главный менеджер',
        },
        {
            id: 19,
            title: 'Главный инженер',
        },
        {
            id: 20,
            title: 'Главный бухгалтер',
        },
        {
            id: 21,
            title: 'Управляющий',
        },
    ]

    const AVATARS_LIST = [
        {
            id: 'squirrel',
            title: 'Белка',
        },
        {
            id: 'wolf',
            title: 'Волк',
        },
        {
            id: 'wolf_2',
            title: 'Белый волк',
        },
        {
            id: 'hippopotamus',
            title: 'Бегемот',
        },
        {
            id: 'lion_2',
            title: 'Лев альбинос',
        },
        {
            id: 'bear',
            title: 'Бурый медведь',
        },
        {
            id: 'bear_2',
            title: 'Белый медведь',
        },
        {
            id: 'bear_3',
            title: 'Белый мишка',
        },
        {
            id: 'bear_4',
            title: 'Чёрный мишка',
        },
        {
            id: 'dog',
            title: 'Пёс "Бигль"',
        },
        {
            id: 'dog_2',
            title: 'Пёс "Бульдог"',
        },
        {
            id: 'beaver',
            title: 'Бобр',
        },
        {
            id: 'antelope',
            title: 'Антилопа',
        },
        {
            id: 'buffalo',
            title: 'Буйвол',
        },
        {
            id: 'bull',
            title: 'Бык',
        },
        {
            id: 'otter',
            title: 'Выдра',
        },
        {
            id: 'cheetah',
            title: 'Гепардесса ',
        },
    ]

    return ( 
        <section
            id='sign_up_2-cont'
            className={`sign-cont cont ${act_form === 'sign_up_2' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Личные данные</h1>
            </div>
            < SignUpSecondForm STORES_LIST={STORES_LIST} JOBS_LIST={JOBS_LIST} AVATARS_LIST={AVATARS_LIST} isFormBlur={act_form !== 'sign_up_2'} />
        </section>
     )
}
 
export default SignUpSecondCont