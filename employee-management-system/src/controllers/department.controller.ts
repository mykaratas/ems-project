import {inject} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Department} from '../models';
import {DepartmentRepository} from '../repositories';
import {DepartmentService} from '../services';

export class DepartmentController {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
    @inject('department.service')
    private departmentService: DepartmentService,
  ) {}

  @post('/departments', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {'application/json': {schema: getModelSchemaRef(Department)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {
            title: 'NewDepartment',
            exclude: ['id'],
          }),
        },
      },
    })
    department: Omit<Department, 'id'>,
  ): Promise<Department> {
    return this.departmentRepository.create(department);
  }

  @get('/departments/count', {
    responses: {
      '200': {
        description: 'Department model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    return this.departmentRepository.count(where);
  }

  @get('/departments', {
    responses: {
      '200': {
        description: 'Array of Department model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Department, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Department) filter?: Filter<Department>,
  ): Promise<Department[]> {
    return this.departmentRepository.find({include: [{relation: 'manager'}, {relation: 'location'}]}, filter);
  }


  @get('/departments-relations', {
    responses: {
      '200': {
        description: 'Array of Department model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Department, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find_relations(
    @param.filter(Department) filter?: Filter<Department>,
  ): Promise<Department[]> {
    return this.departmentRepository.find();
  }


  @patch('/departments', {
    responses: {
      '200': {
        description: 'Department PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Department,
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    return this.departmentRepository.updateAll(department, where);
  }

  @get('/departments/{id}', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Department, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Department, {exclude: 'where'}) filter?: FilterExcludingWhere<Department>
  ): Promise<Department> {
    return this.departmentRepository.findById(id, filter);
  }

  @get('/departments/{id}/avarage-salary', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Department, {includeRelations: true}),
          },
        },
      },
    },
  })
  async getDepartmentAvarageSalary(
    @param.path.number('id') id: number,
    @param.filter(Department, {exclude: 'where'}) filter?: FilterExcludingWhere<Department>
  ): Promise<Object> {
    return this.departmentService.getAverageSalaryDepartment(id);
  }

  @patch('/departments/{id}', {
    responses: {
      '204': {
        description: 'Department PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Department,
  ): Promise<void> {
    await this.departmentRepository.updateById(id, department);
  }

  @put('/departments/{id}', {
    responses: {
      '204': {
        description: 'Department PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() department: Department,
  ): Promise<void> {
    await this.departmentRepository.replaceById(id, department);
  }

  @del('/departments/{id}', {
    responses: {
      '204': {
        description: 'Department DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.departmentRepository.deleteById(id);
  }
}
