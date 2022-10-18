import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as argon2 from 'argon2';
import usersService from '../../../src/users/services/users.service';

const log: debug.IDebugger = debug('app:auth-controller');

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const refreshId = req.body.userId + jwtSecret;
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const hash = crypto
        .createHmac('sha512', salt)
        .update(refreshId)
        .digest('base64');
      req.body.refreshKey = salt.export();
      const token = jwt.sign(req.body.user, jwtSecret);

      return res.status(201).json({ accessToken: token, user: req.body.user });
    } catch (err) {
      log('createJWT error: %O', err);
      return res.status(500).send();
    }
  }

  async signupUser(req: express.Request, res: express.Response) {
    let {
      email,
      password,
      first_name,
      last_name,
      phone_number,
      whatsapp_number,
      wechat_number,
    } = req.body;
    password = await argon2.hash(password);
    const user = await usersService.create({
      email,
      password,
      first_name,
      last_name,
      phone_number,
      whatsapp_number,
      wechat_number,
    });
    const userJwt = {
      user_id: user._id,
      email: email,
      user_type: user.user_type,
    };
    const token = jwt.sign(userJwt, jwtSecret);
    return res.status(201).json({ accessToken: token, user: userJwt });
  }
}

export default new AuthController();
