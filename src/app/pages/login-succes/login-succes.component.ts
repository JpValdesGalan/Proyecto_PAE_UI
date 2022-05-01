import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-succes',
  templateUrl: './login-succes.component.html',
  styleUrls: ['./login-succes.component.scss']
})
export class LoginSuccesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
