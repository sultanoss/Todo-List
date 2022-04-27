import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthenticationService } from '../services/authentification.service';
import * as firebase from 'firebase/compat';
import { Auth, authState } from '@angular/fire/auth';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {


  [x: string]: any;

  todo = new Todo();

  todos = [];

  done = [];

  currentTodo: Todo = new Todo();

  searchedTodo: string;

  found: boolean;

  notFound: boolean;

  date: Date;

  alarm: number;

  alarm1: boolean = false;

  alarmActive: boolean = false;

  audio = new Audio('assets/clockAlarm.wav');

  doneTodo: boolean;

  userId: string;


  constructor(
     private firestore: AngularFirestore,
      public dialog: MatDialog, private auth: Auth) {
        // this.userId = this.auth.currentUser.uid
      }

  ngOnInit(): void {
    // this.userId = this.auth.currentUser.uid;
    this.auth.onAuthStateChanged((user)=>{ // check user if loged in
      if(user)
      this.userId = this.auth.currentUser.uid;
      this.firestore.collection('todos', ref => ref.where('author', '==', this.userId))
      // this.firestore.collection('todos')
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changes: any) => {
          console.log('recieved new  changes from DB', changes);
          this.todos = changes.filter(t => t.list == 'todo').map(t => new Todo(t));
          this.done = changes.filter(t => t.list == 'done').map(t => new Todo(t));
        })

        // else {

        //   return alert('you are not loged in !!')
        // }

  })


  }


  addTodo() {
    this.todo.author = this.auth.currentUser.uid;
    this.firestore.collection('todos').add(this.todo.toJson()).then((result: any) => {

      console.log(this.auth.currentUser.uid);
    })

    this.clearTodo();
  }


  clearTodo() {

    this.todo = new Todo();

  }


  deleteTodo(todo: any) {
    this.firestore.collection('todos').doc(todo['customIdName']).delete();
    this.done.splice(todo, 1);
  }


  editTodo(todo: any) {

    this.firestore.collection('todos').doc(todo['customIdName'])
      .valueChanges().subscribe((currentUser: any) => {
        this.currentTodo = new Todo(currentUser);
      });
    const dialog = this.dialog.open(EditDialogComponent);
    dialog.componentInstance.todo = todo;
  }


  sortByDate() {

    this.todos.sort(function (a, b) {
      return (a.date) - (b.date);
    });
  }


  searchTodo() {

    for (let i = 0; i < this.todos.length; i++) {
      const element = this.todos[i];

      if (element['title'] == this.searchedTodo) {
        console.log(element['title']);
        console.log('found');
        element.found = true;
        this.notFound = false;
        break;
      } else {
        this.notFound = true;
        element.found = false;
      }
    }
    this.searchedTodo = '';
  }


  cancelSearch() {
    console.log("CANCEL SEARCH WORK!");
    this.todo.found = false;
    this.searchedTodo = '';
    for (let i = 0; i < this.todos.length; i++) {
      const element = this.todos[i];
      element.found = false;
    }
    console.log(this.todo.found);
    console.log(this.todos);
    this.notFound = false;
  }



  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const todoId = event.container.data[0]['customIdName'];
      const todoList = event.container.data[0]['list'];
      this.firestore.collection('todos').doc(todoId).update({
        list: todoList == 'done' ? 'todo' : 'done'
      })
    }
    this.doneTodo = true;
  }


  setAlarm(todo: any) {
    let alarm: any = todo.alarm
    window.setTimeout(() => {
      this.playAudio()
      todo.alarm1 = true;
    }, alarm * 1000);

    console.log(this.alarm);
    todo.alarmActive = true;
  }


  stopAlarm(todo: any) {
    todo.alarm1 = false;
    todo.alarmActive = false;
    this.audio.pause();
    todo.alarm = '';
  }


  playAudio() {
    this.audio.play();
  }

}
