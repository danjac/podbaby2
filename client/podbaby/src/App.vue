<template>
  <div id="app" class="container">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

// load Bootstrap JS
window.jQuery = require('jquery')
require('bootstrap')

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
</style>
