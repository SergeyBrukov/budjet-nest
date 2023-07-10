import {useEffect, useState} from "react";

export const useDelayInputHook = (timer: number, defaultValue: string):[delayValue: string, value: string, setValue: (value: string) => void] => {
    const [value, setValue] = useState<string>(defaultValue || "");
    const [delayValue, setDelayValue] = useState<string>("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayValue(value);
        }, timer)


        return () => clearTimeout(timeout);
    }, [value])


    return [delayValue,value, setValue]
}