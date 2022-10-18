import express from 'express';
import ourServicesSectionService from '../services/documentsSection.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:ourService-controller');
class DocumentSectionsMiddleware {
  async validateDocumentsBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.document_name && req.body.document_path) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields document_name and document_path`,
      });
    }
  }

  async validateSameDocumentTitleDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const title = await ourServicesSectionService.getDocumenTitleByName(req.body.document_name);
    if (title) {
      res.status(400).send({ error: `document Name already exists` });
    } else {
      next();
    }
  }



  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await ourServicesSectionService.readById(req.params.documentId);
    if (user) {
      // res.locals.user = user;
      next();
    } else {
      res.status(404).send({
        error: `documents ${req.params.userId} not found`,
      });
    }
  }

  async extractDocumentId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const doc = ( await ourServicesSectionService.readById(req.params.documentId));
    if (doc) {
      next()
    }
    else {
      res.status(404).send({
        error: `documents ${req.params.userId} not found`,
      });
    }
  }


}

export default new DocumentSectionsMiddleware();
