/* ================================================================
   EDUTRACK — app.js  Shared Utilities + Data Store
   ================================================================ */

/* ── Data ───────────────────────────────────────────────────── */
const ET = {
  student: {
    name: 'Kim Shanelle Dava',
    initials: 'KD',
    year: '3rd Year',
    section: 'BSCS 3-A',
    email: 'kim.dava@school.edu',
    phone: '+63 912 345 6789',
    gpa: '1.45',
    attendance: 94,
    status: 'Dean\'s Lister',
  },
  teacher: {
    name: 'Mrs. Maydelyn Joy Laudato',
    initials: 'ML',
    email: 'maydelyn.laudato@school.edu',
    dept: 'Computer Studies',
  },
  parent: {
    name: 'Ritchell Dava',
    initials: 'RD',
    email: 'ritchell.dava@gmail.com',
    relation: 'Parent / Guardian',
  },
  subjects: [
    { code:'SIA 102', name:'Systems Integration & Architecture', units:3, grade:1.25, teacher:'Mrs. Maydelyn Joy Laudato', room:'Lab 201', sched:'MWF 8:00–9:00 AM' },
    { code:'WS 101',  name:'Web Systems & Technologies',        units:3, grade:1.50, teacher:'Mrs. Maydelyn Joy Laudato', room:'Lab 202', sched:'TTh 10:00–11:30 AM' },
    { code:'CC 106',  name:'Computer Concepts & Applications',  units:3, grade:1.75, teacher:'Mrs. Maydelyn Joy Laudato', room:'Room 301', sched:'MWF 1:00–2:00 PM' },
  ],
  grades: [
    { subject:'SIA 102', type:'Prelim Exam',   score:94, total:100, gwa:1.25, date:'Mar 15, 2026' },
    { subject:'WS 101',  type:'Midterm Exam',  score:90, total:100, gwa:1.50, date:'Mar 18, 2026' },
    { subject:'CC 106',  type:'Final Project', score:87, total:100, gwa:1.75, date:'Mar 20, 2026' },
    { subject:'SIA 102', type:'Quizzes Avg',   score:92, total:100, gwa:1.25, date:'Apr 01, 2026' },
    { subject:'WS 101',  type:'Laboratory',    score:95, total:100, gwa:1.50, date:'Apr 05, 2026' },
    { subject:'CC 106',  type:'Class Standing',score:88, total:100, gwa:1.75, date:'Apr 08, 2026' },
  ],
  assignments: [
    { id:'a1', subject:'SIA 102', title:'System Architecture Diagram', due:'Apr 15, 2026', status:'pending',  priority:'high' },
    { id:'a2', subject:'WS 101',  title:'Responsive Portfolio Website', due:'Apr 17, 2026', status:'pending',  priority:'medium' },
    { id:'a3', subject:'CC 106',  title:'Database Design Report',       due:'Apr 20, 2026', status:'pending',  priority:'low' },
    { id:'a4', subject:'SIA 102', title:'API Integration Lab',          due:'Apr 10, 2026', status:'submitted', priority:'high' },
    { id:'a5', subject:'WS 101',  title:'CSS Animation Project',        due:'Apr 08, 2026', status:'graded',    priority:'medium' },
  ],
  attendance: {
    '3B': [
      { name:'Kim Shanelle Dava',  roll:'2024-3001', rate:94 },
      { name:'Jose Miguel Santos', roll:'2024-3002', rate:96 },
      { name:'Andrea Cruz',        roll:'2024-3003', rate:88 },
      { name:'Lance Reyes',        roll:'2024-3004', rate:98 },
      { name:'Sophia Garcia',      roll:'2024-3005', rate:90 },
      { name:'Mika Villanueva',    roll:'2024-3006', rate:95 },
      { name:'Ethan Tan',          roll:'2024-3007', rate:92 },
      { name:'Alicia Torres',      roll:'2024-3008', rate:86 },
    ],
    '3A': [
      { name:'Marco Fernandez',  roll:'2024-3011', rate:97 },
      { name:'Ria Mendoza',      roll:'2024-3012', rate:93 },
      { name:'Sean Bautista',    roll:'2024-3013', rate:91 },
      { name:'Cara Ocampo',      roll:'2024-3014', rate:89 },
      { name:'Luis Castro',      roll:'2024-3015', rate:95 },
    ],
    '3C': [
      { name:'Dana Lim',         roll:'2024-3021', rate:92 },
      { name:'Gabe Pascual',     roll:'2024-3022', rate:85 },
      { name:'Nina Morales',     roll:'2024-3023', rate:96 },
      { name:'Ron Dela Cruz',    roll:'2024-3024', rate:88 },
      { name:'Zara Aquino',      roll:'2024-3025', rate:94 },
      { name:'Felix Navarro',    roll:'2024-3026', rate:87 },
    ],
  },
  messages: [
    { id:0, av:'KD', name:'Kim Shanelle Dava',    meta:'Student · BSIT 3-B',          preview:'Thank you, Ma\'am!', time:'2h ago', unread:true,
      msgs:[
        { from:'them', text:'Ma\'am, good morning! I wanted to ask about the SIA 102 project requirements.', time:'8:00 AM' },
        { from:'me',   text:'Good morning Kim! The requirements are posted on the portal. Submit via GitHub.', time:'8:15 AM' },
        { from:'them', text:'Thank you, Ma\'am!', time:'8:20 AM' },
      ]},
    { id:1, av:'RD', name:'Ritchell Dava (Parent)', meta:'Parent · Kim Shanelle Dava',  preview:'Understood, thank you.', time:'1d ago', unread:true,
      msgs:[
        { from:'me',   text:'Good afternoon! This is Mrs. Laudato. Kim has been doing well in class this week.', time:'2:00 PM' },
        { from:'them', text:'Understood, thank you. We\'re proud of her progress!', time:'2:30 PM' },
      ]},
    { id:2, av:'JS', name:'Jose Miguel Santos',    meta:'Student · BSCS 3-B',          preview:'Will submit before deadline.', time:'2d ago', unread:false,
      msgs:[
        { from:'them', text:'Ma\'am, can I submit the lab activity tomorrow?', time:'4:00 PM' },
        { from:'me',   text:'Yes, but no later than 5 PM tomorrow. No extensions after that.', time:'4:10 PM' },
        { from:'them', text:'Will submit before deadline. Thank you!', time:'4:12 PM' },
      ]},
  ],
};

