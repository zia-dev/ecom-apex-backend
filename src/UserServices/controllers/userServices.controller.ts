import express from 'express';
import debug from 'debug';
import UserServicesService from '../services/userServices.service';

const log: debug.IDebugger = debug('app:docs-controller');
class UserServicesController {
  constructor() {}

  async createUserServices(req: express.Request, res: express.Response) {
    const { user_id } = res.locals.jwt;
    const userServices = await UserServicesService.create(req.body, user_id);
    res.status(201).send( userServices['_id'] );
  }

  async listUserServices(req: express.Request, res: express.Response) {
    const userServices = await UserServicesService.list(100, 0);
    res.status(200).send(userServices);
  }

  async getUserServicesById(req: express.Request, res: express.Response) {
    const doc = await UserServicesService.readById(req.params.user_service_id);
    res.status(200).send(doc);
  }


  

  
  async removeUserServices(req: express.Request, res: express.Response) {
   const userServices = log(await UserServicesService.deleteById(req.params.user_service_id));
    res.status(200).send({
      message: "User Services Deleted",
      userServices
      

  });
  }
  
  async put(req: express.Request, res: express.Response) {
   
    
    
    const updateData = await UserServicesService.putById(req.params.user_service_id, req.body);
    res.status(200).send(
      {
        message: 'Service Updated',
        data: updateData,
      }
    );
  }
}

export default new UserServicesController();
