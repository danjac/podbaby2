import Vue from 'vue'

export const fetchEpisodes = (page = 1) => {
  return Vue.http
    .get(`episodes/?page=${page}`)
    .then(response => response.body)
}
