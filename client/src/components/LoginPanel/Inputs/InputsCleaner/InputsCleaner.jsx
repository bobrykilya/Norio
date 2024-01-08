import { IoCloseCircleOutline } from "react-icons/io5"



const InputsCleaner = ({opened, handleResetInputs}) => {

    return ( 
        <button 
            className={`inputs_cleaner-but cont ${opened ? 'opened' : ''}`}
            title='Очистить все поля'
            type='button'
            onClick={handleResetInputs}
        >
            <IoCloseCircleOutline className='fa-icon'/>
        </button>
     );
}
 
export default InputsCleaner