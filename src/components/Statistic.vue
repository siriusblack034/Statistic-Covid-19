<template>
  <v-container>
    <v-content class="text-right">Updated: {{ date | formatTime }} </v-content>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  beforeMount() {
    let nameCountry = this.country;
    let country = this.global.find((el) => el.Country == nameCountry);
    console.log(country);
    this.date = country.Date;
    this.newCases = country.NewConfirmed;
    this.newDeaths = country.NewDeaths;
    this.newRecovered = country.NewRecovered;
  },
  data() {
    return {
      date: "",
      newCases: "",
      newDeaths: "",
      newRecovered: "",
    };
  },
  computed: {
    ...mapState(["global", "country"]),
  },
};
</script>

<style>
</style>