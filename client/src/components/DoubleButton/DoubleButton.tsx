import { useState } from "react";

interface DoubleButtonProps{
    before: string;
    after: string;
}

function DoubleButton({before, after}:DoubleButtonProps) {
    const [isActivated, setIsActivated]= useState<boolean>(false)

    function handleOnClick(){
        setIsActivated(!isActivated)
    }

    return (
        <button type="button" onClick={handleOnClick}>{isActivated?after:before}</button>
    )
}

export default DoubleButton