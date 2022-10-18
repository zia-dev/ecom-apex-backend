import express from 'express';
import usersService from '../../../src/users/services/users.service';
import * as argon2 from 'argon2';

class AuthMiddleware {
  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user: any = await usersService.getUserByEmailWithPassword(
      req.body.email
    );
    if (user) {
      const passwordHash = user.password;
      if (await argon2.verify(passwordHash, req.body.password)) {
        req.body.user = {
          user_id: user._id,
          email: user.email,
          user_type: user.user_type,
        };
        return next();
      }
    }

    return res.status(400).json({ errors: 'Invalid email and/or password' });
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({ error: `User email already exists` });
    } else {
      next();
    }
  }
}

export default new AuthMiddleware();
