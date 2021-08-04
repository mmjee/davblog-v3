<template>
  <v-progress-linear indeterminate height="1vh" v-if="requestInProgress" />
  <FourZeroFour v-else-if="error === 404" />
  <FileViewer :data="data" :attr="attr" v-else-if="dataType === 'FILE'" />
  <DirectoryViewer :data="data" :attr="attr" v-else-if="dataType === 'DIR'" />
</template>

<script>
import { DAVUtil } from '@/lib/dav'

import FileViewer from '@/views/file-viewer'
import DirectoryViewer from '@/views/directory-viewer'
import FourZeroFour from '@/views/404'

export default {
  name: 'Entrypoint',
  components: { FourZeroFour, DirectoryViewer, FileViewer },
  data: () => ({
    requestInProgress: false,
    error: null,
    errorMessage: '',

    // Actual data
    dataType: '',
    attr: null,
    data: null
  }),

  created () {
    this.loadData()
  },

  watch: {
    $route: 'loadData'
  },

  methods: {
    async getFile (filename) {
      let v
      try {
        v = await DAVUtil.getFile(filename)
        return v
      } catch (e) {
        if (e.status === 404) {
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
      this.requestInProgress = true
      this.error = false
      this.errorMessage = null

      // No //s
      let filenameParts = this.$route.path.split('/').slice(1)

      // Special case for / -> renders index.md instead
      if (filenameParts.length === 1 && filenameParts[0] === '') {
        filenameParts = ['index.md']
        this.dataType = 'FILE'
        // Normal file, i.e. filenameParts = ['filename'] or ['directory', 'filename']
      } else if (filenameParts[filenameParts.length - 1].length !== 0) {
        filenameParts[filenameParts.length - 1] += '.md'
        this.dataType = 'FILE'
      } else {
        // Replaces the last empty '' (i.e. /dirname/ results in ['dirname', ''] with ['dirname', 'index.json']
        filenameParts[filenameParts.length - 1] = 'index.json'
        this.dataType = 'DIR'
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
