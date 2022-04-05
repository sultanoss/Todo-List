import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todo = new Todo();

  todos = [];

  constructor() { }

  ngOnInit(): void {

  }

  addTodo() {
    console.log(this.todo);
    // this.firestore.collection('todos').add(this.todo.toJson()).then((result: any) => {
    //   console.log('todo', result)
    // })
  }
}
