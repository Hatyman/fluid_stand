//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export * as TelemetryClient from './axios-client/TelemetryClient';

export * as TelemetryQuery from './axios-client/TelemetryQuery';



export class Telemetry implements ITelemetry {
    telemetry_id!: string;
    measured_at!: Date;
    efficiency?: number | null;
    distribution_efficiency?: number | null;
    quality?: number | null;
    session!: string;

    constructor(data?: ITelemetry) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.telemetry_id = _data["telemetry_id"];
            this.measured_at = _data["measured_at"] ? new Date(_data["measured_at"].toString()) : <any>null;
            this.efficiency = _data["efficiency"];
            this.distribution_efficiency = _data["distribution_efficiency"];
            this.quality = _data["quality"];
            this.session = _data["session"];
        }
    }

    static fromJS(data: any): Telemetry {
        data = typeof data === 'object' ? data : {};
        let result = new Telemetry();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["telemetry_id"] = this.telemetry_id;
        data["measured_at"] = this.measured_at && this.measured_at.toISOString();
        data["efficiency"] = this.efficiency;
        data["distribution_efficiency"] = this.distribution_efficiency;
        data["quality"] = this.quality;
        data["session"] = this.session;
        return data;
    }
}

export interface ITelemetry {
    telemetry_id: string;
    measured_at: Date;
    efficiency?: number | null;
    distribution_efficiency?: number | null;
    quality?: number | null;
    session: string;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

export function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}

import { addResultTypeFactory } from './axios-client/helpers';
export { setBaseUrl } from './axios-client/helpers';
export { setAxiosFactory, getAxios } from './axios-client/helpers';


//-----PersistorHydrator.File-----
import type { PersistedClient } from '@tanstack/react-query-persist-client';
import type { QueryKey } from '@tanstack/react-query'
import { getResultTypeFactory } from './axios-client/helpers';

/*
 * If you have Dates in QueryKeys (i.e. in request parameters), you need to deserialize them to Dates correctly
 * (otherwise they are deserialized as strings by default, and your queries are broken).
 */
export function deserializeDate(str: unknown) {
  const date = new Date(str as string);
  const isDate = date instanceof Date && !isNaN(date as any) && date.toISOString() === str;
  return isDate ? date : str;
}

export function deserializeDatesInQueryKeys(client: PersistedClient) {
  client.clientState.queries.forEach((query) => {
    const data: any = query.state.data;
    query.queryKey = query.queryKey.map(x => deserializeDate(x));
  });
}

export function deserializeClassesInQueryData(client: PersistedClient) {
  client.clientState.queries.forEach((query) => {
    const data: any = query.state.data;
    if (Array.isArray(data)) {
      query.state.data = data.map(elem => constructDtoClass(query.queryKey, elem));
    } else {
      query.state.data = constructDtoClass(query.queryKey, data);
    }
  });
}
/*
 * Pass this function as `deserialize` option to createSyncStoragePersister/createAsyncStoragePersister
 * to correctly deserialize your DTOs (including Dates)
 */
export function persistorDeserialize(cache: string): PersistedClient {
  const client: PersistedClient = JSON.parse(cache);
  deserializeClassesInQueryData(client);
  deserializeDatesInQueryKeys(client);

  return client;
}

export function constructDtoClass(queryKey: QueryKey, data: any): unknown {
  const resultTypeKey = getResultTypeClassKey(queryKey);
  const constructorFunction = getResultTypeFactory(resultTypeKey);

  if (!data || !constructorFunction)
    return data;

  const dto = constructorFunction();
  dto.init(data);

  return dto;
}

export function getResultTypeClassKey(queryKey: QueryKey): string {
  if (!Array.isArray(queryKey)) {
    return queryKey as unknown as string;
  }
  if (queryKey.length >= 2) {
    // We concatenate first and second elements, because they uniquely identify the query.
    // All other QueryKey elements are query parameters
    return `${queryKey[0]}___${queryKey[1]}`;
  }

  // We actually should never reach this point :)
  return queryKey.join('___');
}

export function initPersistor() {
  
  addResultTypeFactory('TelemetryClient___list', () => new Telemetry());


}
//-----/PersistorHydrator.File----