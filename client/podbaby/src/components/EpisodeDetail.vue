<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div v-else>
    <div class="page-header">
      <h1>{{ channel.name }}</h1>
      <h2>{{ episode.title }}</h2>
    </div>

        <div class="media">
          <div class="media-left">
            <img v-if="channel.thumbnail"
                 :src="channel.thumbnail.url"
                 :alt="channel.name"
                 class="media-object" />
          </div>
          <div class="media-body">
            <span class="label label-default category"
                  v-for="category in channel.categories">
              <a href="#">{{ category.name }}</a>
            </span>
            <span v-if="episode.explicit" class="label label-danger category">
              <icon name="warning"></icon>
              Explicit
            </span>
          </div>
        </div>

        <p class="description" v-html="episode.description"></p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import * as getterTypes from '../store/types/getters'
import * as actionTypes from '../store/types/actions'

import Loader from './Loader'
import Icon from './Icon'

export default {
  components: {
    Icon,
    Loader
  },
  watch: {
    '$route' (to, from) {
      this.fetch(to.params.id)
    }
  },
  computed: {...mapGetters({
    loading: [getterTypes.EPISODE_LOADING],
    episode: [getterTypes.EPISODE]
  }),
    channel () {
      return this.episode.channel
    }
  },
  created () {
    this.fetch(this.$route.params.id)
  },
  methods: mapActions({
    fetch: [actionTypes.FETCH_EPISODE]
  })
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
