import axios from 'axios';
import api from '../api';
var CryptoJS = require("crypto-js");

export const state = () => ({
  accessToken: '',
  people: '',
  acstkn: '',
})

export const mutations = {
  setPeople: (state, payload) => {
    state.people = payload
  },
  setAcsTkn: (state, payload) => {
    state.acstkn = payload
  },
}

export const getters = {
  getAcsTkn: state => {
    return state.acstkn
  }
}

export const actions = {
  nuxtServerInit: async (vuexContext) => {
    vuexContext.dispatch('getAccessToken');
  },

  getAccessToken: async () => {
    let data = await axios.get(process.env.apiURL+api.generateAccessToken)
    .then(res => {
        return res.data;
      })
      .catch(err => {
        return null
      })
    return data;
  },

  login(vuexContext, form){
    return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'X-rt-Access-Token': form.acstkn,
                },
                credentials: false
            }
            let object = {
              email: form.email,
              password: CryptoJS.SHA1(form.password).toString(),
            }
            axios.post(process.env.apiURL+api.login, object, config).then(function(json)
            {
                resolve(json);
            })
            .catch(function(error){
                reject(error);
            });
    });
  },
}
