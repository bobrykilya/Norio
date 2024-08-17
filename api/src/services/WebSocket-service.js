import { Server } from 'socket.io'



let io

export const socketConnection = (PORT) => {
    io = new Server(PORT, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })


    io.on('connection', (socket) => {
        // console.log('Socket connected')
        // console.log(socket.rooms)
        socket.on('join', ({ userId, deviceId }) => {
            // console.log('Joined to room: ' + userId + deviceId)
            socket.join(userId + deviceId)
        })
    
        socket.on('disconnect', () => {
            // console.log('Socket disconnected')
        })
    })
}


export const sendToClient = ({ room, event, payload }) => {
    // console.log('Leaved from room: ' + room.userId + room.deviceId)
    io.to(room.userId + room.deviceId).emit(event, payload)
}
export const getRooms = () => io.sockets.adapter.rooms