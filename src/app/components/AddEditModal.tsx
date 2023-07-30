import {Modal} from "@/components/Modal";
import React, {useCallback, useEffect, useState} from "react";
import {Component, useComponentStore} from "@/store/component-store";
import {generateElement} from "react-live";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {Preview} from "@/components/Preview";
import {useImmer} from "use-immer";

const INITIAL_COMPONENT: Component = {
    name: "",
    code: "",
    type: null,
}

export function AddEditModal({isOpen, onClose, component: EditingComponent}: AddEditModalProps) {
    const isEditing = !!EditingComponent
    const [component, setComponent] = useImmer<Component>(INITIAL_COMPONENT)
    const [error, setError] = useState("")
    const {addComponent, updateComponent, has, components} = useComponentStore()

    const scope = Object.values(components).reduce((acc: any, component) => {

        acc[component.name] = component.type
        return acc
    }, {})

    const onChange = useCallback((value: string) => {
        setComponent(component => {
            component.code = value
        })
        try {
            const el = generateElement({code: value, scope: {...React, ...scope, scope}, enableTypeScript: true},
                (er) => console.log(er))
            setComponent(component => {
                component.type = el
            })
        } catch (e) {
            setComponent(component => {
                component.type = null
            })
        }
    }, [scope]);

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setComponent(component => {
            component.name = e.target.value.toUpperCase()
        })
    }

    function isValid(skipNameCheck = false) {
        if (!component.name) return setError("Please enter a name")
        if (!skipNameCheck && has(component.name)) return setError("Name already exists")
        if (!component.type) return setError("Please enter a valid component")
        setError("")
        return true
    }

    function handleAdd() {
        if (!isValid()) return;
        addComponent(component)
        onClose()
    }

    function handleEdit() {
        if (!isValid(true)) return;
        updateComponent(component)
        onClose()
    }


    useEffect(() => {
        setComponent(isEditing ? EditingComponent : INITIAL_COMPONENT)
    }, [isOpen])

    return <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{isEditing ? "Edit" : "Add"} Component</h1>
            <div className="mt-4">
                <label htmlFor="name">Name</label>
                <input type="text" disabled={isEditing} value={component.name} name="name" id="name"
                       className="border border-gray-300 p-2 rounded"
                       onChange={handleNameChange}/>
            </div>
            <div className="mt-4">
                <label htmlFor="code">Code</label>
                <CodeMirror
                    value={component.code}
                    height="200px"
                    theme={"dark"}
                    extensions={[javascript({jsx: true})]}
                    onChange={onChange}
                />
            </div>
            <Preview Element={component.type}/>

            <div className="mt-4">
                {error && <p className="text-red-600">{error}</p>}
                <button onClick={isEditing ? handleEdit : handleAdd}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">{
                    isEditing ? "Edit" : "Add"
                }
                </button>
            </div>
        </div>

    </Modal>
}

export interface AddEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    component: Component | null
}