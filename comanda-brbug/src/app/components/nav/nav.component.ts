import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  @Input() titulo;
  constructor(private router : Router) { }

  ngOnInit() {}

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
