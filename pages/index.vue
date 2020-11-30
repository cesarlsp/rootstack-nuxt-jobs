<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!-- <div class="text-center">
        <logo />
        <vuetify-logo />
      </div> -->
      <v-card class="mt-10">
        <v-card-title class="headline">
          Login
        </v-card-title>
        <v-card-text>
          <p>Inicia sesión para ver tus tareas de campo</p>
          <v-text-field
            label="Correo electrónico"
            outlined
            dense
            :rules="emailRules"
            v-model="formLogin.email"
          ></v-text-field>
          <v-text-field
            label="Contraseña"
            outlined
            dense
            :rules="passwordRules"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            v-model="formLogin.password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            @click="login()"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout: 'default',
  components: {
    Logo,
    VuetifyLogo
  },
  data () {
    return {
      show2: false,
      formLogin:{
        acstkn:'',
        email:'',
        password:'',
      },
      emailRules:[
        v => !!v || 'Correo electrónico requerido.',
        v => /.+@.+\..+/.test(v) || 'Ingrese un correo valido.',
      ],
      passwordRules: [
        v => !!v || 'Contraseña requerida.',
      ],
    }
  },
  created(){
    this.$store
      .dispatch("getAccessToken")
      .then(res => {
        this.$store.commit("setAcsTkn", res.body.accessToken);
      })
      .catch(err => {
      });
  },
  mounted(){},
  methods:{
    login(){
        this.formLogin.acstkn = this.$store.state.acstkn;
        this.$store
        .dispatch("login", this.formLogin)
        .then((response) => {
          if (response.status === 200 && response.data.code === 100) {
            localStorage.setItem("authToken", response.data.body.authToken);
            localStorage.setItem("email", response.data.body.email);
            localStorage.setItem("fullName", response.data.body.fullName);
            localStorage.setItem("image", response.data.body.image);
            localStorage.setItem("suid", response.data.body.suid);
            this.$router.push({ path: "/profile", force: true })
          }else{
            this.watchErrorToast('Ha ocurrido un error')
          }
        })
        .catch((error) => {
          if(error.response.data.message){
            this.watchErrorToast(error.response.data.message)
          }else{
            this.watchErrorToast('Ha ocurrido un error')
          }
        });
    },
    watchErrorToast(textError){
      this.$toast.error(textError, {
        position: "bottom-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    }
  },
}
</script>
