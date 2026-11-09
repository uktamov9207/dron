// Token & Auth Check
const token = localStorage.getItem('aerodrone_token');
const userStr = localStorage.getItem('aerodrone_admin');

if (!token) {
    window.location.href = '/admin/login';
}

let currentUser = null;
try {
    currentUser = JSON.parse(userStr);
} catch (e) {}

if (currentUser && currentUser.username) {
    document.getElementById('admin-username-display').textContent = currentUser.username;
    document.getElementById('avatar-letter').textContent = currentUser.username.charAt(0).toUpperCase();
}

// Global data stores
let allDrones = [];
let allMessages = [];

// Helper headers
function authHeaders() {
    return {
        'Authorization': `Bearer ${token}`
    };
}

// Init Application
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initLogout();
    loadDashboard();
    loadAllDrones();
    loadMessages();
    loadSettings();
    initFormHandlers();
    initSearch();
    initImagePreview();
});

/* ==========================================================
   TABS NAVIGATION
========================================================== */
function initTabs() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const titleElem = document.getElementById('current-tab-title');

    const titles = {
        'dashboard': 'Dashboard & Analitika',
        'drones': 'Jangovar Dronlar Katalogi',
        'messages': 'Kelib tushgan Murojaatlar',
        'settings': 'Sayt Kontakt Sozlamalari'
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.getAttribute('data-tab');

            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            link.classList.add('active');
            const content = document.getElementById(`tab-${targetTab}`);
            if (content) content.classList.add('active');

            if (titleElem) titleElem.textContent = titles[targetTab] || 'Boshqaruv';

            if (targetTab === 'dashboard') loadDashboard();
            if (targetTab === 'drones') loadAllDrones();
            if (targetTab === 'messages') loadMessages();
            if (targetTab === 'settings') loadSettings();
        });
    });
}

function initLogout() {
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?')) {
            localStorage.removeItem('aerodrone_token');
            localStorage.removeItem('aerodrone_admin');
            window.location.href = '/admin/login';
        }
    });
}

/* ==========================================================
   1. DASHBOARD & STATS
========================================================== */
async function loadDashboard() {
    try {
        const res = await fetch('/api/stats', { headers: authHeaders() });
        if (res.status === 401 || res.status === 403) {
            return redirectToLogin();
        }
        const result = await res.json();
        if (result.success) {
            const data = result.data;
            document.getElementById('stat-total-drones').textContent = data.totalDrones;
            document.getElementById('stat-active-drones').textContent = data.activeDrones;
            document.getElementById('stat-total-messages').textContent = data.totalMessages;
            document.getElementById('stat-new-messages').textContent = data.newMessages;

            document.getElementById('sidebar-drone-count').textContent = data.totalDrones;
            document.getElementById('sidebar-msg-count').textContent = data.newMessages;
        }
    } catch (err) {
        console.error('Stats load error:', err);
    }
}

/* ==========================================================
   2. DRONES CRUD
========================================================== */
async function loadAllDrones() {
    try {
        const res = await fetch('/api/admin/drones', { headers: authHeaders() });
        if (res.status === 401 || res.status === 403) return redirectToLogin();
        const result = await res.json();

        if (result.success) {
            allDrones = result.data;
            renderDronesTable(allDrones);
            renderRecentDrones(allDrones.slice(0, 5));
            document.getElementById('sidebar-drone-count').textContent = allDrones.length;
        }
    } catch (err) {
        console.error('Drones load error:', err);
    }
}

