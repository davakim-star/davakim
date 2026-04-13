// ============================================
// EDUTRACK — Shared Layout Builder
// ============================================

const LAYOUTS = {
      student: {
    user: { name: 'Kim Shanelle Dava', role: 'Student', initials: 'KSD', color: 'avatar-red' },
    nav: [
      { href: 'studentdashboard.html', icon: '⊞', label: 'Overview' },
      { href: 'studentgrades.html', icon: '📊', label: 'Grades' },
      { href: 'studentattendance.html', icon: '📅', label: 'Attendance' },
      { href: 'studentassignments.html', icon: '🏫', label: 'Assignments' },
      { href: 'studentai.html', icon: '💬', label: 'AI Insights' },
      { href: 'studentprofile.html', icon: '👤', label: 'Profile' },
    ]
  },
  teacher: {
    user: { name: 'Mrs. Maydelyn Joy Laudato', role: 'Teacher', initials: 'MJL', color: 'avatar-red' },
    nav: [
      { href: 'teacherdashboard.html', icon: '⊞', label: 'Overview' },
      { href: 'teachergrades.html', icon: '📊', label: 'Grades' },
      { href: 'teacherattendance.html', icon: '📅', label: 'Attendance' },
      { href: 'teacherclassmanagement.html', icon: '🏫', label: 'Class Management' },
      { href: 'teachermessages.html', icon: '💬', label: 'Messages' },
      { href: 'teacherprofile.html', icon: '👤', label: 'Profile' },
    ]
  },
  admin: {
    user: { name: 'Admin User', role: 'Admin', initials: 'AU', color: 'avatar-blue' },
    nav: [
      { href: 'admindashboard.html', icon: '⊞', label: 'Dashboard' },
      { href: 'admininsights.html', icon: '📈', label: 'Insights' },
      { href: 'adminusers.html', icon: '👥', label: 'User Management' },
      { href: 'adminreports.html', icon: '📋', label: 'Reports' },
      { href: 'adminannouncements.html', icon: '📢', label: 'Announcements' },
      { href: 'adminprofile.html', icon: '👤', label: 'Profile' },
    ]
  },
  parent: {
    user: { name: 'Ritchell Dava', role: 'Parent', initials: 'RD', color: 'avatar-green' },
    nav: [
      { href: 'parentdashboard.html', icon: '⊞', label: 'Overview' },
      { href: 'parentgrades.html', icon: '📊', label: 'Grades' },
      { href: 'parentattendance.html', icon: '📅', label: 'Attendance' },
      { href: 'parentmessages.html', icon: '💬', label: 'Messages' },
      { href: 'parentprofile.html', icon: '👤', label: 'Profile' },
    ]
  }
};

function buildLayout(role, pageTitle) {
  const layout = LAYOUTS[role];
  const current = window.location.pathname.split('/').pop();
  const navHTML = layout.nav.map(n => `
    <li><a href="${n.href}" class="${n.href === current ? 'active' : ''}">
      <span class="nav-icon">${n.icon}</span>${n.label}
    </a></li>`).join('');

  document.getElementById('app-root').innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <div class="logo-icon">🎓</div>
          <span class="logo-text">EduTrack</span>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-label">Main Menu</div>
        </div>
        <ul class="sidebar-nav">${navHTML}</ul>
        <div class="sidebar-footer">
          <button class="logout-btn"><span>🚪</span>Logout</button>
          <div class="sidebar-user">
            <div class="avatar ${layout.user.color}">${layout.user.initials}</div>
            <div class="user-info">
              <div class="user-name">${layout.user.name}</div>
              <div class="user-role">${layout.user.role}</div>
            </div>
          </div>
        </div>
      </aside>
      <div class="main-area">
        <header class="topbar">
          <button class="topbar-close" onclick="toggleSidebar()">✕</button>
          <div class="topbar-search">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Search anything...">
          </div>
          <div class="topbar-right">
            <button class="topbar-notif" title="Notifications">
              🔔<span class="badge"></span>
            </button>
            <div class="topbar-user" onclick="window.location.href='${role}profile.html'">
              <div class="user-text">
                <div class="name">${layout.user.name}</div>
                <div class="role">${layout.user.role}</div>
              </div>
              <div class="avatar ${layout.user.color}">${layout.user.initials}</div>
            </div>
          </div>
        </header>
        <div class="page-content" id="page-main">
          <!-- PAGE CONTENT INJECTED HERE -->
        </div>
      </div>
    </div>
  `;
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    if (sidebar.style.display === 'none' || sidebar.style.marginLeft === '-220px') {
      sidebar.style.marginLeft = '0';
    } else {
      sidebar.style.marginLeft = '-220px';
    }
  }
}

// ============================================
// LOGIN SYSTEM
// ============================================
function signIn(event) {
  event.preventDefault();

  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }
  if (role === "student") {
    window.location.href = "studentdashboard.html";
  }
  else if (role === "teacher") {
    window.location.href = "teacherdashboard.html";
  }
  else if (role === "admin") {
    window.location.href = "admindashboard.html";
  }
  else if (role === "parent") {
    window.location.href = "parentdashboard.html";
  }
}