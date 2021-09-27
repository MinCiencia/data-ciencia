import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['150', '155'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20],
        }
      ]
    },
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
    this.renderChart(this.chartdata, this.options)
  }
}