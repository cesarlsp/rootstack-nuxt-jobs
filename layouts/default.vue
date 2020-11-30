<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}, Rootstack test</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      fixed: false,
    }
  },
  mounted() {
    if(localStorage.getItem("authToken") && localStorage.getItem("suid")){
      this.$router.push({ path: "/profile", force: true })
    }
  },
}
</script>
