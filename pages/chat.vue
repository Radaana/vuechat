<template>

        <div class="chat-wrapper">
            <div class="chat-container" ref="chat">
                <message
                    v-for="m in messages" :key="m.id+m.text"
                    :name="m.name"
                    :text="m.text"
                    :owner="m.id === user.id"
                />
            </div>
            <div class="form-container">
                <chatform />
            </div>
        </div>

</template>

<script>
import {mapState} from 'vuex';
import Message from '@/components/Message';
import Chatform from '@/components/Chatform';
export default {
    layout: 'chatpage',
    middleware: ['chat'],
    head() {
        return {
            title: `Комната ${this.user.room}`
        }
    },
    components: {Message, Chatform},
    computed: {
    ...mapState(['user', 'messages'])
    },
    watch: {
        messages() {
            setTimeout(() => {
                this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
            });
        }
    }

}
</script>

<style>
    .chat-wrapper {
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .chat-container {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 80px;
        padding: 1rem;
        overflow-y: auto;
    }
    .form-container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;
        padding: 1rem;
        background-color: #212121;
    }
</style>
