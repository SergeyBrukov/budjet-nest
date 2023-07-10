import {FC, useEffect, useRef} from "react";
import {useDelayInputHook} from "../../../customHook/delayInputHook/UseDelayInputHook.tsx";

interface IDelayInputComponent {
    onChange: (value: string) => void,
    defaultValue: string,
    timer?: number,
    className?: string,
    placeholder?: string
}

const DelayInput: FC<IDelayInputComponent> = ({onChange, timer = 600, className, placeholder, defaultValue}) => {

    const didMount = useRef(true);

    const [delayInput, value, setValue] = useDelayInputHook(timer, defaultValue);

    useEffect(() => {
        if(didMount.current && delayInput === "") {
            didMount.current = false;
            return;
        }

        onChange(delayInput);
    }, [delayInput])

    return (
        <div className={className}>
            <input type="text" placeholder={placeholder} className="text-black w-full rounded-xl" value={value} onChange={e => setValue(e.target.value)}/>
        </div>
    )
}

export default DelayInput