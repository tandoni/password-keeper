import { Component, OnInit, Inject } from '@angular/core';
import { Password } from "app/models/password.model";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import * as firebase from 'firebase/app';

interface PasswordDialogData {
  firebasePath: string;
  password?: Password;
}

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
  title = "Add a new password";
  formPassword: Password;

  constructor(private dialogRef: MdDialogRef<PasswordDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: PasswordDialogData) {
    this.formPassword = new Password();
  }

  ngOnInit() {
    if (this.data.password) {
      this.title = "Edit this password";
      Object.assign(this.formPassword, this.data.password);
    }
  }

  onSubmit() {
    const fbRef = firebase.database().ref(this.data.firebasePath)
    try {
      if (this.data.password) {
        fbRef.child(this.data.password.$key).set(this.formPassword);
      } else {
        fbRef.push(this.formPassword);
      }
      this.dialogRef.close();
    } catch (e) {
      console.error("submit error", e);
    }
  }

}
