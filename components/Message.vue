<template>
    <div>
        <div v-if="name === 'admin'" class="system-message">
            <p class="text-xs-center">{{text}}</p>
            <hr>
        </div>
        <div v-else class="message">
            <div class="message__container" :class="{owner}">
                <small>
                    <strong>
                        {{name}}
                    </strong>
                </small>
                <p>
                    {{text}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        text: String,
        owner: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style>
    .system-message {
        margin-bottom: 1rem;
    }

    .system-message p {
        margin-bottom: 1rem;
        text-align: center;
    }

    .message {
        display: flex;
        flex-direction: column;
    }

    .message__container {
        padding: 1rem;
        width: 60%;
        margin: 0 1rem;
        border-radius: 5px;
        background: #879b91;
        position: relative;
        margin-bottom: 1rem;
    }

    .message__container p {
        margin-bottom: 0;
    }

    .message__container.owner {
        background: #fff;
        color: #000;
        align-self: flex-end;
    }

</style>