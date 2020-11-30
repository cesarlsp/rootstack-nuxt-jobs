<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">

      <v-card>
        <v-card-title class="headline">
          Perfil
        </v-card-title>
        <v-card-text>
          <v-row style="justify-content: center !important;">
            <v-avatar size="200">
              <img
                :src="image"
                alt="John"
              >
            </v-avatar>
          </v-row>
          <v-row class="mt-10">
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                label="Nombre completo"
                outlined
                dense
                disabled
                readonly
                hide-details
                v-model="fullName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                label="Correo electrónico"
                outlined
                dense
                disabled
                readonly
                hide-details
                v-model="email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  layout: 'logged',
  components: {},
  data () {
    return {
      fullName:'',
      email:'',
      image:''
    }
  },
  mounted() {
    this.fullName = localStorage.getItem("fullName")
    this.email = localStorage.getItem("email")
    this.image = localStorage.getItem("image")
  },
}
</script>
