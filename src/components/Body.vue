<template>
  <v-container class="pl-0 pr-0">
    <Statistic />
    <v-row>
      <v-col xs="12" sm="12" md="8" lg="8">
        <v-card elevation="2" primary>
          <v-card-title class="justify-center pb-0" primary
            >COVID-19 Stats</v-card-title
          >
          <v-card-title class="justify-center" primary>{{
            country
          }}</v-card-title>
          <line-chart
            v-if="check"
            :chartData="datacollection"
            :options="chartOptions"
            :nameCountry="country"
          ></line-chart>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="4" class="pl-0 pr-0">
        <table-data v-if="check" :dataTabel="global" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LineChart from "./LineChart.js";
import TableData from "./Table";
import Statistic from "./Statistic";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    LineChart,
    TableData,
    Statistic,
  },
  created() {
    this.modeDark = this.darkEnabled;
    this.text = this.modeDark ? "white" : "black";
    this.tick = this.modeDark ? "white" : "1e1e1e";
    console.log(this.color + "created");
  },
  async mounted() {
    await this.callData();
  },
  computed: {
    ...mapState(["statusContry", "country", "global", "darkEnabled"]),
  },
  data() {
    return {
      check: false,
      modeDark: false,
      text: "",
      tick: "",
      datacollection: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: this.text,
          },
        },

        stacked: false,
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: this.text,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: this.text,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    ...mapActions(["setStatusContry", "setGlobal"]),
    async callData() {
      await this.setStatusContry(this.country);
      console.log(this.statusContry);
      if (this.statusContry) {
        let labels = [];
        let statistic = this.statusContry.statistic,
          cases = Object.keys(statistic.cases).map((key) => {
            return statistic.cases[key];
          }),
          deaths = Object.keys(statistic.deaths).map((key) => {
            return statistic.deaths[key];
          }),
          recovered = Object.keys(statistic.recovered).map((key) => {
            return statistic.recovered[key];
          });
        labels = Object.keys(statistic.cases).map((key) => {
          let month = key.split("/")[0],
            day = key.split("/")[1];
          return `${month}/${day}`;
        });
        this.datacollection.labels = labels;

        let data = [];
        data.push({
          data: cases,
          label: "Cases",
          borderColor: "#FC2525",
          pointBackgroundColor: this.tick,
          borderWidth: 2,
          pointBorderColor: this.tick,
        });
        data.push({
          data: deaths,
          label: "Deaths",
          borderColor: "#f87979",
          pointBackgroundColor: this.tick,
          borderWidth: 2,
          pointBorderColor: this.tick,
        });
        data.push({
          data: recovered,
          label: "Recovered",
          borderColor: "#05CBE1",
          pointBackgroundColor: this.tick,
          pointBorderColor: this.tick,
          borderWidth: 2,
        });
        this.datacollection.datasets = data;
        this.check = true;
      }
    },
  },
  watch: {
    country: {
      async handler() {
        this.check = false;
        await this.callData();
      },
      deep: true,
    },
    darkEnabled: {
      handler(newValue) {
        console.log(newValue);
        this.modeDark = newValue;
        this.text = this.modeDark ? "white" : "black";
        this.tick = this.modeDark ? "white" : "1e1e1e";
        this.callData();
      },
    },
  },
};
</script>