<template>
    <v-flex xs-12>
        <v-text-field
        label="Введите сообщение"
        outlined
        v-model="text"
        @keydown.enter="send"
        color="#879b91"
        ></v-text-field>
    </v-flex>

</template>

<script>
export default {
    data: () => ({
        text: ''
    }),
    methods: {
        send() {
            this.$socket.emit('createMessage', {
                text: this.text,
                id: this.$store.state.user.id
            }, data => {
                if (typeof data === 'string') {
                    console.error(data)
                } else {
                    this.text = '';
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>