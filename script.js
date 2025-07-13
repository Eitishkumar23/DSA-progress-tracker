// Get references to HTML elements
const topicInput = document.getElementById("topicInput");
const statusSelect = document.getElementById("statusSelect");
const difficultySelect = document.getElementById("difficultySelect");
const addBtn = document.getElementById("addBtn");
const topicList = document.getElementById("topicList");

// Function to add a new topic
function addTopic() {
  const topicName = topicInput.value.trim();
  const topicStatus = statusSelect.value;
  const topicDifficulty = difficultySelect.value;

  if (topicName === "") {
    alert("Please enter a DSA topic.");
    return;
  }

  // Create topic object
  const topic = {
    name: topicName,
    status: topicStatus,
    difficulty: topicDifficulty,
    solved: topicStatus === "Completed"
  };

  // Get saved topics from localStorage
  const topics = JSON.parse(localStorage.getItem("topics") || "[]");

  // Add new topic
  topics.push(topic);

  // Save updated list to localStorage
  localStorage.setItem("topics", JSON.stringify(topics));

  // Show on screen
  displayTopic(topic, topics.length - 1);

  // Clear input fields
  topicInput.value = "";
  statusSelect.value = "Not Started";
  difficultySelect.value = "Easy";

  // Update chart
  calculateProgressFromStorage();
}

// Function to show one topic
function displayTopic(topic, index) {
  const topicCard = document.createElement("div");
  topicCard.classList.add("topic-card");

  const topicContent = document.createElement("span");
  topicContent.textContent = `${topic.name} - [${topic.status}] - ${topic.difficulty}`;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function () {
    deleteTopic(index);
  });

  topicCard.appendChild(topicContent);
  topicCard.appendChild(deleteBtn);
  topicList.appendChild(topicCard);
}

// Delete topic
function deleteTopic(index) {
  let topics = JSON.parse(localStorage.getItem("topics") || "[]");

  // Remove selected
  topics.splice(index, 1);

  // Save updated
  localStorage.setItem("topics", JSON.stringify(topics));

  // Refresh screen
  topicList.innerHTML = "";
  topics.forEach(displayTopicWithIndex);

  // Update chart
  calculateProgressFromStorage();
}

// Display with index
function displayTopicWithIndex(topic, index) {
  displayTopic(topic, index);
}

// Load on page open
window.onload = function () {
  const savedTopics = JSON.parse(localStorage.getItem("topics") || "[]");
  savedTopics.forEach(displayTopicWithIndex);
  calculateProgressFromStorage();
};

// Chart.js render
function updateProgressChart(easy, medium, hard) {
  const ctx = document.getElementById("progressChart").getContext("2d");

  if (window.myChart instanceof Chart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Easy", "Medium", "Hard"],
      datasets: [
        {
          label: "Completed Topics",
          data: [easy, medium, hard],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
          borderColor: ["#388e3c", "#f57c00", "#d32f2f"],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  });
}

// Calculate solved topics by difficulty
function calculateProgressFromStorage() {
  const data = JSON.parse(localStorage.getItem("topics") || "[]");

  let easy = 0, medium = 0, hard = 0;

  data.forEach((item) => {
    if (item.solved) {
      if (item.difficulty === "Easy") easy++;
      else if (item.difficulty === "Medium") medium++;
      else if (item.difficulty === "Hard") hard++;
    }
  });

  updateProgressChart(easy, medium, hard);
}

// Add button handler
addBtn.addEventListener("click", addTopic);

// ✅ Toggle Dark Mode
const toggleBtn = document.getElementById("toggleDark");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});

// ✅ Load theme preference on page load
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
  }
});

