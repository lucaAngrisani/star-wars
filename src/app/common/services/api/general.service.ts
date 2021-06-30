import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from './config/api.config';

export interface Options {
  headers?: HttpHeaders,
  observe?: any,
  params?: HttpParams,
  reportProgress?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  defaultOption: Options = {};

  constructor(
    private http: HttpClient
  ) {
    this.defaultOption.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.defaultOption.observe = "response";
    this.defaultOption.reportProgress = false;
  }

  public get(url: string, getOption?: Options): Observable<any> {
    let options: Options = getOption || this.defaultOption;
    return this.http.get(API_CONFIG.get + url, options).pipe();
  }

  public getFullApi(fullApi: string): Observable<any> {
    return this.http.get(fullApi, this.defaultOption).pipe();
  }

  public post<T>(url: string, content: T): Observable<any> {

    let headers = new HttpHeaders();

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json;charset=UTF-8'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }
    return this.http.post<any>(API_CONFIG.post + url, content,
      {
        headers: headers,
        reportProgress: false
      }
    ).pipe();
  }

  public selectHeaderAccept(accepts: string[]): string | undefined {
    if (accepts.length == 0) {
      return undefined;
    }

    let type = accepts.find(x => this.isJsonMime(x));
    if (type === undefined) {
      return accepts[0];
    }
    return type;
  }

  public selectHeaderContentType (contentTypes: string[]): string | undefined {
    if (contentTypes.length == 0) {
        return undefined;
    }

    let type = contentTypes.find(x => this.isJsonMime(x));
    if (type === undefined) {
        return contentTypes[0];
    }
    return type;
}

  public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
    return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
  }

}
