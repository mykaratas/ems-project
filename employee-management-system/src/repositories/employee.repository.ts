import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DepartmentRepository} from '.';
import {PostgresDbDataSource} from '../datasources';
import {Department, Employee, EmployeeRelations} from '../models';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
  > {

  public readonly manager: BelongsToAccessor<
    Employee,
    typeof Employee.prototype.id
  >;

  public readonly employees: HasManyRepositoryFactory<
    Employee,
    typeof Employee.prototype.id
  >;

  public readonly department: BelongsToAccessor<
    Department,
    typeof Department.prototype.id
  >;


  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource,
    @repository.getter('DepartmentRepository')
    protected departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(Employee, dataSource);
    this.employees = this.createHasManyRepositoryFactoryFor(
      'employees',
      Getter.fromValue(this),
    );

    this.manager = this.createBelongsToAccessorFor(
      'manager',
      Getter.fromValue(this),
    ); // for recursive relationship

    this.department = this.createBelongsToAccessorFor('department', departmentRepositoryGetter);

    this.registerInclusionResolver('manager', this.manager.inclusionResolver);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
    this.registerInclusionResolver('department', this.department.inclusionResolver);
  }

  async getAverageSalaryDepartment() {
    let arr = (await this.find()).filter(emp => emp.departmentId === 1).map(emp => emp.salary);

    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
}
