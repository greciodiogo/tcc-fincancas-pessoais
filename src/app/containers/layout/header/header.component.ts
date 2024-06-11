import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { environment as env } from '@env/environment';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Input() public currentUser:any
  @Input() public authenticated: AuthService
  @Input() public layoutNavigationTop:boolean = true;
  public subscriptions = [];
  public layout = {
    customLayout: true,
        layoutNavigationTop: true
  };

  constructor(public auth: AuthService) { }
  ngOnInit() {}


}
