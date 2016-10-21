<template>
  <i class="fa" :class="'fa-' + name" aria-hidden="true"></i>
</template>
<script>
  export default {
    props: ['name']
  }
</script>
