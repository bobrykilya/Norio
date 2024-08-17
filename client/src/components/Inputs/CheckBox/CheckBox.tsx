import React from "react"



const CheckBox = ({checked, onChange}) => {

    const handleChangeChecked = () => {
        onChange()
    }

    return (
        <div className="checkbox-wrapper-7">
            <input 
                className="tgl tgl-ios" 
                id="cb2-7" 
                type="checkbox"
                // tabIndex={-1}
                checked={checked} 
                onChange={handleChangeChecked}
            />
            <label className="tgl-btn" htmlFor="cb2-7"></label>
        </div>  
    )
}

export default CheckBox

