"use client";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";


export const componentStore = create(immer<ComponentStore>((set, get) => ({
    components: {},
    addComponent: (component) => set(store => {
        store.components[component.name] = component
    }),
    removeComponent: (componentName) => set(store => {
        delete store.components[componentName]
    }),
    updateComponent: (component) => set(store => {
        store.components[component.name] = component
    }),
    has: (componentName) => {
        return componentName in get().components
    },
    selectedComponent: null,
    selectComponent: (component) => set(store => {
        store.selectedComponent = component
    })
})))
export const useComponentStore = componentStore
export type ComponentStore = {
    components: Record<string, Component>,
    addComponent: (component: Component) => void,
    removeComponent: (component: Component["name"]) => void
    updateComponent: (component: Component) => void
    has: (componentName: Component["name"]) => boolean
    selectedComponent: Component | null
    selectComponent: (component: Component | null) => void
}
export type Component = {
    name: string,
    type: any
    code: string
}