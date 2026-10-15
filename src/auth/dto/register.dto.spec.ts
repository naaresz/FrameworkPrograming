import { validate } from 'class-validator';
import { RegisterDto } from './register.dto.js';

describe('RegisterDto', () => {
  const createDto = (overrides: Partial<RegisterDto> = {}) =>
    Object.assign(new RegisterDto(), {
      username: 'valid-user',
      email: 'user@example.com',
      password: 'abc123',
      confirmPassword: 'abc123',
      ...overrides,
    });

  it('accepts values at the allowed length boundaries', async () => {
    const errors = await validate(
      createDto({
        username: 'u'.repeat(30),
        password: 'p'.repeat(3),
        confirmPassword: 'p'.repeat(16),
      }),
    );

    expect(errors).toHaveLength(0);
  });

  it('rejects usernames longer than 30 characters', async () => {
    const errors = await validate(createDto({ username: 'u'.repeat(31) }));

    expect(errors.map((error) => error.property)).toContain('username');
  });

  it('rejects invalid email formats', async () => {
    const errors = await validate(createDto({ email: 'not-an-email' }));

    expect(errors.map((error) => error.property)).toContain('email');
  });

  it.each(['p'.repeat(2), 'p'.repeat(17)])(
    'rejects passwords outside the 3-16 character range',
    async (password) => {
      const errors = await validate(createDto({ password }));

      expect(errors.map((error) => error.property)).toContain('password');
    },
  );
});