/* ── Sidebar toggle ─────────────────────────────────────────── */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
}

/* ── Toast ──────────────────────────────────────────────────── */
function toast(msg, type = 'default', ms = 3500) {
  let host = document.getElementById('toastHost');
  if (!host) {
    host = Object.assign(document.createElement('div'), { id:'toastHost', className:'toast-host' });
    document.body.appendChild(host);
  }
  const icons = { success:'✅', warning:'⚠️', error:'❌', info:'ℹ️', default:'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast t-${type}`;
  el.innerHTML = `<span>${icons[type]||icons.default}</span><span class="toast-msg">${msg}</span><button class="toast-x" onclick="dismissToast(this.parentElement)">✕</button>`;
  host.appendChild(el);
  setTimeout(() => dismissToast(el), ms);
}
function dismissToast(el) {
  if (!el || el.classList.contains('hiding')) return;
  el.classList.add('hiding');
  setTimeout(() => el.remove(), 290);
}

/* ── Modal ──────────────────────────────────────────────────── */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-bg')) e.target.classList.remove('open');
});

/* ── Notifications ──────────────────────────────────────────── */
function toggleNotif(e) {
  e.stopPropagation();
  document.getElementById('notifDrop')?.classList.toggle('open');
}
document.addEventListener('click', e => {
  const d = document.getElementById('notifDrop');
  if (d && !d.parentElement?.contains(e.target)) d.classList.remove('open');
});
function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(r => r.classList.remove('unread'));
  const b = document.getElementById('notifCount');
  if (b) { b.textContent='0'; b.style.display='none'; }
  document.getElementById('notifDrop')?.classList.remove('open');
  toast('All notifications marked as read', 'success');
}
function markOneRead(el) {
  if (!el.classList.contains('unread')) return;
  el.classList.remove('unread');
  const b = document.getElementById('notifCount');
  if (b) { const c = Math.max(0, parseInt(b.textContent||'0') - 1); b.textContent = c; if (!c) b.style.display='none'; }
}

