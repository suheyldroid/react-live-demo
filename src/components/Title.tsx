import {PropsWithChildren} from "react";

export function Title({children}:PropsWithChildren){
    return(
        <h1 className="text-lg font-semibold mb-4 text-white">{children}</h1>
    )
}