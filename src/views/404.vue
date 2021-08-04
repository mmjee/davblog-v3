<template>
  <v-card color="warning" style="min-height: 70vh;">
    <v-card-title class="text-h1 justify-center">
      404
    </v-card-title>
    <v-card-subtitle class="text-center text-h5">
      File or directory not found, maybe go back to <router-link to="/">the homepage?</router-link>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'FourZeroFour'
}
</script>
