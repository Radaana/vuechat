<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
    >
      <v-card>
        <v-snackbar
          v-model="snackbar"
          :timeout="5000"
          top
        >
          {{ message }}
          <v-btn
            color="#879b91"
            text
            @click="snackbar = false"
          >
            Закрыть
          </v-btn>
        </v-snackbar>
        <v-card-title>Введите имя и название чат-комнаты</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Ваше имя"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :counter="25"
              :rules="roomRules"
              label="Введите название чат-комнаты"
              required
            ></v-text-field>

            <!-- <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Пол"
            ></v-select> -->

            <v-btn
              :disabled="!valid"
              color="success"
              @click="submit"
            >
              Начать общение
            </v-btn>
            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Сбросить
            </v-btn>
          </v-form>
        </v-card-text>

      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import {mapMutations} from 'vuex'

export default {
  layout: 'first',
  head: {
    title: 'Добро пожаловать в чат!'
  },
  sockets: {
    connect: function () {
        console.log('socket connected')
    },
  },
  data: () => ({
    valid: true,
    snackbar: false,
    message: '',
    name: '',
    nameRules: [
      v => !!v || 'Имя - обязательное поле',
      v => (v && v.length <= 16) || 'Имя должно быть не длинее 16 знаков',
    ],
    room: '',
    roomRules: [
      v => !!v || 'Название комнаты - обязательное поле',
      v => (v && v.length <= 25) || 'Название должно быть не длинее 25 знаков',
    ],
    select: null,
    items: [
      'Мужской',
      'Женский',
    ],
    checkbox: false,
    lazy: false,
  }),
  mounted() {
    const {message} = this.$route.query;
    if(message === 'noUser') {
      this.message = 'Введите свои данные'
    } else if (message === 'successfulExit') {
      this.message = 'Вы покинули чат'
    }

    this.snackbar = !!this.message;
  },
  methods: {
    ...mapMutations(['setUser']),
    submit () {
      if (this.$refs.form.validate()) {
        const newUser = {
          name: this.name,
          room: this.room,
          sex: this.select,
        }

        this.$socket.emit('userJoined', newUser, data => {
          if (typeof data == 'string') {
            console.error('data');
          } else {
            newUser.id = data.userID;
            this.setUser(newUser);
            this.$router.push('/chat')
          }
        })


      }
    },
    reset () {
      this.$refs.form.reset()
    },
  }

}
</script>
