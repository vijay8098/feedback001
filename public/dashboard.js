async function loadResults() {
  const resForm = await fetch('/api/form');
  const form = await resForm.json();

  const resData = await fetch('/api/responses');
  const responses = await resData.json();

  const questionCount = form.questions.length;
  const sums = Array(questionCount).fill(0);
  const counts = Array(questionCount).fill(0);
  const comments = [];

  responses.forEach(resp => {
    resp.ratings.forEach((rate, i) => {
      sums[i] += rate;
      counts[i]++;
    });
    if (resp.comment) comments.push(resp.comment);
  });

  const averages = sums.map((s, i) => counts[i] ? (s / counts[i]).toFixed(2) : 0);

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: form.questions,
      datasets: [{
        label: 'Average Rating',
        data: averages,
        backgroundColor: '#3498db'
      }]
    }
  });

  const commentList = document.getElementById('commentsList');
  commentList.innerHTML = comments.map(c => `<li>${c}</li>`).join('');
}

function exportCSV() {
  window.location.href = '/api/export';
}

loadResults();
