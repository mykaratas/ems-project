import {Entity, model, property} from '@loopback/repository';

@model()
export class Todo extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  remindAtAddress?: string; // address,city,zipcode

  @property({
    type: 'string',
  })
  remindAtGeo?: string; // latitude,longitude


  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
}

export type TodoWithRelations = Todo & TodoRelations;
