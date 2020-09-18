import {Entity, hasMany, model, property} from '@loopback/repository';
import {Department, DepartmentWithRelations} from './department.model';

@model()
export class Location extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  postalCode?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @hasMany(() => Department, {keyTo: 'location'})
  departments: Department[];

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  departments: DepartmentWithRelations[];
}

export type LocationWithRelations = Location & LocationRelations;
