import { useState, useRef, useEffect } from 'react'
import { GrUserWorker } from "react-icons/gr"
import { useFocusInput } from "../../../../Hooks/useFocusInput"
import { useClickOutside } from "../../../../Hooks/useClickOutside"
import { useCapitalize } from './../../../../Hooks/useCapitalize';
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../InputsCleaner/InputsCleaner'



const JobsInput = ({ name, register, error=null, reset, setValue, setError, watch }) => {

    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isErrorOn, setIsErrorOn] = useState(true)
    const [focusJobNum, setFocusJobNum] = useState(false)
    
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
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ ]/, '')
        e.target.value = useCapitalize(e.target.value)
        if (/[^а-яА-ЯёЁ ]/.test(e.target.value)) {
            // console.log('close')
            setIsDropDownOpened(false)
        }else if (isValueInList(e.target.value)) {
            isErrorOn && isDropDownOpened ? setIsErrorOn(false) : null
            setIsDropDownOpened(false)
        }else {
            // console.log('open')
            !isDropDownOpened && e.target.value ? setIsDropDownOpened(true) : null
        }
        e.target.value ? changeInput(e) : clearInput()
    }

    const changeInput = (e) => {
        !isErrorOn ? setIsErrorOn(true) : null
        setIsCleanerOpened(true)
    }

    const handleSetJobName = (e) => {
        if (e.target.tagName === 'BUTTON') {
            setValue(name, e.target.textContent)
            setIsDropDownOpened(false)
            setIsCleanerOpened(true)
            isErrorOn ? setIsErrorOn(false) : null
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
        isErrorOn && isDropDownOpened ? setIsErrorOn(false) : null
        setError(name, null)
    }

    const isValueInList = (val, list=JOBS_LIST) =>{
        return list.some(el => el.title.toLowerCase() === val.toLowerCase())
    }
    
    const handleTabClick = (e) => {
        // console.log(e)
        if (e.code === 'Tab') {
            isDropDownOpened ? setIsDropDownOpened(false) : null
        }
    }

    const handleArrowsClick = (e) => {
        // console.log(e)
        const dropdown_jobs_list = document.querySelectorAll('#dropdown_jobs-cont button')
        console.log(dropdown_jobs_list[0])
        if (e.code === 'ArrowDown') {
            let job_num = focusJobNum
            if (job_num) {
                setFocusJobNum((prev) => Number(prev) + 1)
                job_num = Number(Number(job_num) + 1)
            } else {
                setFocusJobNum(0)
                job_num = 0
            }
            dropdown_jobs_list[job_num].focus()
        }
    }

    const { ref, ... rest_register } = register(name, { 
        required: true,
        validate: {
            isNotLatin: (val) => !/[a-zA-Z]/.test(val) || 
                'Поле должно содержать лишь кириллицу',
            isInList: (val) => isValueInList(val) ||
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
                autoComplete='none'
                onKeyDown={handleTabClick}
                onKeyUp={handleArrowsClick}
                onFocus={ () => {
                    (watch(name) && 
                    error?.type !== 'isNotLatin' &&
                    !isValueInList(watch(name))) ? setIsDropDownOpened(true) : null
                }}
            />
            <GrUserWorker className='input-icon'/>
            {isErrorOn ? <InputsError error={error} /> : null}
            <InputsCleaner opened={isCleanerOpened} onClick={clearInput} />
            <ul
                id='dropdown_jobs-cont'
                className={`${isDropDownOpened ? 'opened' : ''}`}
                onClick={handleSetJobName}
                ref={dropDownRef}
            >
                {
                    !JOBS_LIST_FILTERED[0] ?
                        <span className='cont'>Такой должности нет</span> :
                        JOBS_LIST_FILTERED.map((el) => {
                            // console.log(JOBS_LIST_FILTERED.indexOf(el))
                            return <button key={el.id} tabIndex={-1}>{el.title}</button>
                        })
                }
            </ul>
        </div>
     )
}
 
export default JobsInput