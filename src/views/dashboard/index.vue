<template>
  <div class="dashboard-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.chart = new Chart(this.$refs.chartRef.getContext("2d"), {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  overflow: hidden;
}
.test {
  font-size: 24px;
}
</style>