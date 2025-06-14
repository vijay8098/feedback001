let questions = [];

function renderQuestions() {
  const list = document.getElementById('questionList');
  list.innerHTML = '';
  questions.forEach((q, i) => {
    const item = document.createElement('div');
    item.innerHTML = `${i + 1}. ${q} <button onclick="removeQuestion(${i})">Remove</button>`;
    list.appendChild(item);
  });
}

function removeQuestion(index) {
  questions.splice(index, 1);
  renderQuestions();
}

document.getElementById('addBtn').onclick = () => {
  const q = document.getElementById('newQuestion').value.trim();
  if (q) {
    questions.push(q);
    document.getElementById('newQuestion').value = '';
    renderQuestions();
  }
};

document.getElementById('saveBtn').onclick = async () => {
  await fetch('/api/form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questions })
  });
  alert('Form saved!');
};
