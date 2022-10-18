import express from 'express';
import debug from 'debug';
import CartSectionService from '../services/cartSection.service';

const log: debug.IDebugger = debug('app:carts-controller');
class CartSectionsController {
  constructor() {}

  async createCart(req: express.Request, res: express.Response) {
    // this is worong///
    const {  service_id } = res.locals.jwt;

    const doc = await CartSectionService.create(req.body, service_id);
    res.status(201).send( doc['_id'] );
  }

  async listCart(req: express.Request, res: express.Response) {
    const cart = await CartSectionService.list(100, 0);
    res.status(200).send(cart);
  }

  async getCartById(req: express.Request, res: express.Response) {
    const cart = await CartSectionService.readById(req.body.id);
    res.status(200).send(cart);
  }


  

  
  async removeCart(req: express.Request, res: express.Response) {
   const cart = log(await CartSectionService.deleteById(req.body.id));
    res.status(200).send({
      message: "Document Deleted",
      cart
      

  });
  }
  
  async put(req: express.Request, res: express.Response) {
    // this is worong///
    const { cartId } = res.locals.jwt;
    const updateData = await CartSectionService.putById(cartId, req.body);
    res.status(200).send(
      {
        message: 'Service Updated',
        data: updateData,
      }
    );
  }
}

export default new CartSectionsController();
