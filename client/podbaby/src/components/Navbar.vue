<template>
  <nav class="navbar navbar-default navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-navbar-collapse"
                aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class="navbar-brand">Podbaby</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/" exact>
            <a><icon name="headphones"></icon> Podcasts</a>
          </router-link>
          <li><a href="#" data-toggle="collapse" data-target="#bs-navbar-collapse">Link</a></li>
          <li class="dropdown">
            <a href="#"
               class="dropdown-toggle"
               data-toggle="dropdown"
               role="button"
               aria-haspopup="true"
               aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Link</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
import Icon from './Icon'

export default {
  components: {
    Icon
  }
}
</script>
