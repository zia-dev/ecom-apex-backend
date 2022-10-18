import express from 'express';
import debug from 'debug';
import ourServicesSectionService from '../services/ourServicesSection.service';

const log: debug.IDebugger = debug('app:users-controller');
class OurServicesSectionsController {
  constructor() {}

  async createOurService(req: express.Request, res: express.Response) {
    const { user_id } = res.locals.jwt;

    const user = await ourServicesSectionService.create(req.body, user_id);
    res.status(201).send( user['_id'] );
  }

  async listUsers(req: express.Request, res: express.Response) {
    const users = await ourServicesSectionService.list(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await ourServicesSectionService.readById(req.params.serviceId);
    res.status(200).send(user);
  }


  

  
  async removeUser(req: express.Request, res: express.Response) {
    log(await ourServicesSectionService.deleteById(req.params.serviceId));
    res.status(204).send({message: "Data Deleted"});
  }
  
  async put(req: express.Request, res: express.Response) {
    const serviceId = req.params.serviceId;
    const updateData = await ourServicesSectionService.putById(serviceId, req.body);
    res.status(200).send(
      {
        message: 'Service Updated',
        data: updateData,
      }
    );
  }
}

export default new OurServicesSectionsController();
