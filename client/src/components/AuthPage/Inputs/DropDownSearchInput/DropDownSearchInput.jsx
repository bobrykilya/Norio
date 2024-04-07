import { useState, useRef } from 'react'
import { useFocusInput } from "../../../../hooks/useFocusInput"
import { useClickOutside } from "../../../../hooks/useClickOutside"
import { useCapitalize } from '../../../../hooks/useCapitalize';
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../InputsCleaner/InputsCleaner'



const DropDownSearchInput = ({ LIST, name, placeholder, icon, register, error=null, reset, setValue, setError, watch, disabled=false }) => {

    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    
    const dropDownRef = useRef(null)
    const inputRef = useRef(null)
    
    
    const filterAndSortList = (list) => {
        const val = watch(name)?.toLowerCase().trim()
        const filtered_list = list.filter(el => el.title.toLowerCase().includes(val))
        const filtered_sorted_list = filtered_list.sort(
            (el_1, el_2) => el_1.title.toLowerCase().indexOf(val) > el_2.title.toLowerCase().indexOf(val) ? 1 : -1
        )
        // console.log(filtered_sorted_list)
        return filtered_sorted_list
    }
        
    const LIST_FILTERED = watch(name) ? filterAndSortList(LIST) : LIST
    // console.log(error)
    
    const handleChangeInput = (e) => {
        // console.log(e.target.value)
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ ]/, '')
        e.target.value = useCapitalize(e.target.value)
        if (/[^а-яА-ЯёЁ ]/.test(e.target.value)) {
            // console.log('close')
            toggleDropDown(false)
        }else if (isValueInList(e.target.value)) {
            toggleDropDown(false)
        }else {
            // console.log('open')
            !isDropDownOpened && e.target.value ? toggleDropDown(true) : null
        }
        e.target.value ? changeInput() : clearInput()
    }
    const toggleDropDown = (pos) => {
        if (pos) {
            if (error?.type === 'isNotLatin') return
            setIsDropDownOpened(true)
            dropDownRef.current.scrollTo({ top: 0, behavior: 'smooth'})
        }else
            setIsDropDownOpened(false)
    }

    const changeInput = () => {
        setIsCleanerOpened(true)
    }

    const handleSetElemName = (e) => {
        // console.log(e.target)
        if (e.target.tagName === 'BUTTON' && isDropDownOpened) {
            setValue(name, e.target.textContent)
            toggleDropDown(false)
            setIsCleanerOpened(true)
            setError(name, null)
        }
    }
    
    useClickOutside(dropDownRef, () => {
        toggleDropDown(false)
    }, inputRef)

    const clearInput = () => {
        // console.log('clear')
        reset(name)
        setIsCleanerOpened(false)
        useFocusInput(inputRef)
        setError(name, null)
    }

    const isValueInList = (val, list=LIST) =>{
        return list.some(el => el.title.toLowerCase() === val.trim().toLowerCase())
    }
    
    const handleClickInput = (e) => {

        if (!isDropDownOpened) {
            switch(e.code) {
                case 'ArrowDown':
                    e.preventDefault()
                    toggleDropDown(true)
                    break
                case 'Enter':
                    e.preventDefault()
                    break
                default:
                    return
            }
        }else {
            switch(e.code) {
                case 'Tab': 
                    toggleDropDown(false)
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    focusJumping('next')
                    break
                case 'Enter':
                    focusJumping('next')
                    break
                case 'Escape':
                    toggleDropDown(false)
                    break
            }
        }

    }

    const handleClickElem = (e) => {
        // console.log(e.code)
        if (e.code.includes('Arrow'))  
            e.preventDefault() 
        // else return

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
            case 'Escape':
                useFocusInput(inputRef)
                toggleDropDown(false)
                break
            case 'Enter':
                break
            default:
                useFocusInput(inputRef)
                setTimeout(() => (useFocusInput(inputRef)), 10)
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
                `Поле '${placeholder}' должно содержать лишь кириллицу`,
            isInList: (val) => isValueInList(val) ||
                `Введена неизвестная ${placeholder.toLowerCase()}`
        },
        onChange: (e) => {
            handleChangeInput(e)
        },
    })

    // console.log(error)
    return ( 
        <div className={`dropdown_input-cont input-cont cont ${error?.message ? 'error' : ''}`}>
            <span 
                className='input-label'
                onClick={() => useFocusInput(inputRef)}
            >
                {placeholder}
            </span>
            <input
                {... rest_register}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
                maxLength={23}
                className='dropdown_input'
                placeholder={placeholder}
                autoComplete='none'
                onKeyDown={handleClickInput}
                onFocus={ () => {
                    if (watch(name) && !isValueInList(watch(name)))
                        toggleDropDown(true)
                }}
                disabled={disabled}
            />
            {icon}
            <InputsError error={error} onClick={() => useFocusInput(inputRef)} />
            <InputsCleaner opened={isCleanerOpened} onClick={clearInput} />
            <ul
                id='dropdown-cont'
                className={`${isDropDownOpened ? 'opened' : ''}`}
                onClick={handleSetElemName}
                tabIndex={-1}
                ref={dropDownRef}
            >
                {
                    !LIST_FILTERED[0] ?
                        <span className='cont'>Такого значения нет в базе</span> :
                        LIST_FILTERED.map((el) => {
                            // console.log(LIST_FILTERED.indexOf(el))
                            return <button 
                                        key={el.id} 
                                        tabIndex={-1} 
                                        onKeyDown={handleClickElem}
                                        disabled={disabled}
                                    >
                                        {el.title}
                                    </button>
                        })
                }
            </ul>
        </div>
     )
}
 
export default DropDownSearchInput