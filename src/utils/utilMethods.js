
export const duplicateValueExists = (inputArray) => {
    const inputSet = new Set(inputArray)
    if(inputSet.size !== inputArray.length) {
        return true
    }
    return false
}

export const convertArrayToSet = (inputArray) => {
    return new Set(inputArray)
}