function renderDronesTable(drones) {
    const tbody = document.getElementById('all-drones-body');
    if (!tbody) return;

    if (drones.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">Dronlar topilmadi. Yangi dron qo'shing!</td></tr>`;
        return;
    }

    tbody.innerHTML = drones.map(drone => `
        <tr>
            <td><strong>#${drone.orderNum || drone.id}</strong></td>
            <td>
                <img src="/${drone.img}" alt="${escapeHtml(drone.name)}" class="drone-thumb" onerror="this.src='/assets/drone1.png'">
            </td>
            <td><strong>${escapeHtml(drone.name)}</strong></td>
            <td style="color: var(--primary); font-weight: 700;">${escapeHtml(drone.price)}</td>
            <td><span style="font-size: 12px; color: var(--text-muted);">${escapeHtml(drone.soldTo || '-')}</span></td>
            <td>
                <span class="status-badge ${drone.isActive ? 'active' : 'inactive'}">
                    ${drone.isActive ? 'Faol' : 'Nofaol'}
                </span>
            </td>
            <td>
                <div class="action-btns">
                    <button class="btn-action edit" onclick="editDrone(${drone.id})" title="Tahrirlash">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-action delete" onclick="deleteDrone(${drone.id}, '${escapeHtml(drone.name)}')" title="O'chirish">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderRecentDrones(drones) {
    const tbody = document.getElementById('recent-drones-body');
    if (!tbody) return;

    if (drones.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Ma'lumot yo'q</td></tr>`;
        return;
    }

    tbody.innerHTML = drones.map(drone => `
        <tr>
            <td><img src="/${drone.img}" alt="${escapeHtml(drone.name)}" class="drone-thumb" onerror="this.src='/assets/drone1.png'"></td>
            <td><strong>${escapeHtml(drone.name)}</strong></td>
            <td style="color: var(--primary); font-weight: 700;">${escapeHtml(drone.price)}</td>
            <td><span style="font-size: 12px; color: var(--text-muted);">${escapeHtml(drone.soldTo || '-')}</span></td>
            <td><span class="status-badge ${drone.isActive ? 'active' : 'inactive'}">${drone.isActive ? 'Faol' : 'Nofaol'}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-action edit" onclick="editDrone(${drone.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function initSearch() {
    const searchInput = document.getElementById('drone-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            const filtered = allDrones.filter(d => 
                d.name.toLowerCase().includes(val) || 
                d.price.toLowerCase().includes(val) ||
                (d.soldTo && d.soldTo.toLowerCase().includes(val))
            );
            renderDronesTable(filtered);
        });
    }
}

/* ==========================================================
   MODAL & DYNAMIC ROWS
========================================================== */
function openDroneModal(isEdit = false) {
    document.getElementById('drone-modal').classList.add('active');
    document.getElementById('modal-title').textContent = isEdit ? "Dronni Tahrirlash" : "Yangi Dron Qo'shish";
    if (!isEdit) {
        document.getElementById('drone-form').reset();
        document.getElementById('drone-id').value = '';
        document.getElementById('existing-img').value = 'assets/drone1.png';
        document.getElementById('drone-img-preview').src = '/assets/drone1.png';
        document.getElementById('img-path-label').textContent = 'assets/drone1.png';

        document.getElementById('tech-specs-container').innerHTML = '';
        document.getElementById('weapons-container').innerHTML = '';
        document.getElementById('sensors-container').innerHTML = '';

        // Add default rows
        addTechSpecRow("<b>Uzunligi:</b> 10 metr");
        addTechSpecRow("<b>Maksimal tezligi:</b> 300 km/soat");
        addWeaponRow("<b>Lazerli aniq bomba</b>");
        addSensorRow("Optik va tungi kuzatuv tizimi");
    }
}

function closeDroneModal() {
    document.getElementById('drone-modal').classList.remove('active');
}

function addTechSpecRow(val = '') {
    const container = document.getElementById('tech-specs-container');
    const div = document.createElement('div');
    div.className = 'dynamic-item-row';
    div.innerHTML = `
        <input type="text" class="tech-spec-input" value="${escapeHtml(val)}" placeholder="Masalan: <b>Uzunligi:</b> 10 metr">
        <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fa-solid fa-times"></i></button>
    `;
    container.appendChild(div);
}

function addWeaponRow(val = '') {
    const container = document.getElementById('weapons-container');
    const div = document.createElement('div');
    div.className = 'dynamic-item-row';
    div.innerHTML = `
        <input type="text" class="weapon-input" value="${escapeHtml(val)}" placeholder="Masalan: <b>Hellfire</b> raketalari">
        <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fa-solid fa-times"></i></button>
    `;
    container.appendChild(div);
}

function addSensorRow(val = '') {
    const container = document.getElementById('sensors-container');
    const div = document.createElement('div');
    div.className = 'dynamic-item-row';
    div.innerHTML = `
        <input type="text" class="sensor-input" value="${escapeHtml(val)}" placeholder="Masalan: Infraqizil kamera">
        <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fa-solid fa-times"></i></button>
    `;
    container.appendChild(div);
}

function initImagePreview() {
    const fileInput = document.getElementById('drone-file');
    const preview = document.getElementById('drone-img-preview');
    const label = document.getElementById('img-path-label');

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                label.textContent = file.name;
            };
            reader.readAsDataURL(file);
        }
    });
}

function editDrone(id) {
    const drone = allDrones.find(d => d.id === id);
    if (!drone) return;

    openDroneModal(true);

    document.getElementById('drone-id').value = drone.id;
    document.getElementById('drone-name').value = drone.name;
    document.getElementById('drone-price').value = drone.price;
    document.getElementById('drone-sold-to').value = drone.soldTo || '';
    document.getElementById('drone-not-sold-to').value = drone.notSoldTo || '';
    document.getElementById('drone-info').value = drone.info || '';
    document.getElementById('existing-img').value = drone.img || '';
    document.getElementById('drone-img-preview').src = '/' + drone.img;
    document.getElementById('img-path-label').textContent = drone.img;

    document.getElementById('drone-weapons-title').value = drone.weaponsTitle || '';
    document.getElementById('drone-weapons-note').value = drone.weaponsNote || '';
    document.getElementById('drone-order').value = drone.orderNum || 0;
    document.getElementById('drone-active').value = drone.isActive ? 'true' : 'false';

    // Populate Dynamic lists
    const specsContainer = document.getElementById('tech-specs-container');
    specsContainer.innerHTML = '';
    (drone.techSpecs || []).forEach(s => addTechSpecRow(s));

    const weaponsContainer = document.getElementById('weapons-container');
    weaponsContainer.innerHTML = '';
    (drone.weapons || []).forEach(w => addWeaponRow(w));

    const sensorsContainer = document.getElementById('sensors-container');
    sensorsContainer.innerHTML = '';
    (drone.sensors || []).forEach(sn => addSensorRow(sn));
}

async function deleteDrone(id, name) {
    if (!confirm(`Haqiqatan ham "${name}" dronini o'chirmoqchimisiz?`)) return;

    try {
        const res = await fetch(`/api/drones/${id}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        const result = await res.json();
        if (result.success) {
            alert("Dron muvaffaqiyatli o'chirildi!");
            loadAllDrones();
            loadDashboard();
        } else {
            alert(result.message || "Xatolik yuz berdi");
        }
    } catch (err) {
        alert("Server bilan aloqa uzildi");
    }
}

/* ==========================================================
   3. MESSAGES (INBOX)
========================================================== */
async function loadMessages() {
    try {
        const res = await fetch('/api/messages', { headers: authHeaders() });
        if (res.status === 401 || res.status === 403) return redirectToLogin();
        const result = await res.json();

        if (result.success) {
            allMessages = result.data;
            renderMessagesTable(allMessages);
        }
    } catch (err) {
        console.error('Messages load error:', err);
    }
}

function renderMessagesTable(messages) {
    const tbody = document.getElementById('messages-body');
    if (!tbody) return;

    if (messages.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">Kelgan murojaatlar mavjud emas.</td></tr>`;
        return;
    }

    tbody.innerHTML = messages.map(msg => `
        <tr>
            <td>#${msg.id}</td>
            <td><strong>${escapeHtml(msg.full_name)}</strong></td>
            <td><a href="tel:${escapeHtml(msg.phone)}" style="color: var(--primary); text-decoration: none; font-weight: 600;">${escapeHtml(msg.phone)}</a></td>
            <td>${escapeHtml(msg.message || '-')}</td>
            <td style="font-size: 12px; color: var(--text-muted);">${formatDate(msg.created_at)}</td>
            <td>
                <span class="status-badge ${msg.status === 'new' ? 'new' : 'active'}">
                    ${msg.status === 'new' ? 'Yangi' : 'Ko\'rilgan'}
                </span>
            </td>
            <td>
                <div class="action-btns">
                    ${msg.status === 'new' ? `
                        <button class="btn-action edit" onclick="markMessageSeen(${msg.id})" title="Ko'rildi deb belgilash">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="btn-action delete" onclick="deleteMessage(${msg.id})" title="O'chirish">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function markMessageSeen(id) {
    try {
        await fetch(`/api/messages/${id}/status`, {
            method: 'PATCH',
            headers: { ...authHeaders(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'seen' })
        });
        loadMessages();
        loadDashboard();
    } catch (e) {}
}

async function deleteMessage(id) {
    if (!confirm('Ushbu murojaatni o\'chirmoqchimisiz?')) return;
    try {
        await fetch(`/api/messages/${id}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        loadMessages();
        loadDashboard();
    } catch (e) {}
}

/* ==========================================================
   4. SETTINGS
========================================================== */
async function loadSettings() {
    try {
        const res = await fetch('/api/settings');
        const result = await res.json();
        if (result.success) {
            const s = result.data;
            if (s.phone1) document.getElementById('setting-phone1').value = s.phone1;
            if (s.phone2) document.getElementById('setting-phone2').value = s.phone2;
            if (s.telegram) document.getElementById('setting-telegram').value = s.telegram;
            if (s.work_hours) document.getElementById('setting-work-hours').value = s.work_hours;
            if (s.site_title) document.getElementById('setting-site-title').value = s.site_title;
        }
    } catch (err) {}
}

/* ==========================================================
   FORM HANDLERS
========================================================== */
function initFormHandlers() {
    // 1. Drone Form Submit
    const droneForm = document.getElementById('drone-form');
    droneForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const saveBtn = document.getElementById('save-drone-btn');
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saqlanmoqda...';

        const id = document.getElementById('drone-id').value;
        const formData = new FormData();

        formData.append('name', document.getElementById('drone-name').value.trim());
        formData.append('price', document.getElementById('drone-price').value.trim());
        formData.append('soldTo', document.getElementById('drone-sold-to').value.trim());
        formData.append('notSoldTo', document.getElementById('drone-not-sold-to').value.trim());
        formData.append('info', document.getElementById('drone-info').value.trim());
        formData.append('existingImg', document.getElementById('existing-img').value);

        formData.append('weaponsTitle', document.getElementById('drone-weapons-title').value.trim());
        formData.append('weaponsNote', document.getElementById('drone-weapons-note').value.trim());
        formData.append('orderNum', document.getElementById('drone-order').value);
        formData.append('isActive', document.getElementById('drone-active').value);

        // Tech specs array
        const techSpecs = Array.from(document.querySelectorAll('.tech-spec-input'))
            .map(i => i.value.trim()).filter(Boolean);
        formData.append('techSpecs', JSON.stringify(techSpecs));

        // Weapons array
        const weapons = Array.from(document.querySelectorAll('.weapon-input'))
            .map(i => i.value.trim()).filter(Boolean);
        formData.append('weapons', JSON.stringify(weapons));

        // Sensors array
        const sensors = Array.from(document.querySelectorAll('.sensor-input'))
            .map(i => i.value.trim()).filter(Boolean);
        formData.append('sensors', JSON.stringify(sensors));

        // File upload
        const fileInput = document.getElementById('drone-file');
        if (fileInput.files.length > 0) {
            formData.append('image', fileInput.files[0]);
        }

        try {
            const url = id ? `/api/drones/${id}` : '/api/drones';
            const method = id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: authHeaders(),
                body: formData
            });
            const result = await res.json();

            if (result.success) {
                alert(result.message || 'Muvaffaqiyatli saqlandi!');
                closeDroneModal();
                loadAllDrones();
                loadDashboard();
            } else {
                alert(result.message || 'Xatolik yuz berdi!');
            }
        } catch (err) {
            alert('Serverga yuborishda xatolik yuz berdi!');
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saqlash';
        }
    });

    // 2. Settings Form Submit
    const settingsForm = document.getElementById('settings-form');
    settingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
            phone1: document.getElementById('setting-phone1').value.trim(),
            phone2: document.getElementById('setting-phone2').value.trim(),
            telegram: document.getElementById('setting-telegram').value.trim(),
            work_hours: document.getElementById('setting-work-hours').value.trim(),
            site_title: document.getElementById('setting-site-title').value.trim()
        };

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { ...authHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (result.success) {
                alert('Sayt sozlamalari muvaffaqiyatli yangilandi!');
            }
        } catch (err) {
            alert('Xatolik yuz berdi');
        }
    });

    // 3. Change Password Form Submit
    const pwdForm = document.getElementById('change-pwd-form');
    pwdForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('curr-pwd').value;
        const newPassword = document.getElementById('new-pwd').value;

        if (newPassword.length < 6) {
            return alert('Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak!');
        }

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'PUT',
                headers: { ...authHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            const result = await res.json();
            if (result.success) {
                alert('Parol muvaffaqiyatli o\'zgartirildi!');
                pwdForm.reset();
            } else {
                alert(result.message || 'Xatolik!');
            }
        } catch (err) {
            alert('Serverga bog\'lanishda xato');
        }
    });
}

function redirectToLogin() {
    localStorage.removeItem('aerodrone_token');
    window.location.href = '/admin/login';
}

function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(isoStr) {
    if (!isoStr) return '-';
    try {
        const d = new Date(isoStr);
        return d.toLocaleDateString('uz-UZ') + ' ' + d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return isoStr;
    }
}
