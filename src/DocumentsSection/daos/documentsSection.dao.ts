import mongooseService from '../../common/services/mongoose.service';
import { CreateDto, UpdateDto } from '../dto/documentsSection.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class DocumentsSectionDao {
  Schema = mongooseService.getMongoose().Schema;
  DocumentSectionSchema = new this.Schema({
    service_id: { type: this.Schema.Types.ObjectId, ref: 'ourservices' },
    document_name:  { type: String, default: '' },
    document_path:  { type: String, default: '' },  
  });

  DocumentsSection =
    mongooseService.getMongoose().models.DocumentSection ||
    mongooseService
      .getMongoose()
      .model('DocumentSection', this.DocumentSectionSchema);

  constructor() {
    log('create new instance in document');
  }

  async createProfile(DocumentsSectionFields: CreateDto, service_id: string) {
    const DocumentsSection = new this.DocumentsSection({
      ...DocumentsSectionFields,
      service_id
    });
    await DocumentsSection.save();
    return DocumentsSection;
  }

  async getAll(limit = 25, page = 0) {
    return this.DocumentsSection.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
  

  async getDocumentById(id: string) {
    return this.DocumentsSection.findOne({ _id: id }).exec();
  }


  async getServiceTitleName(document_name: string) {
    return this.DocumentsSection.findOne({ document_name }).exec();
  }


  // async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
  //   const existingUser = await this.OurServicesSection.findOneAndUpdate(
  //     { _id: userId },
  //     { $set: userFields },
  //     { new: true }
  //   ).exec();

  //   return existingUser;
  // }

  async removeDocumentById(id: string) {
    return this.DocumentsSection.deleteOne({id }).exec();
  }
  

  async updateDocumentById(service_id: string, documentsFields: UpdateDto) {
    const existingUser = await this.DocumentsSection.findOneAndUpdate(
      { _id:service_id },
      { $set: documentsFields },
      { new: true }
    ).exec();

    return existingUser;
  }


}

export default new DocumentsSectionDao();
