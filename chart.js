document.addEventListener('DOMContentLoaded', () => {
    const barCanvas = document.getElementById('barChart');
    const pieCanvas = document.getElementById('pieChart');
  
    if (barCanvas) {
      const barCtx = barCanvas.getContext('2d');
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Income Disparity', 'Education Gap', 'Social Exclusion'],
          datasets: [{
            label: 'Index (out of 100)',
            data: [68, 52, 65],
            backgroundColor: [
              'rgba(127, 0, 255, 0.7)',
              'rgba(225, 0, 255, 0.7)',
              'rgba(127, 0, 255, 0.7)'
            ],
            borderColor: [
              'rgba(127, 0, 255, 1)',
              'rgba(225, 0, 255, 1)',
              'rgba(127, 0, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true, max: 100 }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  
    if (pieCanvas) {
      const pieCtx = pieCanvas.getContext('2d');
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Community Empowerment', 'Inclusive Education', 'Policy Reforms', 'Awareness Campaigns'],
          datasets: [{
            data: [40, 30, 20, 10],
            backgroundColor: [
              'rgba(127, 0, 255, 0.7)',
              'rgba(225, 0, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(255, 205, 86, 0.7)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }
  });
  