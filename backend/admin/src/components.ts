import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
    // MyInput: componentLoader.add('MyInput', './my-input'),
    // other custom components
    Dashboard: componentLoader.add('Dashboard', './components/dashboard'),
}

export { componentLoader, Components }