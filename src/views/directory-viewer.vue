<template>
  <v-progress-linear height="1vh" indeterminate v-if="loaded === false" />
  <div v-else>
    <v-card outlined class="ma-2" v-for="loadedPage in loadedPages" :key="loadedPage[2]">
      <v-card-title class="text-subtitle-2">
        <router-link class="text-decoration-underline" :to="loadedPage[2]">{{ loadedPage[2] }}</router-link>
      </v-card-title>
      <v-card-text>
        <FileViewer :data="loadedPage[0]" :attr="loadedPage[1]" />
      </v-card-text>
    </v-card>
    <v-pagination
      v-model="currentlySelectedPage"
      :length="totalPagesPossible"
    />
  </div>
</template>

<script>
import { DAVUtil } from '@/lib/dav'
import cloneDeep from 'lodash-es/cloneDeep'
import FileViewer from '@/views/file-viewer'

export default {
  name: 'DirectoryViewer',
  components: { FileViewer },
  props: ['data', 'attr'],
  data: () => ({
    loaded: false,
    loadedPages: [],
    currentlySelectedPage: 1
  }),
  watch: {
    currentlySelectedPage: 'reloadData',
    data: 'reloadData'
  },

  methods: {
    async reloadData () {
      this.loaded = false
      const base = this.currentlySelectedPage - 1
      const pagesToLoad = this.orderedData.slice(base, base + 2)

      this.loadedPages = await Promise.all(pagesToLoad.map(async p => {
        return Promise.all([
          DAVUtil.getFile(p.filename),
          DAVUtil.statFile(p.filename),
          // The usual path, i.e. excepting the .md at the end
          Promise.resolve(p.filename.slice(0, p.filename.length - 3))
        ])
      }))
      this.loaded = true
    }
  },

  created () {
    return this.reloadData()
  },

  computed: {
    orderedData () {
      return cloneDeep(this.data).reverse()
    },

    totalPagesPossible () {
      return Math.ceil(this.data.length / 2)
    }
  }
}
</script>
