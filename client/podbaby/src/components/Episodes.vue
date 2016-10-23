<template>
  <div>
    <div class="page-header">
      <h1>Podcasts</h1>
    </div>
    <Loader v-if="loading"></Loader>
    <div v-else>
    <pager @previous-page="fetchPrevious"
           @next-page="fetchNext"
           :previous="previousPage"
           :next="nextPage"></pager>
    <ul class="list-group">
      <li class="list-group-item" v-for="episode in episodes">

        <div class="media">
          <div class="media-left">
            <img v-if="episode.channel.thumbnail"
                 :src="episode.channel.thumbnail.url"
                 :alt="episode.channel.name"
                 class="media-object" />
          </div>
          <div class="media-body">
            <h4 class="media-heading">
              <router-link :to="{ name: 'episode', params: { id: episode.id } }">
              {{ episode.channel.name }}
              </router-link>
            </h4>
            <h5>{{episode.title}}</h5>
            <span class="label label-default category"
                  v-for="category in episode.channel.categories">
              <a href="#">{{ category.name }}</a>
            </span>
            <span v-if="episode.explicit" class="label label-danger category">
              <icon name="warning"></icon>
              Explicit
            </span>
          </div>
        </div>

        <p class="description" v-html="episode.subtitle"></p>
      </li>
    </ul>
    <pager @previous-page="fetchPrevious"
           @next-page="fetchNext"
           :previous="previousPage"
           :next="nextPage"></pager>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import * as getterTypes from '../store/types/getters'
import * as actionTypes from '../store/types/actions'

import Icon from './Icon'
import Pager from './Pager'
import Loader from './Loader'

export default {
  components: {
    Icon,
    Pager,
    Loader
  },
  watch: {
    '$route' (to) {
      this.fetch(to.query.page)
    }
  },
  computed: mapGetters({
    episodes: [getterTypes.EPISODES],
    nextPage: [getterTypes.EPISODES_NEXT_PAGE],
    previousPage: [getterTypes.EPISODES_PREVIOUS_PAGE],
    loading: [getterTypes.EPISODES_LOADING]
  }),
  created () {
    this.fetch(this.$route.query.page)
  },
  methods: {...mapActions({
    fetch: [actionTypes.FETCH_EPISODES]
  }),
    fetchNext () {
      this.$router.push({ query: { page: this.nextPage } })
    },
    fetchPrevious () {
      this.$router.push({ query: { page: this.previousPage } })
    }
  }
}
</script>

<style scoped>
  h1.loader {
    text-align: center;
  }
  p.description {
    padding-top:30px;
  }
  span.category {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  span.category a {
    color: #fff;
  }
</style>
