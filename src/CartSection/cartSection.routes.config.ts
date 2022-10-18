import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import CartSectionsController from './controllers/cartSection.controller';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import CartSectionsMiddleware from './middleware/cartSection.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class CartSectionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CartSectionRoutes');
  }

  configureRoutes() {
    this.app
    .route(`/cart`)
    .get(
      jwtMiddleware.validJWTNeeded,CartSectionsController.listCart)
    .post(
      jwtMiddleware.validJWTNeeded,
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      // CartSectionsMiddleware.validateCartBodyFields,
      CartSectionsController.createCart
    );

    this.app.param(`cartId`, CartSectionsMiddleware.extractCartId);
    this.app
      .route(`/cart/:id`)
      .all(CartSectionsMiddleware.validateCartExists, jwtMiddleware.validJWTNeeded)
      .get(CartSectionsController.getCartById)
      .delete(CartSectionsMiddleware.extractCartId,
        CartSectionsController.removeCart);

    this.app.param(`cartId`, CartSectionsMiddleware.extractCartId);
    this.app.put(`/carts/:id`, [
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      // CartSectionsMiddleware.validateCartBodyFields,
      CartSectionsController.put,
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
