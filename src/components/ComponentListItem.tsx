import {Edit, Eye, Trash} from "tabler-icons-react";
import {Component, useComponentStore} from "@/store/component-store";

export function ComponentListItem({component, onEdit}: ComponentListItemProps) {
    const {removeComponent, selectComponent} = useComponentStore()

    function handleEdit() {
        onEdit(component)
    }

    function handlePreview() {
        selectComponent(component)
    }

    return (
        <li className="flex items-center justify-between py-2 border-2 border-amber-400 rounded p-4 bg-amber-600">
            <span className="text-lg font-semibold ">{component.name}</span>
            <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-amber-800" onClick={handlePreview}>
                    <Eye/>
                </button>
                <button className="text-blue-600 hover:text-blue-800" onClick={handleEdit}>
                    <Edit/>
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={() => removeComponent(component.name)}>
                    <Trash/>
                </button>
            </div>
        </li>
    )
}

export interface ComponentListItemProps {
    component: Component
    onEdit: (component: Component) => void
}

