<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          Nombre: {{dataJob.name}}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <p>Ciudad: {{ dataJob.city}}</p>
            </v-col>
            <v-col cols="9">
              <p>Descripción: {{ dataJob.description}}</p>
            </v-col>
            <v-col>
              <client-only>
                <!-- <GmapAutocomplete
                  @place_changed="setPlace"
                  class="inputBuscador"
                  placeholder="Busca una dirección"
                >
                </GmapAutocomplete> -->
                <GmapMap
                  ref="mapRef"
                  :center="center"
                  :zoom="17"
                  :options="{
                    disableDefaultUi: true,
                    mapTypeControl: false,
                  }"
                  style="width: 100%; height: 300px"
                >
                  <GmapMarker
                    :position="markers.position"
                    :draggable="true"
                    @dragend="newPosition"
                  />
                </GmapMap>
              </client-only>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" nuxt to="/jobs">
            Volver
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  layout: 'logged',
  components: {},
  data(){
    return{
      formGetJob:{
        authtkn:'',
        jobId:'',
      },
      center: { lat: 4.60971, lng: -74.08175 },
      markers: {
        position: {
          lat: 4.60971,
          lng: -74.08175,
        },
      },
      position: {
        lat: 4.60971,
        lng: -74.08175,
      },
      dataJob:{
        name:'',
        city:'',
        latitude:'',
        longitude:'',
        description:'',
      },
    }
  },
  mounted() {
    this.formGetJob.jobId = localStorage.getItem("jobId");
    this.formGetJob.authtkn = localStorage.getItem("authToken");
    this.getJobInfoById();
  },
  methods:{
    async getJobInfoById(){
      await this.$store.dispatch('jobs/getJobInfoById', this.formGetJob)
      .then((response) => {
        if (response.success && response.code === 100) {

          this.dataJob.name = response.body.name;
          this.dataJob.city = response.body.city;
          this.dataJob.latitude = this.center.lat = this.markers.position.lat = this.position.lat = parseFloat(response.body.latitude);
          this.dataJob.longitude = this.center.lng = this.markers.position.lng = this.position.lng = parseFloat(response.body.longitude);
          this.dataJob.description = response.body.description;

          this.$refs.mapRef.$mapPromise.then((map) => {
            map.panTo({lat: parseFloat(this.dataJob.latitude), lng: parseFloat(this.dataJob.longitude)})
          })

        }else{
        }
      })
      .catch((error) => {
      });
    },
    newPosition(_element) {
      this.savePositionOrigin(_element.latLng.lat(), _element.latLng.lng());
      this.position = {
        lat: _element.latLng.lat(),
        lng: _element.latLng.lng(),
      };
      this.dataJob.latitude = _element.latLng.lat();
      this.dataJob.longitude = _element.latLng.lng();
    },
    setPlace(place) {
      if (place.geometry) {
        this.alertMap = false;

        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();

        this.center = {
          lat: latitude,
          lng: longitude,
        };

        this.markers = {
          position: {
            lat: latitude,
            lng: longitude,
          },
        };

        this.position = {
          lat: latitude,
          lng: longitude,
        };
        // console.log(this.center);
        this.savePositionOrigin(latitude, longitude);
      } else {
        this.alertMapMessage = "No encontramos la dirección";
        this.alertMapType = "error";
        this.alertMap = true;
      }
    },
    savePositionOrigin(_lat, _lng) {
      var self = this;
      var geocoder = new google.maps.Geocoder();
      var latlong = {
        lat: parseFloat(_lat),
        lng: parseFloat(_lng)
      };
      var addressSelected = "";
      geocoder.geocode(
        {
          location: latlong
        },
        async (results, status) => {
          // si la solicitud fue exitosa
          if (status === google.maps.GeocoderStatus.OK) {
            // si encontró algún resultado.
            if (results[1]) {
              self.address = results[1].formatted_address;
            }
          }
        }
      );
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.markers = {
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        };
      });
    },
  },
}
</script>
