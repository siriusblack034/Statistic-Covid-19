<template>
  <v-app id="inspire">
    <v-card elevation="4" primary>
      <v-card-title>
        Statistics
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  async beforeMount() {
    await this.fixDataTable();
  },
  computed: {
    ...mapState(["global"]),
  },
  methods: {
    fixDataTable() {
      let data = this.global;
      console.log(data);
      this.desserts = data.map((el) => {
        let name = el.Country,
          cases = el.TotalConfirmed,
          deaths = el.TotalDeaths,
          recovered = el.TotalRecovered;
        return { name, cases, deaths, recovered };
      });
      this.check = true;
    },
  },

  data() {
    return {
      check: false,
      search: "",
      headers: [
        {
          text: "Country",
          align: "left",
          sortable: false,
          value: "name",
        },
        {
          text: "Cases",
          align: "center",
          sortable: true,
          value: "cases",
        },
        {
          text: "Deaths",
          align: "center",
          sortable: true,
          value: "deaths",
        },
        {
          text: "Recovered",
          align: "center",
          sortable: true,
          value: "recovered",
        },
      ],
      desserts: [],
    };
  },
};
</script>

<style>
</style>