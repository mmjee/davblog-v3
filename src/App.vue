<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-app-bar-title>DAVBlog</v-app-bar-title>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <SideNav />
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer padless app>
      <v-col
        class="text-center"
        cols="12"
      >
        Powered by DAVBlog (V3), an <a href="https://github.com/mmjee/davblog-v3" target="_blank">open source project</a>
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
import SideNav from '@/vendor/side-nav'
export default {
  components: { SideNav }
}
</script>
