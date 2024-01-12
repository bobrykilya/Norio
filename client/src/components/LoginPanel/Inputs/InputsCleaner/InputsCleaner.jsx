import { IoCloseCircleOutline } from "react-icons/io5"
// import { FaXmark } from "react-icons/fa6"



const InputsCleaner = ({opened, onClick}) => {

    return ( 
        <button 
            className={`inputs_cleaner-but cont ${opened ? 'opened' : ''}`}
            title='Очистить поле'
            tabIndex={-1}
            type='button'
            onClick={onClick}
        >
            <IoCloseCircleOutline className='fa-icon' />
        </button>
     )
}
 
export default InputsCleaner