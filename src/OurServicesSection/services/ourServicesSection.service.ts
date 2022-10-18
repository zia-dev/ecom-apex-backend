import ourServicesSectionDao from '../daos/ourServicesSection.dao';
import { CreateDto, UpdateDto } from '../dto/ourServicesSection.dto'


class OurServiceSectionService {
  async create(resource: CreateDto, user_id: string) {
    return ourServicesSectionDao.createProfile(resource, user_id);
  }

  async list(limit: number, page: number) {
    return ourServicesSectionDao.getAll(limit, page);
  }



  async deleteById(id: string) {
    return ourServicesSectionDao.removeServiceById(id);
  }

  async readById(id: string) {
    return ourServicesSectionDao.getServiceById(id);
  }

  async getServiceTitleByName(title: string) {
    return ourServicesSectionDao.getServiceTitleName(title);
  }

  async putById(id: string, resource: UpdateDto) {
    return ourServicesSectionDao.updateUserById(id, resource);
  }
}

export default new OurServiceSectionService();
