import React from 'react'
import ToolTip from '../../others/ToolTip/ToolTip'
import { ThreeDots } from 'react-loader-spinner'
import { ICommonVar } from "../../../../../common/types/Global-types"



type SubmitButProps = {
    icon: ICommonVar['icon'];
    isLoading: boolean;
    title: string;
    notSaveUser?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    blur?: boolean;
    tabIndex?: number;
}
const SubmitBut = ({ icon, isLoading, notSaveUser=false, onClick, disabled=false, blur=false, title, tabIndex=-1 }: SubmitButProps) => {

    return (
        <button
            className={`submit-but cont ${blur && 'blur'}`}
            type={notSaveUser ? 'button' : 'submit'}
            tabIndex={tabIndex}
            disabled={disabled ? true : isLoading}
            onClick={notSaveUser ? onClick : () => null}
        >
            {!isLoading ?
                icon :
                <div
                    className={'submit-loader cont'}
                >
                    <ThreeDots
                        color='#E9EDF0CC'
                        width="40"
                    />
                </div>
            }
            <ToolTip text={title} />
        </button>
    )
}

export default SubmitBut