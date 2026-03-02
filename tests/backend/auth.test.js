/**
 * Auth + User API tests
 * Run: npm test (from backend/)
 */
const request  = require('supertest');
const mongoose = require('mongoose');
const app      = require('../../src/server');
const User     = require('../../src/models/User');

const TEST_DB = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/uch_test';

beforeAll(async () => {
    await mongoose.connect(TEST_DB, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

// ── Registration ─────────────────────────────────────────────────────────────
describe('POST /api/users/register', () => {
    it('registers a new user and returns token', async () => {
        const res = await request(app).post('/api/users/register').send({
            name: 'Alice Test', email: 'alice@test.com', password: 'Password1!',
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user.email).toBe('alice@test.com');
        expect(res.body.user.role).toBe('patient');
    });

    it('rejects duplicate email', async () => {
        await request(app).post('/api/users/register').send({
            name: 'Alice', email: 'dupe@test.com', password: 'Password1!',
        });
        const res = await request(app).post('/api/users/register').send({
            name: 'Alice2', email: 'dupe@test.com', password: 'Password1!',
        });
        expect(res.status).toBe(400);
        expect(res.body.msg).toMatch(/already exists/i);
    });

    it('rejects password shorter than 8 characters', async () => {
        const res = await request(app).post('/api/users/register').send({
            name: 'Bob', email: 'bob@test.com', password: 'short',
        });
        expect(res.status).toBe(400);
    });
});

// ── Login ─────────────────────────────────────────────────────────────────────
describe('POST /api/auth/login', () => {
    beforeEach(async () => {
        await request(app).post('/api/users/register').send({
            name: 'Carol', email: 'carol@test.com', password: 'Password1!',
        });
    });

    it('returns token on valid credentials', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'carol@test.com', password: 'Password1!',
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('refreshToken');
    });

    it('rejects wrong password', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'carol@test.com', password: 'WrongPass!',
        });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Invalid credentials');
    });

    it('rejects unknown email', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'nobody@test.com', password: 'Password1!',
        });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Invalid credentials');
    });
});

// ── Get /me ───────────────────────────────────────────────────────────────────
describe('GET /api/users/me', () => {
    let token;

    beforeEach(async () => {
        const reg = await request(app).post('/api/users/register').send({
            name: 'Dave', email: 'dave@test.com', password: 'Password1!',
        });
        token = reg.body.token;
    });

    it('returns user profile with valid token', async () => {
        const res = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.email).toBe('dave@test.com');
        expect(res.body).not.toHaveProperty('password');
    });

    it('rejects request without token', async () => {
        const res = await request(app).get('/api/users/me');
        expect(res.status).toBe(401);
    });
});

// ── Logout ────────────────────────────────────────────────────────────────────
describe('POST /api/auth/logout', () => {
    it('blacklists token so subsequent requests fail', async () => {
        const reg = await request(app).post('/api/users/register').send({
            name: 'Eve', email: 'eve@test.com', password: 'Password1!',
        });
        const token = reg.body.token;

        await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Token should now be rejected
        const me = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);
        expect(me.status).toBe(401);
    });
});

// ── Health check ──────────────────────────────────────────────────────────────
describe('GET /health', () => {
    it('returns 200 ok', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
    });
});