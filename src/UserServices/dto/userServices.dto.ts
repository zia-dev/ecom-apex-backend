export interface CreateDto {
  // user_id: string;
  service_id: string;
  purchased_on: Date;
  completed_on: Date;
  status: string;
}
export interface UpdateDto {
   // user_id: string;
   service_id?: string;
   purchased_on?: Date;
   completed_on?: Date;
   status?: string;
}