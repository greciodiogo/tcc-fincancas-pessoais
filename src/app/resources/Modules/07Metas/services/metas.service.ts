import { Injectable } from '@angular/core';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { ApiService } from '@core/providers/api.service';
import { PermissionService } from '@app/core/security/authentication/permission.service';


@Injectable({
  providedIn: 'root',
})
export class MetasService extends BaseStorageService{

  public loading:boolean=false

  constructor(protected http: ApiService, public Permission: PermissionService) {
    super(`metas`);
  }

}
  