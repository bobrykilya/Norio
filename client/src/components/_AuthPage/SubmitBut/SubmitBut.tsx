import React from 'react'
import ToolTip, { ToolTipProps } from '../../others/ToolTip/ToolTip'
import { ThreeDots } from 'react-loader-spinner'
import { ICommonVar } from "../../../../../common/types/Global-types"



type SubmitButProps = {
    icon: ICommonVar['icon'];
    onClick?: () => void;
    isLoading?: boolean;
    useOnClick?: boolean;
    disabled?: boolean;
    blur?: boolean;
    toolTip?: ToolTipProps;
    tabNotBlur?: boolean;
}
const SubmitBut = ({ icon, onClick, isLoading, useOnClick, disabled, blur, toolTip, tabNotBlur }: SubmitButProps) => {

    return (
        <button
            className={`submit-but cont ${blur ? 'blur' : ''}`}
            type={useOnClick ? 'button' : 'submit'}
            tabIndex={tabNotBlur ? 0 : -1}
            disabled={disabled ? true : isLoading}
            onClick={useOnClick ? onClick : () => null}
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
            {
                toolTip &&
                <ToolTip {...toolTip} />
            }
        </button>
    )
}

export default SubmitBut