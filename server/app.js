const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();

const generateMessage = (name, id, text) => {
    return {name, id, text}
}

io.on('connection', socket => {
    socket.on('userJoined', (data, callback) => {
        if(!data.name || !data.room) {
            return callback('Полученные данные некорректны')
        }
        socket.join(data.room)
        users.remove(socket.id)
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room
        })

        callback({userID: socket.id});
        io.to(data.room).emit('updateUserList', users.getByRoom(data.room))
        socket.emit('newMessage', generateMessage('admin','admin', `Добро пожаловать ${data.name}`))
        socket.broadcast
            .to(data.room)
            .emit('newMessage', generateMessage('admin','admin', `Поприветствуем,  ${data.name} !`))
    })

    socket.on('createMessage', (data, callback) => {
        if (!data.text) {
            return callback('Не получится отправить пустое сообщение')
        }

        const user = users.get(data.id);

        if(user) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, data.id, data.text))
        }

        callback();
    })

    socket.on('userLeft', (id, callback) => {
        const user = users.remove(id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', generateMessage('admin','admin', `Попрощались с ${user.name}`))
        }
        callback();
    });

    socket.on('disconnect', () => {
        const user = users.remove(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', generateMessage('admin','admin', `Попрощались с ${user.name}`))
        }
    });
})

module.exports = {
    app, server
}