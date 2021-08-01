import io from 'socket.io-client'

export const playerOpsSocket = io(process.env.NEXT_PUBLIC_PLAYER_OPS_URL, {
    autoConnect: false,
    reconnection: true,
    timeout: 5000,
})
