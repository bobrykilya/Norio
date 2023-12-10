import { useState } from 'react'
import './CheckBox.sass'


const CheckBox = (props) => {

    const [checked, setChecked] = useState(false)

    const handleChangeChecked = () => {
        setChecked(!checked)
        props.onChange(!checked)
    }

    return (
        <div className="checkbox-wrapper-7">
            <input className="tgl tgl-ios" id="cb2-7" type="checkbox" checked={checked} onChange={handleChangeChecked}/>
            <label className="tgl-btn" htmlFor="cb2-7"></label>
        </div>  
    )
}

export default CheckBox

