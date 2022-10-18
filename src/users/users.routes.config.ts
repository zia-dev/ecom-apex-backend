import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';
import { body } from 'express-validator';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import jwtMiddleware from '../../src/auth/middleware/jwt.middleware';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app
      .route(`/users`)
      .get(jwtMiddleware.validJWTNeeded, UsersController.listUsers)
      .post(
        body('email').isEmail(),
        body('password')
          .isLength({ min: 5 })
          .withMessage('Must include password (5+ characters)'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app
      .route(`/users/my_profile`)
      .get(jwtMiddleware.validJWTNeeded, UsersController.getUserById);

    // this.app.put(`/users`, [
    //   BodyValidationMiddleware.verifyBodyFieldsErrors,
    //   UsersMiddleware.validateSameEmailBelongToSameUser,
    //   UsersController.put,
    // ]);

    this.app.patch(`/users`, [
      jwtMiddleware.validJWTNeeded,
      UsersMiddleware.validateSameEmailDoesntExist,
      UsersController.patch,
    ]);

    return this.app;
  }
}
