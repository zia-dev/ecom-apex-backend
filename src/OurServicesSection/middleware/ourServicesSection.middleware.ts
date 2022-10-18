import express from 'express';
import ourServicesSectionService from '../services/ourServicesSection.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:ourService-controller');
class OurServiceMiddleware {
  async validateRequiredOurServiceBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.title && req.body.subtitle) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields title and subtile`,
      });
    }
  }

  async validateSameServiceTitleDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const title = await ourServicesSectionService.getServiceTitleByName(req.body.title);
    if (title) {
      res.status(400).send({ error: `title already exists` });
    } else {
      next();
    }
  }

  

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const service = await ourServicesSectionService.readById(req.params.serviceId);
    
    if (service) {
      res.locals.serviceId = service;
    // console.log('service middleware', service);

      next();
    } else {
      res.status(404).send({
        error: `Service having ${req.params.serviceId} is not found`,
      });
    }
  }

  async extractServiceId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
   log( await ourServicesSectionService.readById(req.params.serviceId));
    next();
  }

  // async userCantChangePermission(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   if (
  //     'permissionFlags' in req.body &&
  //     req.body.permissionFlags !== res.locals.user.permissionFlags
  //   ) {
  //     res.status(400).send({
  //       errors: ['User cannot change permission flags'],
  //     });
  //   } else {
  //     next();
  //   }
  // }
}

export default new OurServiceMiddleware();
