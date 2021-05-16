import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    options: {
      type: Object,
      default: null
    },
    chartData: {
      type: Object,
      default: null
    },
    nameCountry: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      gradient: null,
      gradient2: null,
      gradient3: null
    }
  },
  computed: {
    dataChart() {
      this.chartData.datasets[0].backgroundColor = this.gradient
      this.chartData.datasets[2].backgroundColor = this.gradient2
      this.chartData.datasets[1].backgroundColor = this.gradient3
      console.log(this.options);
      return this.chartData
    }
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient3 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.gradient3.addColorStop(0, "rgba(0, 0,0, 0.5)");
    this.gradient3.addColorStop(0.5, "rgba(0, 0, 0, 0.25)");
    this.gradient3.addColorStop(1, "rgba(0, 0, 0, 0)");
    this.renderLineChart()
  },
  methods: {
    renderLineChart() {

      this.renderChart(this.dataChart, this.options)
    }
  },
  watch: {
    dataChart: function () {

      this.renderLineChart();
    }
  }
}