// Get references to HTML elements
const topicInput = document.getElementById("topicInput");
const statusSelect = document.getElementById("statusSelect");
const addBtn = document.getElementById("addBtn");
const topicList = document.getElementById("topicList");

// Function to add a new topic
function addTopic() {
  const topicName = topicInput.value.trim();
  const topicStatus = statusSelect.value;

  if (topicName === "") {
    alert("Please enter a DSA topic.");
    return;
  }

  // Step 1: Create topic object
  const topic = {
    name: topicName,
    status: topicStatus
  };

  // Step 2: Get saved topics from localStorage (or empty list)
  const topics = JSON.parse(localStorage.getItem("topics") || "[]");

  // Step 3: Add new topic
  topics.push(topic);

  // Step 4: Save updated list to localStorage
  localStorage.setItem("topics", JSON.stringify(topics));

  // Step 5: Show it on screen
  displayTopic(topic);

  // Step 6: Clear input fields
  topicInput.value = "";
  statusSelect.value = "Not Started";
}

function displayTopic(topic, index) {
  const topicCard = document.createElement("div");
  topicCard.classList.add("topic-card");

  const topicContent = document.createElement("span");
  topicContent.textContent = `${topic.name} - [${topic.status}]`;

  // ✅ Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");

  // ✅ When delete is clicked:
  deleteBtn.addEventListener("click", function () {
    deleteTopic(index);
  });

  topicCard.appendChild(topicContent);
  topicCard.appendChild(deleteBtn);
  topicList.appendChild(topicCard);
}

function deleteTopic(index) {
  // Get all topics from localStorage
  let topics = JSON.parse(localStorage.getItem("topics") || "[]");

  // Remove the one at the given index
  topics.splice(index, 1);

  // Save back the updated list
  localStorage.setItem("topics", JSON.stringify(topics));

  // Refresh the screen (clear and re-show)
  topicList.innerHTML = "";
  topics.forEach(displayTopicWithIndex);
}

// Add event listener to button
addBtn.addEventListener("click", addTopic);

function displayTopicWithIndex(topic,index){
    displayTopic(topic,index);
}

// ✅ Load topics from localStorage when page opens
window.onload = function () {
  const savedTopics = JSON.parse(localStorage.getItem("topics") || "[]");
  savedTopics.forEach(displayTopicWithIndex);
};