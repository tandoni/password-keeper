import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Password } from "app/models/password.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private authStateSubscription: Subscription

  passwordStream: FirebaseListObservable<Password[]>;

  constructor(private afAuth: AngularFireAuth, 
    private router: Router, private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.authStateSubscription = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log("User is signed in as: ", user.uid);
        this.passwordStream = this.db.list(`/users/${user.uid}`);
      } else {
        this.router.navigate(["/signin"]);
      }
    });
  }
  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

}
