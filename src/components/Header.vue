<template>
  <v-container mt-6>
    <v-row justify="center" align="center">
      <v-col xs="12" sm="8" md="8" lg="7" offset-lg="1">
        <v-autocomplete
          ref="country"
          v-model="country"
          :items="countries"
          label="Country"
          placeholder="Select..."
          required
        ></v-autocomplete>
      </v-col>
      <v-col xs="12" sm="2" md="2" lg="1">
        <v-btn color="primary" text @click="submit" @keypress.enter="submit">
          Submit
        </v-btn>
      </v-col>

      <v-col
        xs="12"
        sm="1"
        md="2"
        lg="2"
        offset-lg="1"
        class="d-flex justify-center"
      >
        <v-icon
          :color="$vuetify.theme.dark ? '#757575' : '#E65100'"
          class="mr-4"
          >mdi-white-balance-sunny</v-icon
        >
        <v-switch v-model="dark" color="yellow"></v-switch>
        <v-icon> mdi-moon-waxing-crescent </v-icon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      country: null,
      contries: [],
      dark: false,
    };
  },
  created() {
    this.dark = this.darkEnabled;
    this.$vuetify.theme.dark = this.dark;
  },
  computed: {
    ...mapState(["countries", "darkEnabled"]),
  },
  methods: {
    ...mapActions(["setStatusContry"]),
    ...mapMutations(["setCountry", "setMode"]),
    async submit() {
      if (this.country) {
        await this.setCountry(this.country);
        await this.setStatusContry(this.country);
        this.country = null;
      }
    },
  },
  watch: {
    dark(newValue) {
      this.$vuetify.theme.dark = newValue;
      console.log(newValue);
      this.setMode(newValue);
    },
  },
};
</script>

<style scoped>
.v-input__control {
  width: 40px;
}
</style>
