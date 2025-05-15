import request from 'supertest';
import app from '../../server.js';

describe('Server', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({username: 'TestUser', password: 'TestPassword' })
        // Need to put '.body' to get the whole object & .(in this case 'message') to get the element of the object.
        expect(response.body.message).toBe('Register Successful');
    });
});