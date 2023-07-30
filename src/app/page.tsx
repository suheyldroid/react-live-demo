"use client"
import {ComponentListItem} from "@/components/ComponentListItem";
import {Component, useComponentStore} from "@/store/component-store";
import {AddEditModal} from "@/app/components/AddEditModal";
import {useImmer} from "use-immer";
import {Title} from "@/components/Title";
import {Button} from "@/components/Button";
import {List} from "@/components/List/List";
import {Preview} from "@/components/Preview";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";

export default function Home() {
    const {components, selectedComponent} = useComponentStore()
    const [addEditModalState, setAddEditModalState] = useImmer<AddEditModalState>({isOpen: false, component: null})

    function handleAdd() {
        setAddEditModalState(draft => {
            draft.isOpen = true
            draft.component = null
        })
    }

    function handleEdit(component: Component) {
        setAddEditModalState(draft => {
            draft.isOpen = true
            draft.component = component
        })
    }


    function handleClose() {
        setAddEditModalState(draft => {
            draft.isOpen = false
            draft.component = null
        })
    }

    return (
        <main>
            <div className="flex h-screen bg-gray-100">
                <div className="w-2/6 bg-gray-800">
                    <div className="p-4">
                        <Title>App Sidebar</Title>
                        <Button onClick={handleAdd}>
                            Add Component
                        </Button>
                        <List>
                            {Object.values(components).map((component) => <ComponentListItem key={component.name}
                                                                                             onEdit={handleEdit}
                                                                                             component={component}/>)}
                            <AddEditModal isOpen={addEditModalState.isOpen} onClose={handleClose}
                                          component={addEditModalState.component}/>
                        </List>
                    </div>
                </div>


                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-semibold">Welcome to the App</h1>
                    <p className="mt-4">Preview components</p>

                    {selectedComponent && <div className={"flex-col space-y-2"}>
                        <CodeMirror editable={false} value={selectedComponent.code}
                                    height="200px"
                                    theme={"dark"}
                                    extensions={[javascript({jsx: true})]}/>
                        <Preview Element={selectedComponent.type}/>
                    </div>}
                </div>
            </div>
        </main>
    )
}

type AddEditModalState = {
    isOpen: boolean;
    component: Component | null;
}
