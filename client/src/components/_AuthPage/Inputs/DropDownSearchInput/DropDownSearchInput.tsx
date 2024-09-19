import React, { useRef, useState } from 'react'
import { focusInput } from "../../../../utils/focusInput"
import { capitalize } from '../../../../utils/capitalize'
import { useClickOutside } from "../../../../hooks/useClickOutside"
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../InputsCleaner/InputsCleaner'
import { IDataListElement } from "../../../../assets/AuthPage/AuthPage-data"
import { ISignFormInput } from "../../../../types/Auth-types"



type DropDownSearchInputProps = ISignFormInput & {
    LIST: IDataListElement[];
    placeholder: string;
    icon: React.ReactElement;
}
const DropDownSearchInput = ({ LIST, name, placeholder, icon, register, error=null, reset, setValue, setError, watch, disabled=false }: DropDownSearchInputProps) => {

    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    
    const dropDownRef = useRef(null)
    const inputRef = useRef(null)
    
    
    const filterAndSortList = ({ search, list }) => {
        const val = search.toLowerCase().trim()
        const filtered_list = list.filter((el: IDataListElement) => el.title.toLowerCase().includes(val))
        return filtered_list.sort(
            (el_1: IDataListElement, el_2: IDataListElement) => el_1.title.toLowerCase().indexOf(val) > el_2.title.toLowerCase().indexOf(val) ? 1 : -1
        )
    }
        
    const LIST_FILTERED = watch(name) ? filterAndSortList({ search: watch(name), list: LIST }) : LIST
    // console.log(error)
    
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ ]/, '')
        e.target.value = capitalize(e.target.value)

        if (/[^а-яА-ЯёЁ ]/.test(e.target.value)) {
            toggleDropDown(false)
        }else if (isValueInList(e.target.value)) {
            toggleDropDown(false)
        }else {
            !isDropDownOpened && e.target.value ? toggleDropDown(true) : null
        }

        e.target.value ? changeInput() : clearInput()
    }
    const toggleDropDown = (pos: boolean) => {
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

    const handleSetElemName = (e:  React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        // console.log(e.target)
        // @ts-ignore
        if (e.target.tagName === 'BUTTON' && isDropDownOpened) {
            // @ts-ignore
            setValue(name, e.target.textContent)
            toggleDropDown(false)
            setIsCleanerOpened(true)
            setError(name, null)
        }
    }
    
    useClickOutside(dropDownRef, () => {
        toggleDropDown(false)
    }, inputRef)

    const clearInput = async () => {
        // console.log('clear')
        reset(name)
        setIsCleanerOpened(false)
        await focusInput(inputRef)
        setError(name, null)
    }

    const isValueInList = (val: string, list=LIST) =>{
        return list.some(el => el.title.toLowerCase() === val.trim().toLowerCase())
    }
    
    const handleClickInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {

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
                    await focusJumping('next')
                    break
                case 'Enter':
                    await focusJumping('next')
                    break
                case 'Escape':
                    toggleDropDown(false)
                    break
            }
        }

    }

    const handleClickElem = async (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.code.includes('Arrow'))  
            e.preventDefault()

        switch(e.code) {
            case 'ArrowUp': 
                await focusJumping('prev')
                break
            case 'ArrowDown':
                await focusJumping('next')
                break
            case 'ArrowLeft':
                await focusJumping('prev')
                break
            case 'ArrowRight':
                await focusJumping('next')
                break
            case 'Escape':
                await focusInput(inputRef)
                toggleDropDown(false)
                break
            case 'Enter':
                break
            default:
                await focusInput(inputRef)
                setTimeout(() => (focusInput(inputRef)), 10)
                break
        }
    }

    const focusJumping = async (route: 'next' | 'prev') => {
        const active = document.activeElement
        switch(route) {
            case 'next':
                active.tagName === 'INPUT' ? dropDownRef.current.firstChild?.focus() :
                    // @ts-ignore
                    active.nextElementSibling?.focus()
                break
            case 'prev':
                try {
                    // @ts-ignore
                    active.previousElementSibling.focus()
                }catch {
                    await focusInput(inputRef)
                }
                break
        }
    }

    const { ref, ... rest_register } = register(name, {
        required: true,
        validate: {
            isNotLatin: (val: string) => !/[a-zA-Z]/.test(val) ||
                `Поле '${placeholder}' должно содержать лишь кириллицу`,
            isInList: (val: string) => isValueInList(val) ||
                `Введена неизвестная ${placeholder.toLowerCase()}`
        },
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeInput(e)
        },
    })

    // console.log(error)
    return ( 
        <div className={`dropdown_input-cont input-cont cont ${error?.message ? 'error' : ''}`}>
            <span 
                className='input-label'
                onClick={() => focusInput(inputRef)}
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
            <InputsError error={error} onClick={() => focusInput(inputRef)} />
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
                        LIST_FILTERED.map((el: IDataListElement) => {
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