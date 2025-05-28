const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  showToast('Task added!', 'success');

  input.value = '';
  loadTasks();
});

async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();

  list.innerHTML = '';
  tasks.forEach(task => {
  const li = document.createElement('li');

  // Wrapper for task text + timestamp
  const contentDiv = document.createElement('div');
  contentDiv.className = 'task-content';

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  // ✅ Inline edit logic on span click
  span.onclick = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.className = 'edit-input';

    const confirmBtn = document.createElement('button');
    confirmBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    confirmBtn.className = 'confirm-btn';

    const cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    cancelBtn.className = 'cancel-btn';

    async function confirmEdit() {
      const updatedText = input.value.trim();
      if (!updatedText) return;

      await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: updatedText })
      });
      showToast('Task updated.', 'success');
      loadTasks();
    }

    function cancelEdit() {
      showToast('Edit canceled.', 'info');
      loadTasks();
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        confirmEdit();
      }
    });

    confirmBtn.onclick = confirmEdit;
    cancelBtn.onclick = cancelEdit;

    li.innerHTML = '';
    li.appendChild(input);
    li.appendChild(confirmBtn);
    li.appendChild(cancelBtn);
    input.focus();
  };

  // 🕒 Format created timestamp
  const date = new Date(task.createdAt);
  const formattedDate = date.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const time = document.createElement('small');
  time.className = 'task-time';
  time.textContent = `Created: ${formattedDate}`;

  contentDiv.appendChild(span);
  contentDiv.appendChild(time);

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  delBtn.onclick = async () => {
    await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
    showToast('Task deleted.', 'warning');
    loadTasks();
  };

  li.appendChild(contentDiv);
  li.appendChild(delBtn);
  list.appendChild(li);
});

}

loadTasks();

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (container.childElementCount > 5) return;

  const toast = document.createElement('div');
  toast.classList.add('toast');

  // Color coding (optional)
  if (type === 'success') toast.style.backgroundColor = '#28a745';
  if (type === 'error') toast.style.backgroundColor = '#dc3545';
  if (type === 'warning') toast.style.backgroundColor = '#ffc107';

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
