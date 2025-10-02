import React, { useEffect, useRef } from "react";
import Button from "../atoms/Button";
import { Columns } from "lucide-react";

function HeaderCreatedButtonMenu({
    className = '',
    onClose
}) {

    const onCloseRef = useRef(onClose)
    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])


    return (
        <div className="w-[30rem]">
            <div className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-4 cursor-pointer">
                <Columns height={16} width={16} className="text-gray-900 dark:text-gray-100" />
                <span className="text-[1.6rem] text-gray-900 dark:text-gray-100">Create board</span>
            </div>
        </div>
    )
}

export default React.memo(HeaderCreatedButtonMenu)