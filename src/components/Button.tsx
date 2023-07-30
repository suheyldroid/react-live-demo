import {ButtonHTMLAttributes, PropsWithChildren} from "react";

export function Button({children, ...props}: PropsWithChildren<ButtonHTMLAttributes<any>>) {
    return <button {...props}
                   className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        {children}
    </button>
}