import express from 'express';
import { UserTypeEnum } from '../enum/common.userType.enum';
import debug from 'debug';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
  permissionFlagRequired(requiredPermissionFlag: UserTypeEnum) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const userPermissionFlags = res.locals.jwt.permissionFlags;
        if (userPermissionFlags == requiredPermissionFlag) {
          next();
        } else {
          res.status(403).send();
        }
      } catch (e) {
        log(e);
      }
    };
  }
}

export default new CommonPermissionMiddleware();
