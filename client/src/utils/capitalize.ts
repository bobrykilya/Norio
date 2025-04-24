export const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const capitalizeOnlyFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}