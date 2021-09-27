import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    options: {
      title: {
          display: false,
          text: 'Distribución'
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
            ticks: {
                display: true 
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
          },
          categoryPercentage: 1.0,
          barPercentage: 1.0
        }],
        yAxes: [{
          ticks: {
              display: true,
              beginAtZero: true
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
        } 
      }],
    }

    }
  }),

  mounted () {
    console.log(this.chartdata)
    this.renderChart(this.chartdata, this.options)
  }
}