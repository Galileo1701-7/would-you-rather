//same logger as used on "chipper"... KEEP FOR FUTURE USE!
const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('Action =', action)
        const returnValue = next(action)
        console.log('New state = ', store.getState())
    console.groupEnd()
    return returnValue


}

export default logger