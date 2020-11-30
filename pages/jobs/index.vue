<template>
  <v-row justify="center" align="center">
    <v-col cols="6" xs="6" sm="4" md="3">
      <label id="topList">Buscar:</label>
        <v-text-field
          placeholder="Nombre trabajo"
          solo flat dense
          class="classicInput"
          v-model="formSearchJobs.needle"
          @keyup="setFilter()"
          hide-details
        ></v-text-field>
    </v-col>
    <v-col cols="4" xs="4" sm="3" md="2">
      <v-btn class="mt-5" color="red" dark @click="clearFilters()">
        Limpiar
      </v-btn>
    </v-col>
    <v-col></v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <div>
            <v-data-table
              :headers="headers"
              :items="allJobs"
              :items-per-page="formSearchJobs.limit"
              class="dataTableStyle"
              hide-default-footer>
              <template v-slot:item.id="{ item }">
                <a @click="goToDetail(item.id)" v-html="item.id"></a>
              </template>
              <template v-slot:item.name="{ item }">
                <span>{{item.name}}</span>
              </template>
              <template v-slot:item.city="{ item }">
                <span>{{item.city}}</span>
              </template>
            </v-data-table>
            <div class="text-center pt-2 classicPagination">
              <v-pagination
              v-model="formSearchJobs.page"
              :length="paginationLength"
              :total-visible="visible"
              @input="changePage()"></v-pagination>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  layout: 'logged',
  components: {},
  data(){
    return{
      headers: [
        {text: '#', sortable: false, value:'id'},
        {text: 'Nombre', sortable: false, value:'name'},
        {text: 'Ciudad', sortable: false, value: 'city'}
      ],
      allJobs: [],
      visible:12,
      paginationLength: 1,
      totalRows:0,
      formSearchJobs:{
        authtkn:'',
        needle:'',
        limit:10,
        offset:0,
        page:1,
      },
      currentUrl:'',
    }
  },
  mounted() {
    this.currentUrl = window.location.href;
    if (this.currentUrl==localStorage.getItem("firstPageUrl")) {
      this.formSearchJobs.page = parseInt(localStorage.getItem("firstPageNumber"));
      this.formSearchJobs.needle = localStorage.getItem("needle");
    }else{
      localStorage.setItem("needle", this.formSearchJobs.needle);
      localStorage.setItem("firstPageNumber", this.formSearchJobs.page);
      localStorage.setItem("firstPageUrl", window.location.href);
    }
    this.searchJobs();
  },
  methods:{
    clearFilters(){
      this.formSearchJobs.needle = '';
      this.formSearchJobs.page = 1;
      this.setFilter();
    },
    setFilter(){
      localStorage.setItem("needle", this.formSearchJobs.needle);
      this.formSearchJobs.page = 1;
      localStorage.setItem("firstPageNumber", this.formSearchJobs.page);
      this.searchJobs();
    },
    changePage(){
      this.searchJobs();
      localStorage.setItem("firstPageNumber", this.formSearchJobs.page);
      localStorage.setItem("firstPageUrl", window.location.href);
      this.toSection();
    },
    toSection(){
      var element = document.getElementById('topList');
      element.scrollIntoView({ behavior: 'smooth' });
    },
    goToDetail(jobId){
      localStorage.setItem("jobId", jobId);
      this.$router.push('/jobs/detail');
    },
    async searchJobs(){
      this.formSearchJobs.authtkn = localStorage.getItem("authToken");
      this.formSearchJobs.offset = (this.formSearchJobs.page-1) * this.formSearchJobs.limit;
      await this.$store.dispatch('jobs/searchJobs', this.formSearchJobs)
      .then((response) => {
        if (response.success && response.code === 100) {
          this.totalRows = response.body.total;
          this.allJobs = response.body.jobs;
          if (this.formSearchJobs.limit > 0 && this.totalRows > 0) {
              this.paginationLength = Math.ceil(this.totalRows / this.formSearchJobs.limit);
          }else{
            this.paginationLength = 1;
          }
        }else{
          this.allJobs = [];
        }
      })
      .catch((error) => {
        this.allJobs = [];
      });
    },
  }
}
</script>