/* ── Sign Out ───────────────────────────────────────────────── */
function signOut() {
  if (confirm('Sign out of EduTrack?')) {
    toast('Signing out…', 'info', 1100);
    setTimeout(() => location.href = 'index.html', 1000);
  }
}

/* ── GWA helper ─────────────────────────────────────────────── */
function gwaToLetter(g) {
  if (g <= 1.0) return 'A+'; if (g <= 1.25) return 'A'; if (g <= 1.5) return 'A-';
  if (g <= 1.75) return 'B+'; if (g <= 2.0) return 'B'; if (g <= 2.25) return 'B-';
  if (g <= 2.5) return 'C+'; if (g <= 2.75) return 'C'; if (g <= 3.0) return 'D'; return 'F';
}
function scoreToGrade(s) {
  if (s >= 97) return 'A+'; if (s >= 93) return 'A'; if (s >= 90) return 'A-';
  if (s >= 87) return 'B+'; if (s >= 83) return 'B'; if (s >= 80) return 'B-';
  if (s >= 70) return 'C'; if (s >= 60) return 'D'; return 'F';
}
function gradeClass(g) {
  if ('A+A'.includes(g)) return 'gA'; if (g.startsWith('B')) return 'gB';
  if (g.startsWith('C')) return 'gC'; if (g==='D') return 'gD'; return 'gF';
}
function initials(name) {
  return name.trim().split(/\s+/).map(n=>n[0]).join('').slice(0,2).toUpperCase();
}

