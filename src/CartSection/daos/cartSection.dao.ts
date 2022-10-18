import mongooseService from '../../common/services/mongoose.service';
import { CreateDto, UpdateDto } from '../dto/cartSection.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class CartSectionDao {
  Schema = mongooseService.getMongoose().Schema;
  CartSectionSchema = new this.Schema({
    service: {
      type: [
        {
          type: {
            serbice_id: { type: String, default: '' },
          },
        }
      ], default: [],
    },
    subtotal: { type: Number, default: '' },
    tax: { type: Number, default: '' },
    total: { type: Number, default: '' },
  });

  CartSection =
    mongooseService.getMongoose().models.Cart ||
    mongooseService
      .getMongoose()
      .model('Cart', this.CartSectionSchema);

  constructor() {
    log('create new instance in document');
  }

  async createProfile(CartSectionFields: CreateDto, service_id: string) {
    const CartSection = new this.CartSection({
      ...CartSectionFields,
      // this wrong
      service_id
    });
    await CartSection.save();
    return CartSection;
  }

  async getAll(limit = 25, page = 0) {
    return this.CartSection.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }


  async getCartById(id: string) {
    return this.CartSection.findOne({ id: id }).exec();
  }


  // async getCartTitleName(document_name: string) {
  //   return this.CartSection.findOne({ document_name }).exec();
  // }


  // async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
  //   const existingUser = await this.OurServicesSection.findOneAndUpdate(
  //     { _id: userId },
  //     { $set: userFields },
  //     { new: true }
  //   ).exec();

  //   return existingUser;
  // }

  async removeCartById(id: string) {
    return this.CartSection.deleteOne({ id }).exec();
  }


  async updateCartById(service_id: string, cartFields: UpdateDto) {
    const existingUser = await this.CartSection.findOneAndUpdate(
      { service_id },
      { $set: cartFields },
      { new: true }
    ).exec();

    return existingUser;
  }


}

export default new CartSectionDao();
