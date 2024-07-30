import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { map, finalize } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class TransacaoService extends BaseStorageService{

  private route:string =`transacaos`;
  public loading:boolean=false

  constructor(protected http: ApiService, public Permission: PermissionService) {
    super(`transacoes/find`);
  }

  findDetailedTransacoes(): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/findDetailedTransacoes`).pipe(finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  findTotaisPerTempo(): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/findTotaisPerTempo`).pipe(finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

}
  