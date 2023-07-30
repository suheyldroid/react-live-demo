import Frame from "react-frame-component";
import React from "react";

export function Preview({Element}: { Element: any }) {
    return <div className={"border-2 border-dashed rounded border-emerald-900"}>
        <Frame
            style={{width: '100%', height: '100%'}}
            initialContent='<div id="mountHere"></div>'
            mountTarget='#mountHere'
        >
            {Element ? <Element/> : "Invalid Component"}
        </Frame>
    </div>
}