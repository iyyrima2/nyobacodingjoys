// Chart.js konfigurasi
const ctx = document.getElementById('salesChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['27 Okt', '28 Okt', '29 Okt', '30 Okt', '31 Okt', '1 Nov', '2 Nov'],
    datasets: [{
      label: 'Penjualan',
      data: [3, 3, 6, 3, 2, 2, 1],
      borderColor: '#40b8c4',
      backgroundColor: 'rgba(64, 184, 196, 0.2)',
      borderWidth: 2,
      tension: 0.3,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: '#40b8c4'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});
