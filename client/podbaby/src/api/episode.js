import Vue from 'vue'

export const fetchEpisode = id => {
  return Vue.http
    .get(`episodes/${id}/`)
    .then(response => response.body)
}
