import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import UserServicesController from './controllers/userServices.controller';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import UserServicesMiddleware from './middleware/userServices.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class UserServicesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UserServicesRoutes');
  }

  configureRoutes() {
    this.app
    .route(`/user_services`)
    .get(
      jwtMiddleware.validJWTNeeded,UserServicesController.listUserServices)
    .post(
      jwtMiddleware.validJWTNeeded,
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UserServicesMiddleware.validateDocumentsBodyFields,
      // UserServicesMiddleware.validateSameDocumentTitleDoesntExist,
      UserServicesController.createUserServices
    );

    // this.app.param(`user_service_id`, documentsSectionMiddleware.extractuser_service_id);
    this.app
      .route(`/user_services/:user_service_id`)
      .all(UserServicesMiddleware.validateUserExists, jwtMiddleware.validJWTNeeded)
      .get(UserServicesController.getUserServicesById)
      .delete(UserServicesMiddleware.validateUserExists,
        UserServicesController.removeUserServices);

    this.app.param(`user_service_id`, UserServicesMiddleware.validateUserExists);
    this.app.put(`/user_services/:user_service_id`, [
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UserServicesMiddleware.validateDocumentsBodyFields,
      UserServicesController.put,
    ]);
  
   
    return this.app;
  }
}
