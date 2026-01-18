const apiBase = '/blogs';

async function fetchBlogs() {
  const res = await fetch(apiBase);
  return res.json();
}

function renderBlogs(list) {
  const container = document.getElementById('blogs');
  container.innerHTML = '';
  list.forEach(b => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <h3>${escapeHtml(b.title)}</h3>
      <div class="meta">by ${escapeHtml(b.author || 'Anonymous')} • ${new Date(b.createdAt).toLocaleString()}</div>
      <p>${escapeHtml(b.body)}</p>
      <div class="actions">
        <button data-id="${b._id}" class="delete">Delete</button>
        <button data-id="${b._id}" class="edit">Edit</button>
      </div>
    `;
    container.appendChild(el);
  });
}

function escapeHtml(s){
  if(!s) return '';
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

document.getElementById('blogForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();
  const author = document.getElementById('author').value.trim();
  if(!title || !body){ alert('Title and body are required'); return; }
  await fetch(apiBase, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ title, body, author }) });
  document.getElementById('title').value='';
  document.getElementById('body').value='';
  document.getElementById('author').value='';
  load();
});

document.getElementById('blogs').addEventListener('click', async (e) => {
  if(e.target.matches('.delete')){
    const id = e.target.dataset.id;
    if(!confirm('Delete this blog?')) return;
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    load();
  } else if(e.target.matches('.edit')){
    const id = e.target.dataset.id;
    const title = prompt('New title:');
    const body = prompt('New body:');
    const author = prompt('Author (optional):');
    if(!title || !body){ alert('Title and body required'); return; }
    await fetch(`${apiBase}/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ title, body, author }) });
    load();
  }
});

async function load(){
  const list = await fetchBlogs();
  renderBlogs(list);
}

load();
