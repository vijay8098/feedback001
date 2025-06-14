document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api/form');
  const form = await res.json();
  const container = document.getElementById('questions');

  form.questions.forEach((q, idx) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label>${q}</label>
      <input type="number" name="rating" data-index="${idx}" min="1" max="5" required>
    `;
    container.appendChild(div);
  });

  document.getElementById('feedbackForm').addEventListener('submit', async e => {
    e.preventDefault();
    const ratings = [...document.querySelectorAll('input[name=rating]')].map(input => parseInt(input.value));
    const comment = document.getElementById('comment').value;
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ratings, comment })
    });
    alert('Feedback submitted!');
    e.target.reset();
  });
});
