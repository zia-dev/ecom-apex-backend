import UserServicesDao from '../daos/userServices.dao';
import { CreateDto, UpdateDto } from '../dto/userServices.dto'


class UserServicesService {
  async create(resource: CreateDto, userId: string) {
    return UserServicesDao.createProfile(resource, userId);
  }

  async list(limit: number, page: number) {
    return UserServicesDao.getAll(limit, page);
  }



  async deleteById(id: string) {
    return UserServicesDao.removeUserServicesById(id);
  }

  async readById(id: string) {
    return UserServicesDao.getUserServiceById(id);
  }

  // async getDocumenTitleByName(document_name: string) {
  //   return UserServicesDao.getServiceTitleName(document_name);
  // }

  async putById(id: string, resource: UpdateDto) {
    return UserServicesDao.UserServiceById(id, resource);
  }
}

export default new UserServicesService();
