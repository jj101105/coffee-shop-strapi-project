export class CashierDTO {
  name!: string;
  phone!: string;
  password!: string;
  workingShift!: 'MORNING' | 'AFTERNOON' | 'EVENING';
  gender!: 'MALE' | 'FEMALE';
  email!: string;
  order?: string | number;

  constructor(data: Partial<CashierDTO> = {}) {
    Object.assign(this, data);
  }
}