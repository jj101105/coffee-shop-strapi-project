export class CostumerDTO {
  name?: string;
  gender?: 'MALE' | 'FEMALE';
  phone?: string;
  orders?: Array<string | number>;

  constructor(data: Partial<CostumerDTO> = {}) {
    Object.assign(this, data);
  }
}