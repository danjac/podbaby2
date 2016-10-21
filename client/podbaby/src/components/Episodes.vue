<template>
  <div>
    <div class="page-header">
      <h1>Episodes</h1>
    </div>
    <h1 v-if="loading" class="loader">
      <i class="fa fa-refresh fa-spin fa-5x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </h1>
    <div v-else>
    <pager @previous-page="previousPage"
           @next-page="nextPage"
           :previous="previous"
           :next="next"></pager>
    <ul class="list-group">
      <li class="list-group-item" v-for="episode in episodes">

        <div class="media">
          <div class="media-left">
            <a href="" v-if="episode.channel.thumbnail">
              <img :src="episode.channel.thumbnail.url"
                   :alt="episode.channel.name"
                   class="media-object" />
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">
              <a href="">{{episode.channel.name}}</a>
            </h4>
            <h5>{{episode.title}}</h5>
            <span class="label label-default category"
                  v-for="category in episode.channel.categories">
              <a href="#">{{category.name}}</a>
            </span>
            <span v-if="episode.explicit" class="label label-danger category">
              <icon name="warning"></icon>
              Explicit
            </span>
          </div>
        </div>

        <p class="description">{{episode.subtitle}}</p>
      </li>
    </ul>
    <pager @previous-page="previousPage"
           @next-page="nextPage"
           :previous="previous"
           :next="next"></pager>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
import Pager from './Pager'

export default {
  components: {
    Icon,
    Pager
  },
  data () {
    return {
      episodes: [],
      previous: null,
      next: null,
      loading: false
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch (url) {
      this.loading = true
      this.$http.get(url || 'episodes/').then(response => {
        this.episodes = response.body.results
        this.previous = response.body.previous
        this.next = response.body.next
        this.loading = false
      })
    },
    nextPage () {
      if (this.next) {
        this.fetch(this.next)
      }
    },
    previousPage () {
      if (this.previous) {
        this.fetch(this.previous)
      }
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
