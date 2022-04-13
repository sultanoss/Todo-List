import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


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

  dropedTodos = JSON.stringify(this.todos)


  currentTodo: Todo = new Todo()

  searchedTodo: string;

  found: boolean;

  notFound: boolean;

  date: Date;


  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.firestore.collection('todos').valueChanges({ idField: 'customIdName' }).subscribe((changes: any) => {
      console.log('recieved changes from DB', changes);
      this.todos = changes;
    })
  }

  addTodo() {
    this.firestore.collection('todos').add(this.todo.toJson()).then((result: any) => {
      console.log('todo', result)
    })

    this.clearTodo();
  }


  clearTodo() {

    this.todo = new Todo;

  }

  deleteTodo(todo: any) {
    this.firestore.collection('todos').doc(todo['customIdName']).delete();
  }


  editTodo(todo: any) {

    this.firestore.collection('todos').doc(todo['customIdName'])
      .valueChanges().subscribe((currentUser: any) => {
        this.currentTodo = new Todo(currentUser);
        console.log('abgerufene todo', this.currentTodo);
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
      } else {
        this.notFound = true;
        element.found = false;
      }
    }
    this.searchedTodo = '';
  }

  cancelSearch() {
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

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    console.log(event);
  }

}
