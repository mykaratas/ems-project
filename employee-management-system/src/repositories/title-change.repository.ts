import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {LocationRepository} from '.';
import {PostgresDbDataSource} from '../datasources';
import {Department, TitleChange, TitleChangeRelations} from '../models';

export class TitleChangeRepository extends DefaultCrudRepository<
  TitleChange,
  typeof TitleChange.prototype.id,
  TitleChangeRelations
  > {
  public readonly department: BelongsToAccessor<Department, typeof Department.prototype.id>;

  constructor(
    @inject('datasources.postgres_db') dataSource: PostgresDbDataSource,
    @repository.getter('LocationRepository')
    locationRepositoryGetter: Getter<LocationRepository>,
  ) {
    super(TitleChange, dataSource);

    this.department = this.createBelongsToAccessorFor(
      'department',
      locationRepositoryGetter,
    );

    this.registerInclusionResolver('department', this.department.inclusionResolver);
  }
}
