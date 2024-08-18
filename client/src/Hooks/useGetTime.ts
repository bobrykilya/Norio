import moment from 'moment/moment.js'



export const getTime = () => {
    return moment().format()
}

export const getShortTime = (timestamp) => {
    return moment(timestamp).format('HH:mm')
}