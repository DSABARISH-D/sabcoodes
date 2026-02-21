const API_URL = 'http://localhost:5000/api';

async function testLoginAndSession() {
    try {
        console.log('1. Attempting Login...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'user', password: 'password' })
        });

        if (!loginRes.ok) {
            const err = await loginRes.text();
            throw new Error(`Login Failed: ${loginRes.status} ${err}`);
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('✅ Login Successful. Token obtained.');
        console.log('User ID:', loginData.id);

        console.log('2. Attempting Session Start...');
        const sessionRes = await fetch(`${API_URL}/session/start`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!sessionRes.ok) {
            const err = await sessionRes.text();
            throw new Error(`Session Start Failed: ${sessionRes.status} ${err}`);
        }

        const sessionData = await sessionRes.json();
        console.log('✅ Session Start Successful.');
        console.log('Session ID:', sessionData.sessionId);
        console.log('Questions:', sessionData.questions.length);

    } catch (error) {
        console.error('❌ Error Occurred:', error.message);
        if (error.cause) console.error(error.cause);
    }
}

testLoginAndSession();
