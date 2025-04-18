import React, { useEffect } from 'react'
import toast, { useToasterStore } from 'react-hot-toast'
import { ICommonVar, SnackBarTypeOptions } from '../../../../../common/types/Global-types'
import { TOAST_LIMIT } from "../../../../constants"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"
import { useModalState } from "../../../stores/Global-store"
import { ICONS } from "../../../assets/common/Icons-data"



type ISnackElem = {
    visible: boolean;
    id: string;
}

type SnackBarProps = {
    title: string;
    icon: ICommonVar['icon'];
    message: string;
    toastElem: ISnackElem;
    type: SnackBarTypeOptions;
}
const SnackBar = ({ title, icon, message, toastElem, type }: SnackBarProps) => {

    const { toasts } = useToasterStore()
    // const setModalState = useModalState(s => s.setModalState)
    const setSnackBarState = useModalState(s => s.setSnackBarState)

    useEffect(() => {
        toasts
          .filter(t => t.visible && t.duration !== Infinity)
          .filter((_, i) => i >= TOAST_LIMIT - 1)
          .forEach(t => toast.dismiss(t.id))
      }, [toasts])


    useCloseOnEsc({
        conditionsList: [!!toasts[0]],
        callback: () => {
            if (toasts.find(t => t.visible && t.duration !== Infinity)) {
                toasts
                    .filter(t => t.visible && t.duration !== Infinity)
                    .forEach(t => toast.dismiss(t.id))
            }
        }
    })

    //* For forms Esc blur while any (not Infinity) SnackBar is opened
    useEffect(() => {
        if (toasts[0]) {
            if (toasts.find(t => t.visible && t.duration !== Infinity)) {
                setSnackBarState(true)
            } else {
                setSnackBarState(false)
            }
        }
    }, [toasts])


    return ( 
        <button
            className={`snackbar-cont cont ${toastElem.visible ? 'opened' : 'closed'} ${type === 'b' && 'blocked'}`}
            type='button'
            tabIndex={-1}
            onClick={(e) => {
                e.stopPropagation()
                if (type !== 'b') toast.dismiss(toastElem.id)
            }}
        >
            {icon}
            <div className='snackbar-message cont'>
                <h4>{title}</h4>
                <p dangerouslySetInnerHTML={{ __html: message}}></p>
            </div>
            {
                type !== 'b' ? 
                    <div
                        className='snackbar_close-icon before_hover-but cont'
                    >
                        {ICONS.closeCircled}
                    </div>
                :
                    null
            }
        </button>
    )
}
 
export default SnackBar