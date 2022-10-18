import mongooseService from '../../common/services/mongoose.service';
import { CreateDto, UpdateDto } from '../dto/userServices.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UserServicesDao {
  Schema = mongooseService.getMongoose().Schema;
  UserServicesSchema = new this.Schema({
    user_id: { type: this.Schema.Types.ObjectId, ref: 'users' },
    service_id: { type: this.Schema.Types.ObjectId, ref: 'ourservices' },
    // service_id: { type: String, defaul: '' }
    purchased_on: { type: Date, default: '' },
    completed_on: { type: Date, default: '' },
    // status: string;
  });

  UserServices =
    mongooseService.getMongoose().models.UserServices ||
    mongooseService
      .getMongoose()
      .model('UserServices', this.UserServicesSchema);

  constructor() {
    log('create new instance in document');
  }

  async createProfile(UserServicesFields: CreateDto, userId: string) {
    const UserServices = new this.UserServices({
      ...UserServicesFields,
      user_id: userId
    });
    await UserServices.save();
    return UserServices;
  }

  async getAll(limit = 25, page = 0) {
    return this.UserServices.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }


  async getUserServiceById(id: string) {
    return this.UserServices.findOne({ _id: id }).exec();
  }


  // async getServiceTitleName(document_name: string) {
  //   return this.UserServices.findOne({ document_name }).exec();
  // }


  // async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
  //   const existingUser = await this.OurServicesSection.findOneAndUpdate(
  //     { _id: userId },
  //     { $set: userFields },
  //     { new: true }
  //   ).exec();

  //   return existingUser;
  // }

  async removeUserServicesById(id: string) {
    return this.UserServices.deleteOne({ id }).exec();
  }


  async UserServiceById(id: string, UserServiceFields: UpdateDto) {
    const existingUser = await this.UserServices.findOneAndUpdate(
      { _id:id },
      { $set: UserServiceFields },
      { new: true }
    ).exec();

    return existingUser;
  }


}

export default new UserServicesDao();
