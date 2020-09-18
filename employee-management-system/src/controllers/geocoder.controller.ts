import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {GeoCoderService} from '../services';


// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


export class GeocoderController {
  constructor(
    @inject('geocoder.service')
    protected geoService: GeoCoderService,
  ) {}

  @get('/location-info')
  async getApiLocationInfo(
    @param.query.string('geo') lat_lng: string,
  ): Promise<any> {
    const response = await this.geoService.getAdressLatLng(lat_lng);
    console.log(response);
    return response;
  };
}
