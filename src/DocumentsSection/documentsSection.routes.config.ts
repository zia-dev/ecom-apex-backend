import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import documentsSectionController from './controllers/documentsSection.controller';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import documentsSectionMiddleware from './middleware/documentsSection.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class DocumentsSectionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'DocumentsSectionRoutes');
  }

  configureRoutes() {
    this.app
    .route(`/documents`)
    .get(
      jwtMiddleware.validJWTNeeded,documentsSectionController.listDocs)
    .post(
      jwtMiddleware.validJWTNeeded,
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      documentsSectionMiddleware.validateDocumentsBodyFields,
      documentsSectionMiddleware.validateSameDocumentTitleDoesntExist,
      documentsSectionController.createdocs
    );

    // this.app.param(`documentId`, documentsSectionMiddleware.extractDocumentId);
    this.app
      .route(`/documents/:documentId`)
      .all(documentsSectionMiddleware.validateUserExists, jwtMiddleware.validJWTNeeded)
      .get(documentsSectionController.getdocById)
      .delete(documentsSectionMiddleware.validateUserExists,
        documentsSectionController.removedoc);

    this.app.param(`documentId`, documentsSectionMiddleware.validateUserExists);
    this.app.put(`/documents/:documentId`, [
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      documentsSectionMiddleware.validateDocumentsBodyFields,
      documentsSectionController.put,
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
