/**
 * Appointment API tests
 */
const request  = require('supertest');
const mongoose = require('mongoose');
const app      = require('../../src/server');
const User        = require('../../src/models/User');
const Appointment = require('../../src/models/Appointment');

const TEST_DB = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/uch_test';

let patientToken, doctorToken, patientId, doctorId;

beforeAll(async () => {
    await mongoose.connect(TEST_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create patient
    const p = await request(app).post('/api/users/register').send({
        name: 'Patient One', email: 'patient@appt.test', password: 'Password1!',
    });
    patientToken = p.body.token;
    patientId    = p.body.user.id;

    // Create doctor directly (role can't be set via register normally — set in DB)
    const doc = new User({ name: 'Dr Smith', email: 'doctor@appt.test', password: 'Password1!', role: 'doctor' });
    await doc.save();
    doctorId = doc._id.toString();

    const login = await request(app).post('/api/auth/login').send({
        email: 'doctor@appt.test', password: 'Password1!',
    });
    doctorToken = login.body.token;
});

afterEach(async () => {
    await Appointment.deleteMany({});
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /api/appointments', () => {
    it('creates appointment when patient requests', async () => {
        const res = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${patientToken}`)
            .send({ date: '2026-06-01', time: '10:00', patientId, doctorId });

        expect(res.status).toBe(201);
        expect(res.body.status).toBe('pending');
    });

    it('detects double-booking conflict', async () => {
        const body = { date: '2026-06-01', time: '10:00', patientId, doctorId };

        await request(app).post('/api/appointments')
            .set('Authorization', `Bearer ${patientToken}`).send(body);

        const res = await request(app).post('/api/appointments')
            .set('Authorization', `Bearer ${patientToken}`).send(body);

        expect(res.status).toBe(409);
        expect(res.body.msg).toMatch(/already has an appointment/i);
    });
});

describe('GET /api/appointments/patient/:patientId', () => {
    it('returns appointments for the patient', async () => {
        await request(app).post('/api/appointments')
            .set('Authorization', `Bearer ${patientToken}`)
            .send({ date: '2026-06-02', time: '09:00', patientId, doctorId });

        const res = await request(app)
            .get(`/api/appointments/patient/${patientId}`)
            .set('Authorization', `Bearer ${patientToken}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });

    it('denies patient access to another patient appointments', async () => {
        const other = await request(app).post('/api/users/register').send({
            name: 'Other', email: 'other@appt.test', password: 'Password1!',
        });
        const otherId = other.body.user.id;

        const res = await request(app)
            .get(`/api/appointments/patient/${otherId}`)
            .set('Authorization', `Bearer ${patientToken}`);

        expect(res.status).toBe(403);
    });
});