import { Server } from 'socket.io'



let io: any

export const socketConnection = (HTTPServer: any) => {
    io = new Server<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>(HTTPServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ['custom-header'],
            credentials: true
        }
    })


    io.on('connection', (socket: any) => {
        // console.log('Socket connected')

        socket.on('join', ({ userId, deviceId }) => {
            console.log('Joined to room: ' + userId + deviceId)
            socket.join(userId.toString() + deviceId.toString())
            console.log(socket.rooms)
        })
        
        socket.on('disconnect', () => {
            // console.log('Socket disconnected')
        })
    })
}


export const sendToClient = ({ room, event, payload }) => {
    console.log('Leaved from room: ' + room.userId + room.deviceId)
    io.to(room.userId.toString() + room.deviceId.toString()).emit(event, payload)
}
export const getRooms = () => io.sockets.adapter.rooms
