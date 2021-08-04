<template>
  <v-list color="transparent">
    <v-list-item
      v-for="link in links"
      :key="link.url"
      link
      :to="link.url"
    >
      <v-list-item-content>
        <v-list-item-title>
          {{ link.text }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'SideNav',
  data: () => ({
    links: [
      {
        text: 'Blog',
        url: '/blog/'
      },
      {
        text: 'Stories',
        url: '/stories/'
      },
      {
        text: 'Resume',
        url: '/resume'
      }
    ]
  })
}
</script>
