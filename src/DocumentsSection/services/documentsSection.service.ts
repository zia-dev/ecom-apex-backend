import ourServicesSectionDao from '../daos/documentsSection.dao';
import { CreateDto, UpdateDto } from '../dto/documentsSection.dto'


class DocumentsSectionService {
  async create(resource: CreateDto, service_id: string) {
    return ourServicesSectionDao.createProfile(resource, service_id);
  }

  async list(limit: number, page: number) {
    return ourServicesSectionDao.getAll(limit, page);
  }



  async deleteById(id: string) {
    return ourServicesSectionDao.removeDocumentById(id);
  }

  async readById(id: string) {
    return ourServicesSectionDao.getDocumentById(id);
  }

  async getDocumenTitleByName(document_name: string) {
    return ourServicesSectionDao.getServiceTitleName(document_name);
  }

  async putById(id: string, resource: UpdateDto) {
    return ourServicesSectionDao.updateDocumentById(id, resource);
  }
}

export default new DocumentsSectionService();
