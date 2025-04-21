export const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}