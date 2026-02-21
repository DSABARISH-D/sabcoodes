const { getDb, query } = require('./server/db');

async function listUsers() {
    try {
        const db = await getDb();
        const users = query(db, "SELECT id, username, role FROM users WHERE username IN ('admin', 'user')");
        console.log('Specific Users in DB:');
        console.table(users);

        // Also verify password hashes (just length/presence)
        const hashes = query(db, "SELECT username, password FROM users WHERE username IN ('admin', 'user')");
        console.log('Hashes found:', hashes.length);
        hashes.forEach(h => console.log(`${h.username}: ${h.password ? 'Has Password' : 'No Password'}`));

    } catch (error) {
        console.error('Error listing users:', error);
    }
}

listUsers();
