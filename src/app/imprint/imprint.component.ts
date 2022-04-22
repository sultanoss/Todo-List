import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  constructor(public route:Router) { }

  ngOnInit(): void {

    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

}
