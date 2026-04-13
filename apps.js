/* ============================================================
   app.js — Shared Admin System Logic
   ============================================================ */

// ===== SIDEBAR TOGGLE =====
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');
const hamburger = document.querySelector('.hamburger');

function openSidebar() {
  sidebar?.classList.add('open');
  overlay?.classList.add('open');
}

function closeSidebar() {
  sidebar?.classList.remove('open');
  overlay?.classList.remove('open');
}

hamburger?.addEventListener('click', openSidebar);
overlay?.addEventListener('click', closeSidebar);

// ===== NAV ACTIVE STATE =====
const navItems = document.querySelectorAll('.nav-item[data-page]');
navItems.forEach(item => {
  const page = item.getAttribute('data-page');
  const current = window.location.pathname.split('/').pop() || 'adminreports.html';
  if (current === page) item.classList.add('active');

  item.addEventListener('click', () => {
    window.location.href = page;
  });
});

// ===== TOAST SYSTEM =====
function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', danger: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || '✓'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}

// ===== MODAL SYSTEM =====
function openModal(id) {
  const m = document.getElementById(id);
  m?.classList.add('open');
}

function closeModal(id) {
  const m = document.getElementById(id);
  m?.classList.remove('open');
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// Modal close buttons
document.querySelectorAll('.modal-close, [data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal-overlay')?.classList.remove('open');
  });
});

// ===== DROPDOWN SYSTEM =====
function toggleDropdown(id) {
  const menu = document.getElementById(id);
  const isOpen = menu?.classList.contains('open');
  document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
  if (!isOpen) menu?.classList.add('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
  }
});

// ===== TABS =====
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const panels = document.querySelectorAll(`.tab-panel[data-tab="${target}"]`);
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        panels.forEach(p => p.classList.add('active'));
      });
    });
  });
}

initTabs();

// ===== TOPBAR NOTIFICATION BELL =====
const bellBtn = document.getElementById('btn-bell');
bellBtn?.addEventListener('click', () => {
  toggleDropdown('notification-dropdown');
});

// ===== TABLE SEARCH =====
function initTableSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// ===== CONFIRM DIALOG =====
function confirmAction(message, callback) {
  if (window.confirm(message)) callback();
}

// ===== DATE FORMATTING =====
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-PH', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

// ===== EXPORT TABLE AS CSV =====
function exportTableCSV(tableId, filename = 'export.csv') {
  const table = document.getElementById(tableId);
  if (!table) return;
  const rows = [...table.querySelectorAll('tr')];
  const csv = rows.map(r =>
    [...r.querySelectorAll('th,td')].map(c => `"${c.innerText.trim()}"`).join(',')
  ).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  showToast(`Exported ${filename} successfully`, 'success');
}

// ===== PRINT =====
function printSection(sectionId) {
  const content = document.getElementById(sectionId)?.innerHTML;
  if (!content) return;
  const win = window.open('', '_blank');
  win.document.write(`<html><head><title>Print</title><link rel="stylesheet" href="styles.css"></head><body>${content}</body></html>`);
  win.document.close();
  win.print();
}

// ===== PROFILE PHOTO UPLOAD =====
function initPhotoUpload() {
  const input = document.getElementById('photo-input');
  const preview = document.getElementById('photo-preview');
  input?.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (preview) {
        preview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
      }
      showToast('Photo updated successfully', 'success');
    };
    reader.readAsDataURL(file);
  });
}

initPhotoUpload();

// ===== ANNOUNCEMENT PRIORITY COLOR =====
function getPriorityClass(priority) {
  const map = { high: 'urgent', medium: 'warning', low: 'info', event: 'success' };
  return map[priority] || 'info';
}

// ===== REPORTS: CHART DRAWING =====
function drawBarChart(canvasId, labels, data, color = '#00b4a0') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const pad = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const max = Math.max(...data, 1);
  const barW = chartW / labels.length * 0.6;
  const gap = chartW / labels.length;

  ctx.clearRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = '#e8eef4';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = pad.top + chartH - (i / 5) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();
    ctx.fillStyle = '#9ab0c4';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(max * i / 5), pad.left - 6, y + 4);
  }

  // Bars
  labels.forEach((label, i) => {
    const x = pad.left + i * gap + gap / 2 - barW / 2;
    const bh = (data[i] / max) * chartH;
    const y = pad.top + chartH - bh;

    // Gradient effect
    const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + '88');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#5a7a94';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, pad.left + i * gap + gap / 2, pad.top + chartH + 16);

    // Value on top
    ctx.fillStyle = '#1a2e3f';
    ctx.font = '600 11px Inter, sans-serif';
    ctx.fillText(data[i], pad.left + i * gap + gap / 2, y - 5);
  });
}

function drawLineChart(canvasId, labels, datasets) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const pad = { top: 20, right: 20, bottom: 40, left: 45 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const allVals = datasets.flatMap(d => d.data);
  const max = Math.max(...allVals, 1);

  ctx.clearRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = '#e8eef4';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = pad.top + chartH - (i / 5) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();
    ctx.fillStyle = '#9ab0c4';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(max * i / 5), pad.left - 6, y + 4);
  }

  // X labels
  labels.forEach((label, i) => {
    const x = pad.left + (i / (labels.length - 1)) * chartW;
    ctx.fillStyle = '#5a7a94';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, pad.top + chartH + 16);
  });

  // Lines
  datasets.forEach(({ data, color }) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    data.forEach((v, i) => {
      const x = pad.left + (i / (labels.length - 1)) * chartW;
      const y = pad.top + chartH - (v / max) * chartH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    data.forEach((v, i) => {
      const x = pad.left + (i / (labels.length - 1)) * chartW;
      const y = pad.top + chartH - (v / max) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  });
}

// ===== INIT CHARTS (called per-page) =====
window.initCharts = function () {
  drawBarChart('chart-attendance', ['SIA 102', 'WS 101', 'CC 106'], [92, 87, 95], '#00b4a0');
  drawLineChart('chart-grades', ['Q1', 'Q2', 'Q3', 'Q4'], [
    { data: [85, 88, 91, 94], color: '#00b4a0' },
    { data: [78, 82, 80, 85], color: '#1a3c5e' },
    { data: [90, 87, 93, 96], color: '#d69e2e' }
  ]);
};