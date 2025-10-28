document.getElementById('code-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const code = document.getElementById('exam-code').value.trim().toUpperCase();
  const res = await fetch('exams.json');
  const exams = await res.json();
  const exam = exams.find(ex => ex.code === code);
  if (exam) {
    localStorage.setItem('activeExam', JSON.stringify(exam));
    window.location.href = 'exam.html';
  } else {
    alert('❌ Exam not found');
  }
});

if (location.pathname.includes('exam.html')) {
  const exam = JSON.parse(localStorage.getItem('activeExam'));
  document.getElementById('exam-title').innerText = exam.title;
  document.getElementById('pdf-link').href = `uploads/${exam.pdf}`;
  document.getElementById('hidden-code').value = exam.code;

  const endTime = exam.created + exam.duration * 60000;
  const timer = setInterval(() => {
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      clearInterval(timer);
      document.getElementById('timer').innerText = '⛔ Time Over';
      document.querySelector('form').style.display = 'none';
    } else {
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      document.getElementById('timer').innerText = `${mins}m ${secs}s`;
    }
  }, 1000);
}