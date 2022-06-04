import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterContentChecked {

  loginPage : boolean = true

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    if (this.router.url == '/login') {
      this.loginPage = false
    } else {
      this.loginPage = true
    }
  }

}
