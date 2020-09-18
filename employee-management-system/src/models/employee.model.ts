import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Department} from '.';
import {DepartmentWithRelations} from './department.model';

enum JobTitles {
  DEV1 = 'Kıdemli Yazılım Geliştirme Uzmanı',
  DEV2 = 'Yazılım Geliştirme Uzmanı',
  DEV3 = 'Yazılım Geliştirme Uzman Yardımcısı',
  CTO = 'CTO',
  CEO = 'CEO',
}

@model()
export class Employee extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    name: 'first_name',
  })
  firstName?: string;

  @property({
    type: 'string',
    name: 'last_name',
  })
  lastName?: string;

  @property({
    type: 'string',
    name: 'email',
  })
  email?: string;

  @property({
    type: 'string',
    name: 'mobile_number',
  })
  mobileNumber?: string;
  @property({
    type: 'date',
    default: () => new Date(),
  })
  startDateOfWork?: string;

  @property({
    type: 'number',
    default: () => 5000,
    postgresql: {
      dataType: 'double precision',
    },
  })
  salary: number;

  @property({
    type: 'string',
    enum: Object.values(JobTitles),
  })
  jobTitles: JobTitles;

  @hasMany(() => Employee, {keyTo: 'managerId'})
  employees: Employee[];

  @belongsTo(() => Employee)
  managerId?: number;

  @belongsTo(() => Department)
  departmentId: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}


export interface EmployeeRelations {
  employees?: EmployeeWithRelations[];
  manager?: EmployeeWithRelations;
  department?: DepartmentWithRelations;
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
