import mongooseService from '../../common/services/mongoose.service';
import { CreateDto, UpdateDto } from '../dto/ourServicesSection.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class OurServicesSectionsDao {
  Schema = mongooseService.getMongoose().Schema;
  OurServicesSectionSchema = new this.Schema({
    user_id: { type: this.Schema.Types.ObjectId, ref: 'Users' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    service_image: { type: String, default: '' },
    options: {
      type: [
        {
          type: {
            option_1: { type: String, default: '' },
            option_2: { type: String, default: '' },
            option_3: { type: String, default: '' },
            option_4: { type: String, default: '' },
            option_5: { type: String, default: '' },
          },
        }
      ], default: [],
    },
    document_checklist: {
      type: [
        {
          type: {
              title: { type: String, default: '' },
              options: {
                type: [
                  {
                    type: {
                      option_1: { type: String, default: '' },
                      option_2: { type: String, default: '' },
                      option_3: { type: String, default: '' },
                      option_4: { type: String, default: '' },
                      option_5: { type: String, default: '' },
                    },
                  }
                ], default: [],
              },
          },
        }
      ]
    }
  });

  OurServicesSection =
    mongooseService.getMongoose().models.OurServices ||
    mongooseService
      .getMongoose()
      .model('OurServices', this.OurServicesSectionSchema);

  constructor() {
    log('create new instance in Profile');
  }

  async createProfile(ourServicesSectionsFields: CreateDto, user_id: string) {
    const OurServicesSection = new this.OurServicesSection({
      ...ourServicesSectionsFields,
      user_id
    });
    await OurServicesSection.save();
    return OurServicesSection;
  }

  async getAll(limit = 25, page = 0) {
    return this.OurServicesSection.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
  

  async getServiceById(id: string) {
    return this.OurServicesSection.findOne({ _id: id }).exec();
  }


  async getServiceTitleName(title: string) {
    return this.OurServicesSection.findOne({ title: title }).exec();
  }


  // async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
  //   const existingUser = await this.OurServicesSection.findOneAndUpdate(
  //     { _id: userId },
  //     { $set: userFields },
  //     { new: true }
  //   ).exec();

  //   return existingUser;
  // }

  async removeServiceById(id: string) {
    return this.OurServicesSection.deleteOne({_id: id }).exec();
  }
  

  async updateUserById(id: string, userFields: UpdateDto) {
    const existingUser = await this.OurServicesSection.findOneAndUpdate(
      { _id:id },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }


}

export default new OurServicesSectionsDao();
