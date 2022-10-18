import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import OurServicesSectionsController from './controllers/ourServicesSection.controller';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import ourServicesSectionMiddleware from './middleware/ourServicesSection.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class OurServicesSectionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'OurServicesSectionRoutes');
  }

  configureRoutes() {
    this.app
      .route(`/our_services`)
      .get(
        jwtMiddleware.validJWTNeeded,OurServicesSectionsController.listUsers)
      .post(
        jwtMiddleware.validJWTNeeded,
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        ourServicesSectionMiddleware.validateRequiredOurServiceBodyFields,
        ourServicesSectionMiddleware.validateSameServiceTitleDoesntExist,
        OurServicesSectionsController.createOurService
      );

      this.app
        .route(`/our_services/:serviceId`)
        .all(ourServicesSectionMiddleware.validateUserExists, jwtMiddleware.validJWTNeeded)
        .get(OurServicesSectionsController.getUserById)
        .delete(OurServicesSectionsController.removeUser);
  
      this.app.param(`serviceId`, ourServicesSectionMiddleware.validateUserExists);
      this.app.put(`/our_services/:serviceId`, [
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        ourServicesSectionMiddleware.validateRequiredOurServiceBodyFields,
        OurServicesSectionsController.put,
      ]);
  
      // this.app.patch(`/users/:userId`, [
      //   body('email').isEmail().optional(),
      //   body('password')
      //     .isLength({ min: 5 })
      //     .withMessage('Password must be 5+ characters')
      //     .optional(),
      //   body('firstName').isString().optional(),
      //   body('lastName').isString().optional(),
      //   body('permissionFlags').isInt().optional(),
      //   BodyValidationMiddleware.verifyBodyFieldsErrors,
      //   UsersMiddleware.validatePatchEmail,
      //   UsersController.patch,
      // ]);

    return this.app;
  }
}
