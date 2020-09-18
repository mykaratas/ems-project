import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'geocoder',
  connector: 'rest',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url:
          'https://api.opencagedata.com/geocode/v1/json',
        query: {
          key: 'ceaad797fa0f426ea5476a4f224aba94',
          q: '{LAT_LNG}'
        },
        responsePath: '$',
      },
      functions: {
        getAdressLatLng: ['LAT_LNG'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GeocoderDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'geocoder';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.geocoder', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
