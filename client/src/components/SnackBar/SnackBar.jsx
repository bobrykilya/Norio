import toast from 'react-hot-toast'
import { IoCloseCircleOutline } from 'react-icons/io5'



const SnackBar = ({ title, icon, message, snack }) => {

    return ( 
        <button
          className={`snackbar-cont cont ${snack.visible ? 'opened' : 'closed'}`}
          type='button'
          tabIndex={-1}
          onClick={() => toast.dismiss(snack.id)}
        >
            {icon}
            <div className='snackbar-message cont'>
                <h3>{title ? title : null}</h3>
                <p>{message}</p>
            </div>
            <div 
                className='snackbar_close-cont before_but-hover cont' 
            >
                <IoCloseCircleOutline className='close-icon fa-icon' />
            </div>
        </button>
    )
}
 
export default SnackBar