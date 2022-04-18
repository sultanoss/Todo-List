import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  constructor(public authService:AuthenticationService,public router: Router) { }

  ngOnInit(): void {
  }

  logout() {

    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    })

  }

}
