export interface CreateUserDto {
  email: string;
  password: string;
  user_type?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  whatsapp_number?: string;
  wechat_number?: string;
}
