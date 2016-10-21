<template>
  <nav aria-label="...">
  	<ul class="pager">
        <li class="previous" :class="{ disabled: !previous }">
          <a href="#" @click.prevent="previousPage"><span aria-hidden="true">&larr;</span> Previous</a>
  		</li>
        <li class="next" :class="{ disabled: !next }">
          <a href="#" @click.prevent="nextPage">Next <span aria-hidden="true">&rarr;</span></a>
  		</li>
  	</ul>
  </nav>
</template>

<script>
export default {
  props: [
    'previous',
    'next'
  ],
  methods: {
    previousPage () {
      this.$emit('previous-page')
    },
    nextPage () {
      this.$emit('next-page')
    }
  }
}
</script>
