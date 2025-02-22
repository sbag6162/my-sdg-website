// Dark Mode Toggle
const darkToggle = document.getElementById('dark-mode-toggle');
if (darkToggle) {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
  });
}

// Chatbot Functionality
const chatbotIcon = document.getElementById('chatbotIcon');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

if (chatbotIcon) {
  chatbotIcon.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
  });
}
if (chatbotClose) {
  chatbotClose.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
  });
}
if (chatbotSend) {
  chatbotSend.addEventListener('click', sendMessage);
}
if (chatbotInput) {
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

function displayUserMessage(message) {
  const div = document.createElement('div');
  div.className = 'user-msg';
  div.textContent = message;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function displayBotMessage(message) {
  const div = document.createElement('div');
  div.className = 'bot-msg';
  div.textContent = message;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function sendMessage() {
  const userMsg = chatbotInput.value.trim();
  if (!userMsg) return;
  displayUserMessage(userMsg);
  chatbotInput.value = '';

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg }),
    });
    const data = await response.json();
    displayBotMessage(data.reply);
  } catch (err) {
    displayBotMessage("Error connecting to the server.");
  }
}

// Toggle extra info in issue cards
function toggleInfo(card) {
  const moreInfo = card.querySelector('.more-info');
  if (moreInfo) {
    moreInfo.style.display = (moreInfo.style.display === 'none' || moreInfo.style.display === '') ? 'block' : 'none';
  }
}

// Initialize Charts on the Stats page
document.addEventListener('DOMContentLoaded', () => {
  // Bar Chart
  const barCanvas = document.getElementById('barChart');
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
            'rgba(33, 150, 243, 0.7)',
            'rgba(33, 150, 243, 0.7)',
            'rgba(33, 150, 243, 0.7)'
          ],
          borderColor: [
            'rgba(33, 150, 243, 1)',
            'rgba(33, 150, 243, 1)',
            'rgba(33, 150, 243, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: { y: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } }
      }
    });
  }

  // Pie Chart
  const pieCanvas = document.getElementById('pieChart');
  if (pieCanvas) {
    const pieCtx = pieCanvas.getContext('2d');
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Community Empowerment', 'Inclusive Education', 'Policy Reforms', 'Awareness Campaigns'],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: [
            'rgba(33, 150, 243, 0.7)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // Line Chart
  const lineCanvas = document.getElementById('lineChart');
  if (lineCanvas) {
    const lineCtx = lineCanvas.getContext('2d');
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
          label: 'Income Index',
          data: [60, 63, 65, 68, 68],
          fill: false,
          borderColor: 'rgba(33, 150, 243, 1)',
          tension: 0.1
        }]
      },
      options: { scales: { y: { beginAtZero: true, max: 100 } } }
    });
  }

  // Radar Chart
  const radarCanvas = document.getElementById('radarChart');
  if (radarCanvas) {
    const radarCtx = radarCanvas.getContext('2d');
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Income', 'Education', 'Social', 'Health', 'Infrastructure'],
        datasets: [{
          label: 'Current State',
          data: [68, 52, 65, 60, 55],
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderColor: 'rgba(33, 150, 243, 1)',
          borderWidth: 1
        }]
      },
      options: { scales: { r: { beginAtZero: true, max: 100 } } }
    });
  }
});
