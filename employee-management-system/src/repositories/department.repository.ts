import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {LocationRepository} from '.';
import {PostgresDbDataSource} from '../datasources';
import {Department, DepartmentRelations, Employee, Location} from '../models';
import {EmployeeRepository} from './employee.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
  > {

  public readonly location: BelongsToAccessor<Location, typeof Location.prototype.id>;
  public readonly manager: BelongsToAccessor<Employee, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource,
    @repository.getter('LocationRepository')
    locationRepositoryGetter: Getter<LocationRepository>,
    @repository.getter('EmployeeRepository')
    employeeRepositoryGetter: Getter<EmployeeRepository>

  ) {
    super(Department, dataSource);

    this.location = this.createBelongsToAccessorFor(
      'location',
      locationRepositoryGetter,
    );

    this.manager = this.createBelongsToAccessorFor(
      'manager',
      employeeRepositoryGetter
    );

    this.registerInclusionResolver('manager', this.manager.inclusionResolver);
    this.registerInclusionResolver('location', this.location.inclusionResolver);

  }
}
