<template>
  <v-progress-linear indeterminate v-if="requestInProgress" />
</template>

<script>
import { DAVUtil } from '@/lib/dav'

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
    async getFile (filename) {
      let v
      try {
        v = await DAVUtil.getFile(filename)
        return v
      } catch (e) {
        if (e.isAxiosError && e.response.status === 404) {
          this.error = 404
        } else {
          this.error = true
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
      this.error = false
      this.errorMessage = null

      // No //s
      let filenameParts = this.$route.path.split('/').slice(1).filter(x => x !== '')

      // handle /
      if (filenameParts.length === 1 && filenameParts[0].length === 0) {
        filenameParts = ['index.md']
        // normal file, not a directory
      } else if (filenameParts[filenameParts.length - 1].length !== 0) {
        filenameParts[filenameParts.length - 1] += '.md'
      } else {
        filenameParts.push('index.json')
      }

      const fullFN = filenameParts.join('/')

      const [data, attr] = await Promise.all([
        this.getFile(fullFN),
        this.getAttrs(fullFN)
      ])

      this.requestInProgress = false
      this.data = data
      this.attr = attr
    }
  }
}
</script>
