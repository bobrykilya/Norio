import { useContext } from 'react'
import { AuthContext } from '../../../../context/Auth-context'
import SignUpInfoForm from './SignUpInfoForm/SignUpInfoForm'



const SignUpInfoCont = ({ act_form }) => {

    const { listOfUsedAvatars } = useContext(AuthContext)

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
            id: 'hippopotamus_2',
            title: 'Бегемотик',
        },
        {
            id: 'lion',
            title: 'Лев',
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
            id: 'bear_5',
            title: 'Красный мишка',
        },
        {
            id: 'panda',
            title: 'Панда',
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
            id: 'dog_3',
            title: 'Пёс "Колли"',
        },
        {
            id: 'dog_4',
            title: 'Пёс "Мопс"',
        },
        {
            id: 'dog_5',
            title: 'Собака "Боксёр"',
        },
        {
            id: 'dog_6',
            title: 'Пёс "Ретривер"',
        },
        {
            id: 'dog_7',
            title: 'Пёс "Болонка"',
        },
        {
            id: 'dog_8',
            title: 'Псина "Чихуахуа"',
        },
        {
            id: 'dog_9',
            title: 'Соня Светлановна',
        },
        {
            id: 'beaver',
            title: 'Бобрик',
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
            id: 'weasel',
            title: 'Хорёк',
        },
        {
            id: 'cheetah',
            title: 'Гепардесса',
        },
        {
            id: 'hyena',
            title: 'Гиена',
        },
        {
            id: 'pigeon',
            title: 'Голубь',
        },
        {
            id: 'dolphin',
            title: 'Дельфин',
        },
        {
            id: 'raccoon',
            title: 'Енот',
        },
        {
            id: 'giraffe',
            title: 'Жираф',
        },
        {
            id: 'zebra',
            title: 'Зебра',
        },
        {
            id: 'monkey',
            title: 'Обезьянка "Игрунка"',
        },
        {
            id: 'monkey_2',
            title: 'Обезьянка "Лари"',
        },
        {
            id: 'monkey_3',
            title: 'Обезьяна "Макака"',
        },
        {
            id: 'monkey_4',
            title: 'Обезьяна "Шимпанзе"',
        },
        {
            id: 'kangaroo',
            title: 'Кенгуру',
        },
        {
            id: 'koala',
            title: 'Коала',
        },
        {
            id: 'horse',
            title: 'Конь в пальто',
        },
        {
            id: 'cat',
            title: 'Кошка "Экзотическая"',
        },
        {
            id: 'cat_2',
            title: 'Кошка "Русская голубая"',
        },
        {
            id: 'cat_4',
            title: 'Кошка "Лысая"',
        },
        {
            id: 'cat_5',
            title: 'Кот "Шартрез"',
        },
        {
            id: 'cat_3',
            title: 'Котёнок',
        },
        {
            id: 'rabbit',
            title: 'Кролик',
        },
        {
            id: 'lama',
            title: 'Лама',
        },
        {
            id: 'lemur',
            title: 'Лемур',
        },
        {
            id: 'sloth',
            title: 'Ленивец',
        },
        {
            id: 'sloth_2',
            title: 'Ленивец упоротый',
        },
        {
            id: 'fox',
            title: 'Лиса',
        },
        {
            id: 'fox_2',
            title: 'Лисичка "Фенек"',
        },
        {
            id: 'frog',
            title: 'Лягушка',
        },
        {
            id: 'walrus',
            title: 'Морж',
        },
        {
            id: 'muntjac',
            title: 'Мунтжак',
        },
        {
            id: 'deer',
            title: 'Олень',
        },
        {
            id: 'owl',
            title: 'Сова',
        },
        {
            id: 'tawny_owl',
            title: 'Неясыть',
        },
        {
            id: 'rhinoceros',
            title: 'Носорог',
        },
        {
            id: 'sheep',
            title: 'Овец',
        },
        {
            id: 'eagle',
            title: 'Орёл',
        },
        {
            id: 'panther',
            title: 'Пантера',
        },
        {
            id: 'penguin',
            title: 'Пингвин',
        },
        {
            id: 'penguin_2',
            title: 'Пингвин дикий',
        },
        {
            id: 'parrot',
            title: 'Попугай "Ара"',
        },
        {
            id: 'parrot_2',
            title: 'Попугай "Неразлучник"',
        },
        {
            id: 'parrot_3',
            title: 'Попугай "Какаду"',
        },
        {
            id: 'lynx',
            title: 'Рысь',
        },
        {
            id: 'skunk',
            title: 'Скунс',
        },
        {
            id: 'elephant',
            title: 'Слон',
        },
        {
            id: 'ostrich',
            title: 'Страус',
        },
        {
            id: 'tasmanian_devil',
            title: 'Тасманский дьяволёнок',
        },
        {
            id: 'tiger',
            title: 'Тигр (Ауф)',
        },
        {
            id: 'chameleon',
            title: 'Хамелеон',
        },
        {
            id: 'chameleon_2',
            title: 'Хамелеон улыбака',
        },
        {
            id: 'hamster',
            title: 'Хомяк',
        },
        {
            id: 'lamb',
            title: 'Ягнёнок поварёнок',
        },
        {
            id: 'lamb_2',
            title: 'Ягнёнок зуммер',
        },
        {
            id: 'lamb_3',
            title: 'Ягнёнок девочка',
        },
        {
            id: 'jaguar',
            title: 'Ягуарёнок',
        },
        {
            id: 'ram',
            title: 'Баран',
        },
        {
            id: 'binturong',
            title: 'Бинтуронг',
        },
        {
            id: 'hedgehog',
            title: 'Ёжик',
        },
        {
            id: 'kinkajou',
            title: 'Кинкажу',
        },
        {
            id: 'kookaburra',
            title: 'Кукабара',
        },
        {
            id: 'mouse',
            title: 'Мышь',
        },
        {
            id: 'seal',
            title: 'Тюлень',
        },
    ]

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