import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import mongooseService from '../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';
import { UserTypeEnum } from '../../common/enum/common.userType.enum';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
  Schema = mongooseService.getMongoose().Schema;
  userSchema = new this.Schema({
    email: { type: String, default: '' },
    password: { type: String, select: false },
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    phone_number: { type: String, default: '' },
    whatsapp_number: { type: String, default: '' },
    wechat_number: { type: String, default: '' },
    user_type: { type: String, default: UserTypeEnum.Customer },
  });

  User = mongooseService.getMongoose().model('Users', this.userSchema);
  constructor() {
    log('create new instance in user');
  }

  async addUser(userFields: CreateUserDto) {
    const user = new this.User({
      ...userFields,
      permissionFlags: 1,
    });
    await user.save();
    return user;
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUserById(userId: string) {
    return this.User.findOne({ _id: userId }).exec();
  }

  async getUsers(limit = 25, page = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }

  async removeUserById(userId: string) {
    return this.User.deleteOne({ _id: userId }).exec();
  }

  async getUserByEmailWithPassword(email: string) {
    return this.User.findOne({ email: email })
      .select('_id email permissionFlags +password')
      .exec();
  }
}

export default new UsersDao();
