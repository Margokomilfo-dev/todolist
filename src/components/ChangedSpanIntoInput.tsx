import React, {useState} from "react";

type ChangedSpanIntoInputPropsType = {
    title: string
}
export function ChangedSpanIntoInput(props: ChangedSpanIntoInputPropsType) {
    let [editMod, setEditMod] = useState(false)
    //----ON-------
    const editModOn = () => {
        setEditMod(true)
    }
    //----OFF-----
    const editModOff = () => {
        setEditMod(false)
    }
    return(
        <div>
            {editMod
                ? <input onBlur={editModOff} value={props.title} autoFocus/>
                : <div onDoubleClick={editModOn}>{props.title}</div>
            }
        </div>
    )
}