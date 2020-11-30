import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDa058KvYLSSGzWQGCtg3pUT7geXEnwojI',
    libraries: 'places'
  }
})
