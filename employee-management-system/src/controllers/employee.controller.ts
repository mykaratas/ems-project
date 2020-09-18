import {inject} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Employee, TitleChange} from '../models';
import {EmployeeRepository, TitleChangeRepository} from '../repositories';
import {TitleChangeService} from '../services';

export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
    @repository(TitleChangeRepository)
    public titleChangeRepository: TitleChangeRepository,
    @inject('title-change.service')
    private titleChangeService: TitleChangeService,
  ) {}

  @post('/employees', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployee',
            exclude: ['id'],
          }),
        },
      },
    })
    employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.employeeRepository.create(employee);
  }

  @get('/employees/count', {
    responses: {
      '200': {
        description: 'Employee model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.count(where);
  }

  @get('/employees/avg', {
    responses: {
      '200': {
        description: 'Employee model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async avg_emp(
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Number> {
    return this.employeeRepository.getAverageSalaryDepartment();
  }


  @get('/employees/hierarchy', {
    responses: {
      '200': {
        description: 'Array of Employee model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Employee, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async getEmployeesHierarchy(
    @param.filter(Employee) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: {'managerId': 0},
      include: [
        {
          relation: 'employees',
          scope: {
            include: [{relation: 'employees'}],
          },
        },
      ],
    }, filter);
  }



  @get('/employees', {
    responses: {
      '200': {
        description: 'Array of Employee model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Employee, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Employee) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeeRepository.find(filter);
  }

  @patch('/employees', {
    responses: {
      '200': {
        description: 'Employee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.updateAll(employee, where);
  }

  @get('/employees/{id}', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employee, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Employee, {exclude: 'where'}) filter?: FilterExcludingWhere<Employee>
  ): Promise<Employee> {
    return this.employeeRepository.findById(id, filter);
  }

  @patch('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.updateById(id, employee);
  }

  @put('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() employee: Employee,
  ): Promise<Employee> {
    await this.employeeRepository.replaceById(id, employee);
    return employee;
  }

  @patch('/employees/{id}/job-titles', {
    responses: {
      '204': {
        description: 'Job title PATCH success',
      },
    },
  })
  async updateJobTitleById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
  ): Promise<Employee> {
    this.employeeRepository.updateById(id, employee);
    return employee;
  }

  async givenProductData(data?: Partial<TitleChange>) {

  }



  @del('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.employeeRepository.deleteById(id);
  }
}
