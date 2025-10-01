import React, { useEffect, useRef } from "react";
import Button from "../atoms/Button";

function HeaderCreatedButtonMenu({
    className = '',
    onClose
}) {

    const onCloseRef = useRef(onClose)
    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])


    return (
        <div>
            <Button>Create Board</Button>
        </div>
    )
}

export default React.memo(HeaderCreatedButtonMenu)