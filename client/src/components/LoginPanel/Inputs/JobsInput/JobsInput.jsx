import { useState, useRef, useEffect } from 'react'
import { GrUserWorker } from "react-icons/gr"
import { useFocusInput } from "../../../../Hooks/useFocusInput"
import { useClickOutside } from "../../../../Hooks/useClickOutside"
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../InputsCleaner/InputsCleaner'



const JobsInput = ({ name, register, error=null, reset, setValue, setError, watch }) => {

    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isValid, setIsValid] = useState(false)
    
    const dropDownRef = useRef(null)
    const inputRef = useRef(null)

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

    
    const JOBS_LIST_FILTERED = watch(name) ? 
        JOBS_LIST.filter(el => el.title.toLowerCase().includes(watch(name)?.toLowerCase())) : 
        JOBS_LIST

    // console.log(error)
    
    const handleChangeJobsInput = (e) => {
        // console.log(e.target.value)
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/, '');
        if (/[^а-яА-ЯёЁ]/.test(e.target.value)) {
            // console.log('close')
            setIsDropDownOpened(false)
        }else {
            // console.log('open')
            !isDropDownOpened && e.target.value ? setIsDropDownOpened(true) : null
        }
        e.target.value ? changeInput(e) : clearInput()
    }

    const changeInput = (e) => {
        setIsCleanerOpened(true)
    }

    const handleSetJobName = (e) => {
        if (e.target.tagName === 'LI') {
            setValue(name, e.target.textContent)
            setIsDropDownOpened(false)
            setIsCleanerOpened(true)
            setError(name, null)
            //! useFocusInput(inputRef)
        }
    }
    
    useClickOutside(dropDownRef, () => {
        setIsDropDownOpened(false)
    }, inputRef)

    const clearInput = () => {
        // console.log('clear')
        reset(name)
        setIsCleanerOpened(false)
        useFocusInput(inputRef)
        setError(name, null)
    }

    const { ref, ... rest_register } = register(name, { 
        required: true,
        validate: {
            isNotLatin: (val) => !/[a-zA-Z]/.test(val) || 
                'Поле должно содержать лишь кириллицу',
            isInList: (val) => JOBS_LIST.some(el => el.title === val) ||
                'Такой должности нет в списке'
        },
        onChange: (e) => {
            handleChangeJobsInput(e)
        },
    })

    return ( 
        <div className="jobs_input-cont input-cont cont">
            <input
                {... rest_register}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
                maxLength={20}
                className='jobs_input'
                placeholder='Должность'
                onFocus={ () => {
                    (watch(name) && error?.type !== 'isNotLatin') ? setIsDropDownOpened(true) : null
                }}
            />
            <GrUserWorker className='input-icon'/>
            <InputsError error={error} />
            <InputsCleaner opened={isCleanerOpened} onClick={clearInput} />
            <ul
                id='dropdown_jobs-cont'
                className={isDropDownOpened ? 'opened' : ''}
                onClick={handleSetJobName}
                ref={dropDownRef}
            >
                {
                    !JOBS_LIST_FILTERED[0] ?
                        <span className='cont'>Такой должности нет</span> :
                        JOBS_LIST_FILTERED.map((el) => {
                            return <li key={el.id}>{el.title}</li>
                        })
                }
            </ul>
        </div>
     )
}
 
export default JobsInput