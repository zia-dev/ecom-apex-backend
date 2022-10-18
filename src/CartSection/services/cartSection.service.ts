import CartSectionDao from '../daos/cartSection.dao';
import { CreateDto, UpdateDto } from '../dto/cartSection.dto'


class CartSectionService {
  async create(resource: CreateDto, service_id: string) {
    return CartSectionDao.createProfile(resource, service_id);
  }

  async list(limit: number, page: number) {
    return CartSectionDao.getAll(limit, page);
  }



  async deleteById(id: string) {
    return CartSectionDao.removeCartById(id);
  }

  async readById(id: string) {
    return CartSectionDao.getCartById(id);
  }

  // async getDocumenTitleByName(document_name: string) {
  //   return CartSectionDao.getCartTitleName(document_name);
  // }

  async putById(id: string, resource: UpdateDto) {
    return CartSectionDao.updateCartById(id, resource);
  }
}

export default new CartSectionService();
