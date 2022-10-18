import express from 'express';
import ourServicesSectionService from '../services/cartSection.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:ourService-controller');
class CartSectionsMiddleware {
  // async validateCartBodyFields(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   if (req.body && req.body.document_name && req.body.document_path) {
  //     next();
  //   } else {
  //     res.status(400).send({
  //       error: `Missing required fields title and subtile`,
  //     });
  //   }
  // }

  // async validateSameDocumentTitleDoesntExist(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   const title = await ourServicesSectionService.getDocumenTitleByName(req.body.document_name);
  //   if (title) {
  //     res.status(400).send({ error: `document Name already exists` });
  //   } else {
  //     next();
  //   }
  // }



  async validateCartExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const cart = await ourServicesSectionService.readById(req.params.serviceId);
    if (cart) {
      res.locals.cart = cart;
      next();
    } else {
      res.status(404).send({
        error: `cart ${req.params.cartId} not found`,
      });
    }
  }

  async extractCartId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.cartId;
    next();
  }


}

export default new CartSectionsMiddleware();
