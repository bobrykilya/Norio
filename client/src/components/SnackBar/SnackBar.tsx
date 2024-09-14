import React, { useEffect } from 'react'
import toast, { useToasterStore } from 'react-hot-toast'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { SnackBarTypeOptions } from '../../features/showSnackBarMessage/showSnackBarMessage';
import { TOAST_LIMIT } from "../../../constants"


type ISnack = {
    visible: boolean;
    id: string;
}

type SnackBarProps = {
    title: string;
    icon: React.ReactElement;
    message: string; 
    toastElem: ISnack;
    type: SnackBarTypeOptions;
}
const SnackBar = ({ title, icon, message, toastElem, type }: SnackBarProps) => {

    const { toasts } = useToasterStore()
    // console.log(snack)

    useEffect(() => {
        toasts
          .filter(t => t.visible && t.duration !== Infinity)
          .filter((_, i) => i >= TOAST_LIMIT - 1)
          .forEach(t => toast.dismiss(t.id))
      }, [toasts])

    return ( 
        <button
            className={`snackbar-cont cont ${toastElem.visible ? 'opened' : 'closed'} ${type === 'b' && 'blocked'}`}
            type='button'
            tabIndex={-1}
            onClick={() => {
                if (type !== 'b') toast.dismiss(toastElem.id)
            }}
        >
            {icon}
            <div className='snackbar-message cont'>
                <h3>{title ? title : null}</h3>
                <p dangerouslySetInnerHTML={{ __html: message}}></p>
            </div>
            {
                type !== 'b' ? 
                    <div 
                        className='snackbar_close-but before_but-hover cont'
                    >
                        <IoCloseCircleOutline className='close-icon fa-icon' />
                    </div>
                :
                    null
            }
        </button>
    )
}
 
export default SnackBar