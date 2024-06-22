const useGetTimeShort = (timeStamp) => {
    // console.log(timeStamp)
    const time = new Date(timeStamp)
    // console.log(time)
    const timeMinutes = time.getMinutes()

    return `${time.getHours()}:${timeMinutes > 9 ? timeMinutes : '0' + timeMinutes}`
}

export default useGetTimeShort