// ==================== COMMON FUNCTIONS ====================
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "blossom") {
    // Pink theme colors
    root.style.setProperty("--primary-color-1", "#e83f8e");
    root.style.setProperty("--primary-color-2", "#c42a7a");
    root.style.setProperty("--primary-color-3", "#9c1a5e");
    root.style.setProperty("--primary-dark", "#5a0e36");
   
     const heroImage = document.querySelector(".hero");
    if (heroImage) {
      heroImage.src = "heroGirl.jpg";
    }
     const themeDiv = document.querySelector(".themeText_themeSelection");
    if (themeDiv) {
      themeDiv.style.backgroundColor = '#e83f8e';
    }
    //empty_img
      const emptyImg = document.querySelector(".empty_img");
    if (emptyImg) {
      emptyImg.src = "emptyGirl.jpg";
    }
  } else {
    // Azure theme colors (default)
    root.style.setProperty("--primary-color-1", "#4361ee");
    root.style.setProperty("--primary-color-2", "#443ea8");
    root.style.setProperty("--primary-color-3", "#4b63cf");
    root.style.setProperty("--primary-dark", "#211e54");
      const heroImage = document.querySelector(".hero");
    if (heroImage) {
      heroImage.src = "hero.jpg";
    }
     const themeDiv = document.querySelector(".themeText_themeSelection");
    if (themeDiv) {
      themeDiv.style.backgroundColor = '#4361ee';
    }
  }
}

function displayGreeting() {
  const greetings = {
    morning: [
      'Good morning, <span id="userNameDisplay">{name}</span>! Ready to conquer the day?',
      'Rise and shine, <span id="userNameDisplay">{name}</span>! Let\'s make today amazing!',
      'Hello, <span id="userNameDisplay">{name}</span>! A fresh start awaits.'
    ],
    afternoon: [
      'Good afternoon, <span id="userNameDisplay">{name}</span>! Keep going strong!',
      'Hey <span id="userNameDisplay">{name}</span>, hope your day\'s going well!',
      'Midday vibes, <span id="userNameDisplay">{name}</span>! You\'ve got this!'
    ],
    evening: [
      'Good evening, <span id="userNameDisplay">{name}</span>! You made it through the day.',
      'Hey <span id="userNameDisplay">{name}</span>, time to relax and recharge!',
      'Evenings are for reflection, <span id="userNameDisplay">{name}</span>. You did well today.'
    ],
    night: [
      'Tough day, right <span id="userNameDisplay">{name}</span>? Let\'s wrap things up.',
      'Night owl mode, <span id="userNameDisplay">{name}</span>?',
      'Peaceful night ahead, <span id="userNameDisplay">{name}</span>.'
    ]
  };

  const hour = new Date().getHours();
  let timeOfDay = "morning";
  if (hour >= 13 && hour < 18) timeOfDay = "afternoon";
  else if (hour >= 18 && hour < 21) timeOfDay = "evening";
  else if (hour >= 21 || hour < 6) timeOfDay = "night";

  const greetList = greetings[timeOfDay];
  const randomGreet = greetList[Math.floor(Math.random() * greetList.length)];
  const userName = localStorage.getItem("userName") || "User";
  
  const greetElement = document.getElementById("userGreet");
  if (greetElement) {
    greetElement.innerHTML = randomGreet.replace("{name}", userName);
  }
}

