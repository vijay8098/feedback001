const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const dataPath = path.join(__dirname, '../data/store.json');


let store = { form: { questions: [] }, responses: [] };
if (fs.existsSync(dataPath)) {
  store = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));


}


function saveStore() {
  fs.writeFileSync(dataPath, JSON.stringify(store, null, 2));
}
app.get('/api/form', (req, res) => res.json(store.form));

app.post('/api/form', (req, res) => {
  store.form = req.body;
  store.responses = []; 
  saveStore();
  res.json({ message: 'Feedback form saved.' });
});

app.post('/api/submit', (req, res) => {
  store.responses.push(req.body);
  saveStore();
  res.json({ message: 'Feedback submitted successfully.' });
});

app.get('/api/responses', (req, res) => res.json(store.responses));

app.get('/api/export', (req, res) => {
  const headers = [...store.form.questions, 'Comment'];
  const rows = store.responses.map(r => [...r.ratings, r.comment]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  res.setHeader('Content-disposition', 'attachment; filename=feedback.csv');
  res.set('Content-Type', 'text/csv');
  res.send(csv);
});

app.listen(PORT, () => console.log(`Feedback tool backend running at http://localhost:${PORT}`));


