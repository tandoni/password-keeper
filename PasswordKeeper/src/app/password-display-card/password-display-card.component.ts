import { Component, OnInit, Input } from '@angular/core';
import { Password } from "app/models/password.model";
import * as firebase from 'firebase/app';
import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-password-display-card',
  templateUrl: './password-display-card.component.html',
  styleUrls: ['../shared/common.scss', './password-display-card.component.scss']
})
export class PasswordDisplayCardComponent implements OnInit {
  @Input() password: Password;
  @Input() firebasePath: string;

  isExpanded = false;

  constructor(private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  edit(): void {

  }

  delete(): void {
    firebase.database().ref(this.firebasePath).child(this.password.$key).remove();
    this.snackBar.open("Password removed", "Dismiss", {
      duration: 3000
    });
}

}
