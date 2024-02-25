import { IoCloseCircleOutline } from "react-icons/io5"
import ToolTip from '../../../ToolTip/ToolTip'
// import { FaXmark } from "react-icons/fa6"



const InputsCleaner = ({opened, onClick}) => {

    return ( 
        <button 
            className={`inputs_cleaner-but cont ${opened ? 'opened' : ''}`}
            tabIndex={-1}
            type='button'
            onClick={onClick}
        >
            <IoCloseCircleOutline className='fa-icon' />
            <ToolTip text='Очистить поле' />
        </button>
     )
}
 
export default InputsCleaner