import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { UUID_TOKEN } from './uuid.token';
import { IpResponse } from './load-ip.model';

@Injectable()
export class LoadIPService {
  private api: string = 'http://api.ipify.org/?format=json';
  private config$: Observable<IpResponse> = of();

  constructor(
    @Inject(UUID_TOKEN) private uuid: BehaviorSubject<string>,
    private httpClient: HttpClient
  ) {}

  load() {
    this.config$ = this.httpClient.get<IpResponse>(this.api).pipe(
      shareReplay(1),
      catchError<IpResponse, Observable<IpResponse>>((_) =>
        of({ ip: 'NotObtained' })
      )
    );

    this.config$.subscribe((res: IpResponse) => {
      this.uuid.next(res.ip);
    });

    return this.config$;
  }
}
