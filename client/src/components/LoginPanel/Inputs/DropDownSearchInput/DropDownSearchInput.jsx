import { useState, useRef } from 'react'
import { useFocusInput } from "../../../../Hooks/useFocusInput"
import { useClickOutside } from "../../../../Hooks/useClickOutside"
import { useCapitalize } from '../../../../Hooks/useCapitalize';
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../InputsCleaner/InputsCleaner'



const DropDownSearchInput = ({ LIST, name, placeholder, icon, register, error=null, reset, setValue, setError, watch }) => {

    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isErrorOn, setIsErrorOn] = useState(true)
    
    const dropDownRef = useRef(null)
    const inputRef = useRef(null)
    
    const LIST_FILTERED = watch(name) ? 
        LIST.filter(el => el.title.toLowerCase().includes(watch(name)?.toLowerCase())) : 
        LIST

    // console.log(error)
    
    const handleChangeInput = (e) => {
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

    const handleSetElemName = (e) => {
        if (e.target.tagName === 'BUTTON') {
            setValue(name, e.target.textContent)
            setIsDropDownOpened(false)
            setIsCleanerOpened(true)
            isErrorOn ? setIsErrorOn(false) : null
            setError(name, null)
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

    const isValueInList = (val, list=LIST) =>{
        return list.some(el => el.title.toLowerCase() === val.toLowerCase())
    }
    
    const handleInputClick = (e) => {
        switch(e.code) {
            case 'Tab': {
                isDropDownOpened ? setIsDropDownOpened(false) : null
            }
            case 'ArrowDown': {
                e.preventDefault()
                if (isDropDownOpened) {
                    focusJumping('next')
                }
            }
        }
    }

    const handleElemClick = (e) => {
        if (e.code.includes('Arrow'))  
            e.preventDefault() 
        else return

        switch(e.code) {
            case 'ArrowUp': 
                focusJumping('prev')
                break
            case 'ArrowDown': 
                focusJumping('next')
                break
            case 'ArrowLeft': 
                focusJumping('prev')
                break
            case 'ArrowRight': 
                focusJumping('next')
                break
        }
    }

    const focusJumping = (route) => { 
        const active = document.activeElement
        switch(route) {
            case 'next':
                active.tagName === 'INPUT' ? dropDownRef.current.firstChild?.focus() :
                    active.nextElementSibling?.focus()
                break
            case 'prev':
                try {
                    active.previousElementSibling.focus()
                }catch {
                    useFocusInput(inputRef)
                }
                break
        }
    }

    const { ref, ... rest_register } = register(name, { 
        required: true,
        validate: {
            isNotLatin: (val) => !/[a-zA-Z]/.test(val) || 
                'Поле должно содержать лишь кириллицу',
            isInList: (val) => isValueInList(val) ||
                'Такого значения нет в базе'
        },
        onChange: (e) => {
            handleChangeInput(e)
        },
    })

    return ( 
        <div className="dropdown_input-cont input-cont cont">
            <input
                {... rest_register}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
                maxLength={20}
                className='dropdown_input'
                placeholder={placeholder}
                autoComplete='none'
                onKeyDown={handleInputClick}
                onFocus={ () => {
                    (watch(name) && 
                    error?.type !== 'isNotLatin' &&
                    !isValueInList(watch(name))) ? setIsDropDownOpened(true) : null
                }}
            />
            {icon}
            {isErrorOn ? <InputsError error={error} /> : null}
            <InputsCleaner opened={isCleanerOpened} onClick={clearInput} />
            <ul
                id='dropdown-cont'
                className={`${isDropDownOpened ? 'opened' : ''}`}
                onClick={handleSetElemName}
                ref={dropDownRef}
            >
                {
                    !LIST_FILTERED[0] ?
                        <span className='cont'>Такого значения нет в базе</span> :
                        LIST_FILTERED.map((el) => {
                            // console.log(LIST_FILTERED.indexOf(el))
                            return <button key={el.id} tabIndex={-1} onKeyDown={handleElemClick}>{el.title}</button>
                        })
                }
            </ul>
        </div>
     )
}
 
export default DropDownSearchInput