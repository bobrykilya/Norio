import React, { useRef, useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { capitalize } from '../../../../../utils/capitalize'
import { IDataListElement } from "../../../../../assets/AuthPage/AuthPage-data"
import { ISignFormInput } from "../../../../../types/Auth-types"
import timeout from "../../../../../utils/timeout"
import { sortByValPosInString } from "../../../../../utils/sort"
import { ICommonVar } from "../../../../../../../common/types/Global-types"
import InputField from "../InputField/InputField"
import DropDown from "../../../DropDown/DropDown"



type DropDownSearchInputProps = ISignFormInput & {
    LIST: IDataListElement[];
    placeholder: string;
    icon: ICommonVar['icon'];
}
const DropDownSearchInput = ({ LIST, name, placeholder, icon, register, error=null, reset, setValue, setError, watch, disabled=false }: DropDownSearchInputProps) => {

    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    
    const dropDownRef = useRef(null)
    const inputRef = useRef(null)
    
    
    const filterAndSortList = ({ search, list }) => {
        const val = search.toLowerCase().trim()
        const filtered_list = list.filter((el: IDataListElement) => el.title.toLowerCase().includes(val))
        return sortByValPosInString(filtered_list, val, 'title')
    }
        
    const LIST_FILTERED = watch(name) ? filterAndSortList({ search: watch(name), list: LIST }) : LIST
    // console.log(error)
    
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ ]/, '')
        e.target.value = capitalize(e.target.value)

        if (/[^а-яА-ЯёЁ ]/.test(e.target.value)) {
            toggleDropDown(false)
        } else if (isValueInList(e.target.value)) {
            toggleDropDown(false)
        } else {
            !isDropDownOpened && e.target.value ? toggleDropDown(true) : null
        }

        e.target.value ? changeInput() : clearInput()
    }

    const toggleDropDown = (pos: boolean) => {
        if (pos) {
            if (error?.type === 'isNotLatin') return
            setIsDropDownOpened(true)
            dropDownRef.current.scrollTo({ top: 0, behavior: 'smooth'})
        } else {
            setIsDropDownOpened(false)
        }
    }

    const changeInput = () => {
        if (!isCleanerOpened)
            setIsCleanerOpened(true)
    }

    const setInputValue = (value: string)=> {
        setValue(name, value)
        toggleDropDown(false)
        setIsCleanerOpened(true)
        setError(name, null)
    }

    const handleClickElem = async (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        // console.log(e.target)
        if ((e.target as HTMLElement).tagName === 'BUTTON' && isDropDownOpened) {
            e.preventDefault()
            setInputValue((e.target as HTMLElement).textContent)
            await focusInput(inputRef)
        }
    }

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

    const handleFocusInput = () => {
        if (watch(name) && !isValueInList(watch(name)) && !isDropDownOpened) {
            toggleDropDown(true)
        }
        dropDownRef.current.firstChild.classList.add('active')
    }
    const handleBlurInput = () => {
        dropDownRef.current.firstChild.classList.remove('active')
    }
    
    const handleKeyDownOnInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(e.code)

        if (!isDropDownOpened) {
            switch(e.code) {
                case 'ArrowDown':
                    toggleDropDown(true)
                    break
                default:
                    return
            }
        } else {
            switch(e.code) {
                case 'Tab':
                    e.preventDefault()
                    if (LIST_FILTERED[0]) {
                        setInputValue(dropDownRef.current.firstChild.innerHTML)
                    }
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    const firstElem = dropDownRef.current.firstChild
                    if (firstElem) {
                        firstElem.classList.remove("active")
                        firstElem.nextElementSibling?.focus()  //* second element focus
                    }
                    break
                case 'Enter':
                    // e.preventDefault()
                    setInputValue(dropDownRef.current.firstChild.innerHTML)
                    break
                case 'Escape':
                    await timeout(100)
                        .then(() => {
                            toggleDropDown(false)
                        })
            }
        }

    }

    const handleKeyDownOnElem = async (e: React.KeyboardEvent<HTMLButtonElement>) => {
        // console.log(e.code)
        if (e.code.includes('Arrow') || e.code === 'Tab') {
            e.preventDefault()
        }

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
            case 'Tab':
            case 'Enter':
                setInputValue(document.activeElement.innerHTML)
                await focusInput(inputRef)
                break
            default:
                await focusInput(inputRef)
                    .then(async () => await focusInput(inputRef))
                break
        }
    }

    const focusJumping = async (route: 'next' | 'prev') => {
        const active = document.activeElement as HTMLElement
        switch(route) {
            case 'next':
                (active.nextElementSibling as HTMLElement)?.focus()
                break
            case 'prev':
                const elem = active.previousElementSibling as HTMLElement
                if (elem.previousElementSibling) {
                    elem.focus()
                } else {
                    elem.focus()
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
        onChange: handleChangeInput,
    })


    return (
        <InputField
            contClassName={'dropdown_input-cont'}
            inputIcon={icon}
            register={{
                ref,
                rest_register
            }}
            error={error}
            inputRef={inputRef}
            inputParams={{
                maxLength: 23,
                placeholder,
                autoComplete: 'none',
                onKeyDown: handleKeyDownOnInput,
                onFocus: handleFocusInput,
                onBlur: handleBlurInput,
                disabled,
            }}
            cleanerParams={{
                isCleanerOpened: isCleanerOpened,
                handleClickCleaner: clearInput
            }}
        >
            <DropDown
                onClick={handleClickElem}
                ref={dropDownRef}
                isScrollContent={true}
                closeHooksParams={{
                    butRef: inputRef,
                    callback: () => toggleDropDown(false),
                    conditionsList: [isDropDownOpened]
                }}
            >
                {
                    !LIST_FILTERED[0] ?
                        <span className='cont'>Такого значения нет в базе</span> :
                        LIST_FILTERED.map((el: IDataListElement, i: number) => {
                            return <button
                                key={el.id}
                                tabIndex={-1}
                                onKeyDown={handleKeyDownOnElem}
                                disabled={disabled}
                                className={i===0 ? `active` : ''}
                            >
                                {el.title}
                            </button>
                        })
                }
            </DropDown>
        </InputField>
     )
}
 
export default DropDownSearchInput