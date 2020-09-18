// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GeocoderDataSource} from '../datasources';

export interface GeoCoderService {
  getAdressLatLng(LAT_LNG: string): Promise<any>;
}

export class GeoCoderProvider implements Provider<GeoCoderService> {
  constructor(
    // geocoder must match the name property in the datasource json file
    @inject('datasources.geocoder')
    protected dataSource: GeocoderDataSource = new GeocoderDataSource(),
  ) {}

  value(): Promise<GeoCoderService> {
    return getService(this.dataSource);
  }
}
