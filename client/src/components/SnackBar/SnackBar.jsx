import { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { GlobalContext } from '../../context/Global-context'



const SnackBar = ({ title, icon, message, snack, type }) => {

    // console.log(toasts[0].duration)
    const { toasts } = useContext(GlobalContext)
    const TOAST_LIMIT = 3

    useEffect(() => {
        toasts
          .filter(t => t.visible && t.duration !== Infinity)
          .filter((_, i) => i >= TOAST_LIMIT - 1)
          .forEach(t => toast.dismiss(t.id))
      }, [toasts])

    return ( 
        <button
            className={`snackbar-cont cont ${snack.visible ? 'opened' : 'closed'} ${type === 'b' && 'blocked'}`}
            type='button'
            tabIndex={-1}
            onClick={() => {
                if (type !== 'b') toast.dismiss(snack.id)
            }}
        >
            {icon}
            <div className='snackbar-message cont'>
                <h3>{title ? title : null}</h3>
                <p>{message}</p>
            </div>
            {
                type !== 'b' ? 
                    <div className='snackbar_close-cont before_but-hover cont'>
                        <IoCloseCircleOutline className='close-icon fa-icon' />
                    </div>
                :
                    null
            }
        </button>
    )
}
 
export default SnackBar