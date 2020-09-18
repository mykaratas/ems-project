import {bind, /* inject, */ BindingScope, inject} from '@loopback/core';
import {DepartmentRepository, EmployeeRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class DepartmentService {
  constructor(
    @inject('department.repository')
    private departmentRepository: DepartmentRepository,

    @inject('employee.repository')
    private employeeRepository: EmployeeRepository,

  ) {}

  /*
   * Add service methods here
   */

  async getAverageSalaryDepartment(departmentId: number) {
    let arr = (await this.employeeRepository.find()).filter(emp => emp.departmentId === 1).map(emp => emp.salary);

    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
}
