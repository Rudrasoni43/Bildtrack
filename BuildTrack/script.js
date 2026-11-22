// ===== 2. PLAIN JAVASCRIPT (no library or backend required) =====
// Data is intentionally simple so a beginner can edit it.
const startingTasks = [
  { id: 1, name: "Site preparation", assignee: "Ground Team", deadline: "2026-10-20", status: "Completed", progress: 100 },
  { id: 2, name: "Foundation work", assignee: "Civil Team", deadline: "2026-10-27", status: "In progress", progress: 65 },
  { id: 3, name: "Brick masonry", assignee: "Masonry Team", deadline: "2026-10-22", status: "In progress", progress: 35 },
  { id: 4, name: "Roof structure", assignee: "Roofing Team", deadline: "2026-11-05", status: "Not started", progress: 0 }
];
let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = localStorage.getItem("buildTrackTasks");
    return saved ? JSON.parse(saved) : [...startingTasks];
  } catch (error) { return [...startingTasks]; }
}
function saveTasks() {
  localStorage.setItem("buildTrackTasks", JSON.stringify(tasks));
}
function isDelayed(task) {
  // A task is delayed if its deadline is before today's date and it is unfinished.
  return task.status !== "Completed" && task.deadline < new Date().toISOString().slice(0, 10);
}
function statusClass(task) {
  if (isDelayed(task)) return "delayed";
  if (task.status === "Completed") return "on-track";
  if (task.status === "Not started") return "pending";
  return "on-track";
}
function renderTasks() {
  const table = document.getElementById("taskTable");
  table.innerHTML = "";
  tasks.forEach(task => {
    const row = document.createElement("tr");
    // Use textContent for user-entered values rather than injecting them as HTML.
    const nameCell = document.createElement("td");
    nameCell.textContent = task.name;
    const assigneeCell = document.createElement("td");
    assigneeCell.textContent = task.assignee;
    const deadlineCell = document.createElement("td");
    deadlineCell.textContent = task.deadline;
    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = "pill " + statusClass(task);
    badge.textContent = isDelayed(task) ? "Delayed" : task.status;
    statusCell.appendChild(badge);
    const progressCell = document.createElement("td");
    progressCell.innerHTML = '<div class="progress-track"><div class="progress-fill" style="width:' + Math.max(0, Math.min(100, task.progress)) + '%"></div></div><small>' + task.progress + '%</small>';
    const actionCell = document.createElement("td");
    const statusSelect = document.createElement("select");
    ["Not started", "In progress", "Completed"].forEach(optionText => {
      const option = document.createElement("option");
      option.value = optionText; option.textContent = optionText;
      if (task.status === optionText) option.selected = true;
      statusSelect.appendChild(option);
    });
    statusSelect.setAttribute("aria-label", "Change status for " + task.name);
    statusSelect.addEventListener("change", function() {
      task.status = this.value;
      if (task.status === "Completed") task.progress = 100;
      else if (task.progress === 100) task.progress = 50;
      saveTasks(); renderTasks();
    });
    const deleteButton = document.createElement("button");
    deleteButton.className = "danger"; deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      if (confirm("Delete this task?")) {
        tasks = tasks.filter(item => item.id !== task.id);
        saveTasks(); renderTasks();
      }
    });
    actionCell.append(statusSelect, deleteButton);
    row.append(nameCell, assigneeCell, deadlineCell, statusCell, progressCell, actionCell);
    table.appendChild(row);
  });
  if (tasks.length === 0) table.innerHTML = '<tr><td colspan="6" class="empty">No tasks yet. Add a task using the form.</td></tr>';
  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("completedTasks").textContent = tasks.filter(t => t.status === "Completed").length;
  document.getElementById("activeTasks").textContent = tasks.filter(t => t.status === "In progress").length;
  document.getElementById("delayedTasks").textContent = tasks.filter(isDelayed).length;
}

document.getElementById("progress").addEventListener("input", function() {
  document.getElementById("progressValue").textContent = this.value;
});
document.getElementById("taskForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page reload after form submission.
  const status = document.getElementById("status").value;
  let progress = Number(document.getElementById("progress").value);
  if (status === "Completed") progress = 100;
  const newTask = {
    id: Date.now(),
    name: document.getElementById("taskName").value.trim(),
    assignee: document.getElementById("assignee").value.trim(),
    deadline: document.getElementById("deadline").value,
    status: status,
    progress: progress
  };
  if (!newTask.name || !newTask.assignee || !newTask.deadline) return;
  tasks.push(newTask);
  saveTasks(); renderTasks(); this.reset();
  document.getElementById("progressValue").textContent = "0";
  document.getElementById("progress").value = 0;
});
function addMaterialNote() {
  const input = document.getElementById("materialNote");
  const value = input.value.trim();
  if (!value) { alert("Please enter a material reminder first."); return; }
  const li = document.createElement("li");
  li.textContent = value;
  document.getElementById("materialNotes").appendChild(li);
  input.value = "";
}
function resetDemo() {
  if (confirm("Restore the original sample tasks? Your custom tasks will be removed.")) {
    tasks = startingTasks.map(task => ({...task}));
    saveTasks(); renderTasks();
  }
}
function exportTasks() {
  const header = ["Task", "Assigned to", "Deadline", "Status", "Progress"];
  const rows = tasks.map(t => [t.name, t.assignee, t.deadline, t.status, t.progress]);
  const csv = [header, ...rows].map(row => row.map(v => '"' + String(v).replaceAll('"', '""') + '"').join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = "buildtrack-tasks.csv"; link.click();
  URL.revokeObjectURL(url);
}
document.getElementById("todayLabel").textContent = new Date().toLocaleDateString();
renderTasks();
