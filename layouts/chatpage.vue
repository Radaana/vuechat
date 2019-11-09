<template>
  <v-app dark>
      <v-navigation-drawer app :temporary="false" v-model="drawer" >
        <v-list subheader>
          <v-subheader>Пользователи в сети</v-subheader>

          <v-list-item
            v-for="u in users"
            :key="u.id"
            @click.prevent
          >
            <!-- <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar> -->

            <v-list-item-content>
              <v-list-item-title v-text="u.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <!-- <v-icon >mdi-chat-bubble</v-icon> -->
                <v-icon :color=" u.id === user.id ? 'white' : 'grey' ">mdi-email</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn icon @click="exit">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        
        <v-toolbar-title>Чат комнаты {{user.room}}</v-toolbar-title>
      </v-app-bar>
      <v-content>
        <!-- <v-container fluid> -->
          <nuxt/>
        <!-- </v-container> -->
      </v-content>
  </v-app>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      drawer: true,
    }
  },
  computed: {
  ...mapState(['user', 'users'])
  },
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=successfulExit');
        this.clearData();
      })
    }
  },
}
</script>
