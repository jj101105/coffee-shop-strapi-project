/**
 * auth controller
 */

import jwt from 'jsonwebtoken';

const INVALID_CREDENTIALS = 'Invalid identifier or password';

export default {
  async login(ctx: any) {
    const { identifier, password } = ctx.request.body ?? {};

    if (typeof identifier !== 'string' || typeof password !== 'string') {
      return ctx.badRequest('identifier and password are required');
    }

    const user = await strapi.db
      .query('plugin::users-permissions.user')
      .findOne({
        where: {
          provider: 'local',
          $or: [
            { email: identifier.toLowerCase() },
            { username: identifier },
          ],
        },
      });

    if (!user?.password) {
      return ctx.unauthorized(INVALID_CREDENTIALS);
    }

    const validPassword = await strapi
      .plugin('users-permissions')
      .service('user')
      .validatePassword(password, user.password);

    if (!validPassword || user.blocked === true) {
      return ctx.unauthorized(INVALID_CREDENTIALS);
    }

    if (user.confirmed === false) {
      return ctx.unauthorized('Your account email is not confirmed');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });

    return ctx.send({
      jwt: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  },

  async profile(ctx: any) {
    const authenticatedUser = ctx.state.user;

    if (!authenticatedUser) {
      return ctx.unauthorized('Authentication required');
    }

    const user = await strapi.db
      .query('plugin::users-permissions.user')
      .findOne({
        where: { id: authenticatedUser.id },
      });

    if (!user || user.blocked === true) {
      return ctx.unauthorized('Authentication required');
    }

    return ctx.send({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        confirmed: user.confirmed,
        blocked: user.blocked,
      },
    });
  },
};