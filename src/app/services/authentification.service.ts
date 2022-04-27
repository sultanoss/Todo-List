import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // lastNotifiedUid(arg0: string, arg1: string, lastNotifiedUid: any): import("@angular/fire/compat/firestore").Query<import("firebase/compat").default.firestore.DocumentData> {
  //   throw new Error('Method not implemented.');
  // }

  currentUser$ = authState(this.auth) // This is for switch to logout if user logged in
  currentUser: any;
  constructor(private auth:Auth) {
    this.auth.onAuthStateChanged((user)=>{ // check user if loged in
        this.currentUser = user;
    })
   }

  login(username:string,password:string){

    return from(signInWithEmailAndPassword(this.auth,username,password));

  }

  signUp(name:string,email:string,password:string){

    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(
      switchMap(({ user })=>updateProfile(user,{ displayName:name }))
    );

  }

  logout(){
    return from(this.auth.signOut());
  }
}

