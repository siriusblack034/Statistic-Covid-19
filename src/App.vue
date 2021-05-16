<template>
  <v-app>
    <v-main>
      <Header />
      <Body v-if="statusContry" class="pt-4"></Body>
      <Footer v-if="statusContry" />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Body from "./components/Body.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",

  components: {
    Header,
    Body,
    Footer,
  },
  async created() {
    await this.setGlobal();
  },
  methods: {
    ...mapActions(["setGlobal"]),
  },
  computed: {
    ...mapState(["statusContry"]),
  },
  data: () => ({}),
};
</script>
