<template>
  <v-container class="pa-4">
    <h5 class="text-subtitle-1">Last Modified: {{ localizedLastMod }}</h5>
    <v-divider class="my-4" />
    <div v-html="markedUpResult" />
  </v-container>
</template>

<script>
import { marked } from 'marked'

const dtAPI = new Intl.DateTimeFormat([], {
  dateStyle: 'full',
  timeStyle: 'full',
  hour12: true
})

const markedRenderer = {
  link (href, title, text) {
    const a = document.createElement('a')
    if (title != null) {
      a.setAttribute('title', title)
    }
    a.setAttribute('href', href)
    a.setAttribute('rel', 'noreferrer')
    a.innerHTML = text
    return a.outerHTML
  }
}

marked.use({
  breaks: true,
  renderer: markedRenderer
})

export default {
  name: 'FileViewer',
  props: ['data', 'attr'],
  metaInfo () {
    return {
      meta: [
        {
          name: 'twitter:description',
          content: this.computedDescription
        },
        {
          property: 'og:description',
          content: this.computedDescription
        },
        {
          name: 'description',
          content: this.computedDescription
        }
      ]
    }
  },

  computed: {
    markedUpResult () {
      return marked(this.data)
    },

    localizedLastMod () {
      const dt = new Date(this.attr.lastmod)

      return dtAPI.format(dt)
    },

    computedDescription () {
      const lines = this.data.split('\n').filter(line => line !== '')
      return lines.slice(0, 2).join('\n')
    }
  }
}
</script>
