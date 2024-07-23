type IUseGetEndTime = {
    startTime: Date;
    duration: number;
}

//* Getting timestamp (LocalString) and time-string after duration time (in minutes)
const useGetEndTime = ({ startTime, duration }: IUseGetEndTime): string => {

    const time = new Date(startTime)
    time.setMinutes(time.getMinutes() + duration)
    // console.log(time.toUTCString())
    // const time_2 = new Date(time.toUTCString())
    // console.log(time_2.toUTCString())

    return time.toUTCString()
}

export default useGetEndTime