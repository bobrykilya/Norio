import { useEffect } from 'react'




const JumpingList = ({ children, isListOpened, closeList, other_children }) => {

    const handleClickOutside = (e) => {
        // console.log(e.target)
        try {
            if (e.target?.className.includes('jumping_list_cover-cont')) {
                closeList()
            }
        }catch {

        }
    }
    
    useEffect(() => {
        const handleEscapePress = (e) => {
            if (!isListOpened) return
            if (e.key === 'Escape') {
                closeList()
            }
        }
        window.addEventListener('keydown', handleEscapePress)
        return () => {
            window.removeEventListener('keydown', handleEscapePress)
        }
    })

    return ( 
        <div 
            className={`jumping_list_cover-cont cont cover ${isListOpened ? 'opened' : ''}`}
            onClick={handleClickOutside}
        >
            <div className='jumping_list-cont cont'>
                {children}
            </div>
                {other_children}
        </div>
     )
}
 
export default JumpingList