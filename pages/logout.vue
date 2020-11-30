<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout: 'logged',
  components: {
    Logo,
    VuetifyLogo
  },
  mounted(){
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    localStorage.removeItem("image");
    localStorage.removeItem("suid");
    var self=this
    // self.$store.commit("userTransactions/setOrigin",'/')
    window.location = "/";
  },
}
</script>
