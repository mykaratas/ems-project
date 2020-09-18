import {bind, /* inject, */ BindingScope, inject} from '@loopback/core';
import {EmployeeRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class EmployeeService {
  constructor(@inject('employee.repository')
  private employeeRepository: EmployeeRepository) {}

  /*
   * Add service methods here
   */
}
