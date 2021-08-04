<template>
  <p>{{ $route }}</p>
</template>

<script>
import { DAVUtil } from '@/lib/dav'
import marked from 'marked'

export default {
  name: 'Entrypoint',
  data: () => ({
    requestInProgress: false,
    error: null,
    errorMessage: '',

    // Actual data
    attr: null,
    data: null
  }),

  created () {
    this.loadData()
  },

  methods: {
    async getFile (fullFN, isDir) {
      let v
      try {
        if (isDir) {
          v = await DAVUtil.getFile(fullFN + 'index.json')
        } else {
          v = await DAVUtil.getFile(fullFN)
        }
        return v
      } catch (e) {
        if (e.isAxiosError && e.response.status === 404) {
          this.errored = 404
        } else {
          this.errored = true
          this.errorMessage = e.message
        }
      }
    },

    async getAttrs (fullFN) {
      // silently fail if request fails, assuming getPage will set error data instead
      try {
        return await DAVUtil.statFile(fullFN)
      } catch (e) {
        console.warn('Caught error while stat\'ng file', e)
        return {
          lastmod: null
        }
      }
    },

    async loadData () {
      this.errored = false
      this.errorMessage = null
      let isDir = false

      let filenameParts = this.$route.params.pathMatch.split('/').slice(1)
      // handle /
      if (filenameParts.length === 1 && filenameParts[0].length === 0) {
        filenameParts = ['index.md']
        // normal file, not a directory
      } else if (filenameParts[filenameParts.length - 1].length !== 0) {
        filenameParts[filenameParts.length - 1] += '.md'
      } else {
        isDir = true
      }

      const fullFN = filenameParts.join('/')

      const v = await Promise.all([
        this.getFile(fullFN, isDir),
        this.getAttrs(fullFN)
      ])

      const pathname = this.$route.params.pathMatch

      document.title = 'DAVBlog: ' + (pathname === '/' ? 'Index' : pathname)
      this.loading = false
      this.data = v[0] && !isDir ? marked(v[0]) : v[0]
      this.attr = v[1]
    }
  }
}
</script>
