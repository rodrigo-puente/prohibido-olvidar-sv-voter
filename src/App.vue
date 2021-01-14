<template>
  <div id="app">
    <navbar-component/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>
<script>
import NavbarComponent from '@/components/NavbarComponent'
export default {
  name: 'Form',
  components: {
    NavbarComponent,
  },
};
</script>
