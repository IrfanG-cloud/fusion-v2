import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss'],
})
export class ConfirmemailComponent implements OnInit {
  email: string = '';

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: any) => {
      this.email = params.email;
    });
  }

  goToGmail(): void {
    window.location.href =
      'https://mail.google.com/mail/u/0/#search/apis.o3interfaces@gmail.com';
  }
}
