import {PropsWithChildren} from "react";

export function List({children}: PropsWithChildren) {
    return (
        <ul className="mt-4 flex-col space-y-2">
            {children}
        </ul>
    )
}