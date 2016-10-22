import Vue from 'vue'
import Icon from 'src/components/Icon'

describe('Icon.vue', () => {
  it('should render an icon', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Icon, {
        props: {
          name: 'warning'
        }
      })
    })
    expect(vm.$el.getAttribute('class')).to.equal('fa fa-warning')
  })
})
