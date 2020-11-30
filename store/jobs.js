import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
  searchJobs(vuexContext, form){
    return new Promise((resolve, reject) => {
        let config = {
            headers: {'X-rt-Auth-Token': form.authtkn}
        };
        let dataObject = {
          needle: form.needle,
          limit: form.limit,
          offset: form.offset
        }
        axios.post(process.env.apiURL + api.searchJobs, dataObject, config)
        .then( response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        })
    });
  },
  getJobInfoById(vuexContext, form){
    return new Promise((resolve, reject) => {
        let config = {
            headers: {'X-rt-Auth-Token': form.authtkn}
        };
        let dataObject = {
          id: form.jobId,
        }
        axios.post(process.env.apiURL + api.getJobInfoById, dataObject, config)
        .then( response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        })
    });
  },
}