// ==================== PAGE INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  // Apply theme to all pages
  const savedTheme = localStorage.getItem("selectedTheme") || "azure";
  applyTheme(savedTheme);

  // Initialize fade-in animation for all pages
  document.body.classList.add("fade-in");

  // ==================== HOME PAGE (index.html) ====================
  if (document.querySelector(".home_wrapper")) {
    const startBtn = document.getElementById("start_btn");
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");

    // Quote Generator
    if (quoteElement && authorElement) {
      const quoteList = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
        { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
        { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" }
      ];

      const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
      quoteElement.innerText = randomQuote.text;
      authorElement.innerText = randomQuote.author;
    }

    // Start button functionality
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        const storedName = localStorage.getItem("userName");
        window.location.href = storedName ? "to-do.html" : "user.html";
      });
    }
  }

  // ==================== TO-DO PAGE (to-do.html) ====================
  if (document.getElementById("task-list")) {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("add_btn");
    const taskList = document.getElementById("task-list");
    const openTimeInputBtn = document.querySelector(".openTimeInput");
    const backBtn = document.querySelector(".backBtn");
    const timeInputGroup = document.querySelector(".time-input-group");

    // Task management
    let tasks = JSON.parse(localStorage.getItem("mementoTasks")) || [];

    // Core functions
    function addTask() {
      const taskText = taskInput.value.trim();
      if (!taskText) {
        alert("Please Add Task!");
        return;
      }

      const isTimeVisible = window.getComputedStyle(timeInputGroup).display !== "none";
      const startTime = document.getElementById("start-time").value;
      const endTime = document.getElementById("end-time").value;

      if (isTimeVisible) {
        if (!startTime || !endTime) {
          alert("Please choose both start and end times");
          return;
        }
        if (startTime >= endTime) {
          alert("End time must be after start time");
          return;
        }
      }

      tasks.push({
        text: taskText,
        completed: false,
        startTime: isTimeVisible ? startTime : null,
        endTime: isTimeVisible ? endTime : null
      });

      taskInput.value = "";
      document.getElementById("start-time").value = "";
      document.getElementById("end-time").value = "";
      saveAndRender();
    }

    function renderTasks() {
      taskList.innerHTML = "";
      
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        
        if (task.startTime && task.endTime) {
          const timeDiv = document.createElement("div");
          timeDiv.className = "time-display";
          timeDiv.textContent = `${formatTime(task.startTime)} - ${formatTime(task.endTime)}`;
          li.appendChild(timeDiv);
        }

        const taskContent = document.createElement("div");
        taskContent.className = "task-content";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          tasks[index].completed = checkbox.checked;
          saveAndRender();
        });

        const textSpan = document.createElement("span");
        textSpan.className = "task-text";
        textSpan.textContent = task.text;

        const deleteBtn = document.createElement("i");
        deleteBtn.className = "fas fa-trash delete-icon";
        deleteBtn.addEventListener("click", () => {
          tasks.splice(index, 1);
          saveAndRender();
        });

        taskContent.append(checkbox, textSpan, deleteBtn);
        li.append(taskContent);
        taskList.appendChild(li);
      });
    }

    function saveAndRender() {
      localStorage.setItem("mementoTasks", JSON.stringify(tasks));
      renderTasks();
      updateProgress();
      updateEmptyState();
    }

    function updateProgress() {
      const total = tasks.length;
      const completed = tasks.filter(task => task.completed).length;
      const remaining = total - completed;

      document.getElementById("total_task_count").textContent = total;
      document.getElementById("completed_task_count").textContent = completed;
      document.getElementById("remaining_task_count").textContent = remaining;
      
      const progressPercentage = total > 0 ? (completed * 100) / total : 0;
      document.getElementById("progress-bar").style.width = `${progressPercentage}%`;
    }

    function updateEmptyState() {
      const isEmpty = tasks.length === 0;
      document.getElementById("empty_img_text_div").style.display = isEmpty ? "block" : "none";
      document.getElementById("taskContainer").style.display = isEmpty ? "none" : "block";
    }

    function toggleTimeInput(show) {
      if (!openTimeInputBtn || !backBtn || !timeInputGroup) return;
      openTimeInputBtn.style.display = show ? "none" : "block";
      backBtn.style.display = show ? "flex" : "none";
      timeInputGroup.style.display = show ? "flex" : "none";
    }

    function formatTime(timeString) {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    }

    // Initialize to-do page
    renderTasks();
    updateProgress();
    updateEmptyState();
    displayGreeting();

    // Event listeners
    if (addBtn) addBtn.addEventListener("click", addTask);
    if (taskInput) taskInput.addEventListener("keydown", (e) => e.key === "Enter" && addTask());
    if (openTimeInputBtn) openTimeInputBtn.addEventListener("click", toggleTimeInput.bind(null, true));
    if (backBtn) backBtn.addEventListener("click", toggleTimeInput.bind(null, false));
  }

  // ==================== USER PAGE (user.html) ====================
  if (document.getElementById("submituserName")) {
    const submitBtn = document.getElementById("submituserName");
    const userNameInput = document.getElementById("userName");
    const azureBtn = document.querySelector(".azure_btn");
    const blossomBtn = document.querySelector(".blossom_btn");
    const themeText = document.getElementById("themeText");
    const saveThemeBtn = document.querySelector(".saveThemeBtn");

    // Display stored username in input field if it exists
    const storedName = localStorage.getItem("userName");
    if (storedName && userNameInput) {
      userNameInput.value = storedName;
    }

    // Save username button functionality
    if (submitBtn && userNameInput) {
      submitBtn.addEventListener("click", () => {
        const name = userNameInput.value.trim();
        if (name) {
          localStorage.setItem("userName", name);
          window.location.href = "to-do.html";
        } else {
          alert("Please enter your name");
        }
      });
    }

    // Theme selection buttons
    if (azureBtn) {
      azureBtn.addEventListener("click", () => {
        localStorage.setItem("selectedTheme", "azure");
        applyTheme("azure");
        themeText.textContent = "Azure";
      });
    }

    if (blossomBtn) {
      blossomBtn.addEventListener("click", () => {
        localStorage.setItem("selectedTheme", "blossom");
        applyTheme("blossom");
        themeText.textContent = "Blossom";
      });
    }

    // Save theme button - goes back to home
    if (saveThemeBtn) {
      saveThemeBtn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }
  }
});