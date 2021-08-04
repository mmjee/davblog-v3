<template>
  <v-container class="pa-4">
    <h5 class="subtitle-1">Last Modified: {{ localizedLastMod }}</h5>
    <v-divider class="my-4" />
    <div v-html="markedUpResult" />
  </v-container>
</template>

<script>
import marked from 'marked'

const dtAPI = new Intl.DateTimeFormat([], {
  dateStyle: 'full',
  timeStyle: 'full',
  hour12: true
})

export default {
  name: 'FileViewer',
  props: ['data', 'attr'],
  computed: {
    markedUpResult () {
      return marked(this.data, {
        breaks: true
      })
    },

    localizedLastMod () {
      const dt = new Date(this.attr.lastmod)

      return dtAPI.format(dt)
    }
  }
}
</script>
