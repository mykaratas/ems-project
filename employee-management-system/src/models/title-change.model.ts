import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Department, DepartmentWithRelations} from './department.model';

@model()
export class TitleChange extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  startDate?: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @property({
    type: 'string',
  })
  oldTitle?: string;

  @property({
    type: 'string',
  })
  newTitle?: string;

  @belongsTo(() => Department)
  department?: number;


  constructor(data?: Partial<TitleChange>) {
    super(data);
  }
}

export interface TitleChangeRelations {
  department: DepartmentWithRelations;
}

export type TitleChangeWithRelations = TitleChange & TitleChangeRelations;
