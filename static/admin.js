document.addEventListener('DOMContentLoaded', () => {
    const currentUser = document.body.dataset.currentUser;

    // --- SECURITY CHECK ---
    // Strict Hardcoded Username Check
    if (currentUser !== 'RotemD') {
        alert('ACCESS DENIED: Unauthorized User');
        window.location.href = '/';
        return;
    }

    const searchInput = document.getElementById('user-search');
    const tableBody = document.getElementById('users-table-body');

    // Initial Load
    fetchUsers();

    searchInput.addEventListener('input', (e) => {
        filterUsers(e.target.value);
    });

    async function fetchUsers() {
        try {
            // NOTE: You need to implement this endpoint in your Flask backend
            const res = await fetch('/api/admin/users');
            const data = await res.json();

            if (data.success) {
                window.allUsers = data.users; // Store for client-side filtering
                renderTable(window.allUsers);
            } else {
                alert('Failed to load users');
            }
        } catch (e) {
            console.error('API Error', e);
            // Mock data for demonstration if API fails/doesn't exist yet
            const mockUsers = [
                { id: 1, username: 'RotemD', is_premium: true },
                { id: 2, username: 'PlayerOne', is_premium: false },
                { id: 3, username: 'Guest123', is_premium: false }
            ];
            window.allUsers = mockUsers;
            renderTable(mockUsers);
        }
    }

    function renderTable(users) {
        tableBody.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>
                    <span class="status-badge ${user.is_premium ? 'premium' : 'free'}">
                        ${user.is_premium ? 'Premium' : 'Free'}
                    </span>
                </td>
                <td>
                    <button class="btn-toggle ${user.is_premium ? 'is-premium' : ''}" 
                            onclick="togglePremium('${user.username}', ${!user.is_premium})">
                        ${user.is_premium ? 'Revoke Premium' : 'Grant Premium'}
                    </button>
                    <button class="btn-reset" onclick="resetPassword('${user.username}')">
                        Reset Password
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function filterUsers(query) {
        if (!window.allUsers) return;
        const lowerQ = query.toLowerCase();
        const filtered = window.allUsers.filter(u => u.username.toLowerCase().includes(lowerQ));
        renderTable(filtered);
    }

    // Expose functions to global scope for onclick handlers
    window.togglePremium = async (username, newStatus) => {
        if(!confirm(`Change premium status for ${username} to ${newStatus}?`)) return;

        try {
            // NOTE: Implement this endpoint in Flask
            const res = await fetch('/api/admin/toggle_premium', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, is_premium: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                fetchUsers(); // Reload table
            } else {
                alert('Action failed: ' + data.message);
            }
        } catch (e) {
            console.log('Mocking success for demo');
            // Mock update locally
            const u = window.allUsers.find(u => u.username === username);
            if(u) u.is_premium = newStatus;
            renderTable(window.allUsers);
        }
    };

    window.resetPassword = async (username) => {
        if(!confirm(`Reset password for ${username}?`)) return;

        try {
             // NOTE: Implement this endpoint in Flask
            const res = await fetch('/api/admin/reset_password', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username })
            });
            alert('Password reset request sent.');
        } catch (e) {
            alert('Mock: Password reset for ' + username);
        }
    };
});