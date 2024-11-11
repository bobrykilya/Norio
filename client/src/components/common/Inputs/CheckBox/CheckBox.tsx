import React from "react"



type CheckBoxProps = {
    checked: boolean;
    onChange: () => void;
    disabled: boolean;
}
const CheckBox = ({ checked, onChange, disabled }: CheckBoxProps) => {

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
                disabled={disabled}
            />
            <label className="tgl-btn" htmlFor="cb2-7"></label>
        </div>  
    )
}

export default CheckBox

