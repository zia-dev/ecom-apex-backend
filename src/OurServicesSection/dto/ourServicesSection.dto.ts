export interface CreateDto {
  title: string;
  subtitle: string;
  service_image?: string;
  options?: [
    {
      option_1?: string;
      option_2?: string;
      option_3?: string;
      option_4?: string;
      option_5?: string;
    }
  ];
  document_checklist?: [
    {
      title?: string;
      options?: [
        {
          option_1?: string;
          option_2?: string;
          option_3?: string;
          option_4?: string;
          option_5?: string;
        }
      ]
    }
  ];
}

export interface UpdateDto {
  title?: string;
  subtitle?: string;
  service_image?: string;
  options?: [
    {
      option_1?: string;
      option_2?: string;
      option_3?: string;
      option_4?: string;
      option_5?: string;
    }
  ];
  document_checklist?: [
    {
      title?: string;
      options?: [
        {
          option_1?: string;
          option_2?: string;
          option_3?: string;
          option_4?: string;
          option_5?: string;
        }
      ]
    }
  ];
}
