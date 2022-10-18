export interface CreateDto {
  services?: [
    {
      service_id?: string;
    }
  ];
  subtotal : number;
    tax : number;
  total : number;
}
export interface UpdateDto {
  services?: [
    {
      service_id?: string;
    }
  ];
  subtotal? : number;
    tax? : number;
  total? : number;
}