/* ── Tabs ───────────────────────────────────────────────────── */
function switchTab(id, group) {
  document.querySelectorAll(`[data-tabs="${group}"] .tab-btn`).forEach(b => b.classList.remove('active'));
  document.querySelectorAll(`[data-panes="${group}"] .tab-pane`).forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-tabs="${group}"] [data-tab="${id}"]`)?.classList.add('active');
  document.getElementById(id)?.classList.add('active');
}

// ============================================
// EDUTRACK — Shared Application Logic
// ============================================

// ---- TOAST ----
function showToast(message, type = 'default', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', warning: '⚠️', default: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.default}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ---- MODAL ----
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (e.target.classList.contains('modal-close')) {
    const overlay = e.target.closest('.modal-overlay');
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  }
});

// ---- TABS ----
document.addEventListener('click', e => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  const container = tab.closest('[data-tabs]');
  if (!container) return;
  const key = tab.dataset.tab;
  container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.panel === key);
  });
});

// ---- DROPDOWN ----
document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-dropdown]');
  if (trigger) {
    const menu = document.getElementById(trigger.dataset.dropdown);
    if (menu) {
      menu.classList.toggle('open');
      e.stopPropagation();
      return;
    }
  }
  document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
});

// ---- TOPBAR SEARCH ----
const searchInput = document.querySelector('.topbar-search input');
if (searchInput) {
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = e.target.value.trim();
      if (val) showToast(`Searching for "${val}"...`, 'default');
    }
  });
}

// ---- ACTIVE SIDEBAR LINK ----
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href === currentPage) link.classList.add('active');
});

// ---- LOGOUT ----
document.addEventListener('click', e => {
  if (e.target.closest('.logout-btn')) {
    if (confirm('Are you sure you want to log out?')) {
      showToast('Logging out...', 'default');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  }
});

// ---- NOTIFICATION BELL ----
document.addEventListener('click', e => {
  const bell = e.target.closest('.topbar-notif');
  if (bell) {
    const badge = bell.querySelector('.badge');
    if (badge) badge.style.display = 'none';
    showToast('All notifications marked as read', 'success');
  }
});

// ---- CHART DRAWING (SVG line chart) ----
function drawLineChart(svgId, data, labels) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const W = svg.clientWidth || 600, H = 140;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const max = Math.max(...data) + 0.1, min = Math.min(...data) - 0.1;
  const px = i => (i / (data.length - 1)) * (W - 40) + 20;
  const py = v => H - 20 - ((v - min) / (max - min)) * (H - 40);
  const points = data.map((v, i) => `${px(i)},${py(v)}`).join(' ');
  svg.innerHTML = `
    <defs>
      <linearGradient id="grad_${svgId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#8B1A1A" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#8B1A1A" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <polygon points="${points} ${px(data.length-1)},${H} ${px(0)},${H}" fill="url(#grad_${svgId})"/>
    <polyline points="${points}" fill="none" stroke="#8B1A1A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${data.map((v,i)=>`<circle cx="${px(i)}" cy="${py(v)}" r="4" fill="#8B1A1A" stroke="white" stroke-width="2"/>`).join('')}
    ${labels ? labels.map((l,i)=>`<text x="${px(i)}" y="${H-4}" text-anchor="middle" font-size="10" fill="#ADB5BD" font-family="DM Sans">${l}</text>`).join('') : ''}
  `;
}

// ---- ATTENDANCE CELL TOGGLE ----
document.addEventListener('click', e => {
  const cell = e.target.closest('.attendance-cell[data-toggle]');
  if (!cell) return;
  const states = ['present', 'absent', 'late', 'empty'];
  const current = states.find(s => cell.classList.contains(s)) || 'empty';
  const next = states[(states.indexOf(current) + 1) % states.length];
  states.forEach(s => cell.classList.remove(s));
  cell.classList.add(next);
  const map = { present: 'P', absent: 'A', late: 'L', empty: '–' };
  cell.textContent = map[next];
});

// ---- MESSAGE THREAD ----
document.addEventListener('click', e => {
  const mi = e.target.closest('.msg-item');
  if (mi) {
    document.querySelectorAll('.msg-item').forEach(x => x.classList.remove('active'));
    mi.classList.add('active');
    const name = mi.querySelector('.msg-item-name')?.textContent || 'Contact';
    const threadName = document.getElementById('thread-contact-name');
    if (threadName) threadName.textContent = name;
  }
});

// ---- SEND MESSAGE ----
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey && e.target.id === 'msg-input') {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const input = document.getElementById('msg-input');
  if (!input || !input.value.trim()) return;
  const body = document.getElementById('thread-body');
  if (!body) return;
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const bubble = document.createElement('div');
  bubble.className = 'bubble sent';
  bubble.innerHTML = `<div class="bubble-content">${input.value.trim()}</div><div class="bubble-time">${time}</div>`;
  body.appendChild(bubble);
  body.scrollTop = body.scrollHeight;
  input.value = '';
  showToast('Message sent!', 'success', 1500);
}

// ---- PRINT / EXPORT ----
function printPage() { window.print(); }
function exportCSV(data, filename) {
  const csv = data.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  a.click(); URL.revokeObjectURL(url);
  showToast(`${filename} exported!`, 'success');
}

// ---- FILTER TABLE ----
function filterTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ---- CONFIRM DELETE ----
function confirmDelete(message, callback) {
  if (confirm(message || 'Are you sure you want to delete this?')) {
    callback && callback();
  }
}

// ---- INIT on DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', () => {
  // Animate stat cards
  document.querySelectorAll('.stat-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px)';
    setTimeout(() => {
      card.style.transition = 'all 0.35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 60);
  });

  // Animate bars
  document.querySelectorAll('.bar-item .bar').forEach(bar => {
    const h = bar.style.height;
    bar.style.height = '0';
    setTimeout(() => { bar.style.transition = 'height 0.5s ease'; bar.style.height = h; }, 200);
  });

  // Init filter tables
  filterTable('search-students', 'students-table');
  filterTable('search-grades', 'grades-table');
  filterTable('search-users', 'users-table');
});