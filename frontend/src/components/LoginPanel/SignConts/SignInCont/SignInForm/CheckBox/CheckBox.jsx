// import { useState } from 'react'



const CheckBox = (props) => {

    const handleChangeChecked = () => {
        props.onChange()
    }

    return (
        <div className="checkbox-wrapper-7">
            <input className="tgl tgl-ios" id="cb2-7" type="checkbox" checked={props.checked} onChange={handleChangeChecked}/>
            <label className="tgl-btn" htmlFor="cb2-7"></label>
        </div>  
    )
}

export default CheckBox

