const filters = {
    owner: "all",
    priority: null,
    status: null,
};

const tasks = [
  {
    id: 1,
    title: "UI Wireframes",
    priority: "high",
    status: "progress",
    owner: "mine"
  },
  {
    id: 2,
    title: "Mobile App screens",
    priority: "medium",
    status: "pending",
    owner: "all"
  },
  {
    id: 3,
    title: "Web Design",
    priority: "low",
    status: "completed",
    owner: "all"
  },
  {
    id: 4,
    title: "Landing QA",
    priority: "low",
    status: "pending",
    owner: "mine"
  },
  {
    id: 5,
    title: "Dashboard Updates",
    priority: "low",
    status: "progress",
    owner: "all"
  }
];


const ownerButtons = document.querySelectorAll("[data-owner]");

ownerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    ownerButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    filters.owner = btn.dataset.owner;
    applyFilters();     
    console.log(filters);
  });
});

const priorityButtons = document.querySelectorAll("[data-priority]");

priorityButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    priorityButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    filters.priority = btn.dataset.priority;
    applyFilters();
    console.log(filters);
    
  });
});

const statusButtons = document.querySelectorAll("[data-status]");

statusButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    statusButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    filters.status = btn.dataset.status;
    applyFilters();
    console.log(filters);
  });
});

document.querySelector(".clear-filters").addEventListener("click", () => {
  filters.owner = "all";
  filters.priority = null;
  filters.status = null;

  document.querySelectorAll(".active")
    .forEach(el => el.classList.remove("active"));

  document.querySelector('[data-owner="all"]').classList.add("active");
  applyFilters();

  console.log("Reset:", filters);

});

const taskContainer = document.getElementById("tasks");

function renderTasks(list) {
  taskContainer.innerHTML = "";

  list.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
      <input type="checkbox">

      <span>${task.title}</span>

      <span class="tag ${task.priority}">
        ${capitalize(task.priority)}
      </span>

      <span class="tag ${task.status}">
        ${formatStatus(task.status)}
      </span>

      <span class="task-link">Tareas </span>
    `;

    taskContainer.appendChild(li);
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatStatus(status) {
  if (status === "progress") return "In Progress";
  return capitalize(status);
  
}

renderTasks(tasks);

function applyFilters() {
  let filtered = [...tasks];

  if (filters.owner === "mine") {
    filtered = filtered.filter(t => t.owner === "mine");
  }

  if (filters.priority) {
    filtered = filtered.filter(t => t.priority === filters.priority);
  }

  if (filters.status) {
    filtered = filtered.filter(t => t.status === filters.status);
  }

  renderTasks(filtered);
}
