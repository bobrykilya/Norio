import { IoSunnyOutline } from "react-icons/io5"



const AccountInfoCard = () => {
    return ( 
        <div className="account_info_card-cont card_content-cont cont card">
            <button className='mode-but cont'>
                <IoSunnyOutline  className='fa-icon'/>
            </button>
            <div className='account_info-cont cont'>
                <span className='account_name'>Светлана Леонидовна</span>
                <span className='account_role'>админ</span>
            </div>
            <button className='account-img'>
                
            </button>
        </div>
     )
}
 
export default AccountInfoCard