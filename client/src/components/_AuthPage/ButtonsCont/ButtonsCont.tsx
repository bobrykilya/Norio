import React from 'react'
import { MdInstallDesktop } from "react-icons/md"
import { FaInfo } from "react-icons/fa6"
import ToolTip from '../../others/ToolTip/ToolTip'



type ButtonsContProps = {
    disabled?: boolean;
}
const ButtonsCont = ({ disabled }: ButtonsContProps) => {
    // const [deferredPrompt, setDeferredPrompt] = useState(false);

    // const askAppInstall = async () => {
        // console.log(deferredPrompt)
        // await deferredPrompt.prompt()
    // }

    // window.addEventListener("beforeinstallprompt", (e) => {
    //     e.preventDefault()
    //     // console.log(`deferredPrompt saved`)
    //     setDeferredPrompt(e)
    //   })

    return (
        <div className='buts-cont cont'>
                <button 
                    className='pwa-but'
                    tabIndex={-1}
                    // onClick={askAppInstall}
                    disabled={disabled}
                >
                    <MdInstallDesktop className='fa-icon'/>
                    <ToolTip text='Создать ярлык на рабочем столе' />
                </button>
                <button
                    className='info-but'
                    tabIndex={-1}
                    disabled={disabled}
                >
                    <FaInfo className='fa-icon'/>
                    <ToolTip text='Описание приложения и инструкция' />
                </button>
        </div>
    )
}

export default ButtonsCont