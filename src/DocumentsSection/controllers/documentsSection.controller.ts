import express from 'express';
import debug from 'debug';
import DocumentSectionService from '../services/documentsSection.service';

const log: debug.IDebugger = debug('app:docs-controller');
class DocumentsSectionsController {
  constructor() {}

  async createdocs(req: express.Request, res: express.Response) {
    // this is worong///
    const   service_id  = '6339a240eb4ec1705e17a471';

    const doc = await DocumentSectionService.create(req.body, service_id);
    res.status(201).send( doc['_id'] );
  }

  async listDocs(req: express.Request, res: express.Response) {
    const docs = await DocumentSectionService.list(100, 0);
    res.status(200).send(docs);
  }

  async getdocById(req: express.Request, res: express.Response) {
    const doc = await DocumentSectionService.readById(req.params.documentId);
    res.status(200).send(doc);
  }


  

  
  async removedoc(req: express.Request, res: express.Response) {
   const doc = log(await DocumentSectionService.deleteById(req.params.documentId));
    res.status(200).send({
      message: "Document Deleted",
      doc
      

  });
  }
  
  async put(req: express.Request, res: express.Response) {
    // this is worong///
  
    const updateData = await DocumentSectionService.putById(req.params.documentId, req.body);
    res.status(200).send(
      {
        message: 'Service Updated',
        data: updateData,
      }
    );
  }
}

export default new DocumentsSectionsController();
