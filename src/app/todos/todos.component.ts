import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ref } from 'firebase/database';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  [x: string]: any;

  todo = new Todo();

  todos = [];


  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.firestore.collection('todos').valueChanges({ idField: 'customIdName' }).subscribe((changes: any) => {
      console.log('recieved changes from DB', changes);
      this.todos = changes;
    })
  }

  addTodo() {
    console.log(this.todo);
    this.firestore.collection('todos').add(this.todo.toJson()).then((result: any) => {
      console.log('todo', result)
    })


    this.clearTodo();
  }


  clearTodo() {

    this.todo.title = '';
    this.todo.discription = '';

  }

  deleteTodo(todo:any) {
    this.firestore.collection('todos').doc(todo['customIdName']).delete();
  }
}

