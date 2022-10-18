import express from 'express';
import UserServicesService from '../services/userServices.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:UserServices-controller');
class UserServicesMiddleware {
  async validateDocumentsBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.service_id) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields service_name`,
      });
    }
  }

 



  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UserServicesService.readById(req.params.user_service_id);
    if (user) {
      // res.locals.user = user;
      next();
    } else {
      res.status(404).send({
        error: `User Services  ${req.params.user_service_id} not found`,
      });
    }
  }

  async extractDocumentId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user_service = ( await UserServicesService.readById(req.params.user_service_id));
    if (user_service) {
      next()
    }
    else {
      res.status(404).send({
        error: `User Service ${req.params.user_service_id} not found`,
      });
    }
  }


}

export default new UserServicesMiddleware();
