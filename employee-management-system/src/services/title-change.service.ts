import {bind, /* inject, */ BindingScope, inject} from '@loopback/core';
import {TitleChangeRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class TitleChangeService {
  constructor(@inject('title-change.repository')
  private titleChangeRepository: TitleChangeRepository) {}

}
