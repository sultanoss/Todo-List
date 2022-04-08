import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/models/todo.class';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  todo = new Todo();
  currentTodo: Todo = new Todo();
  todos = [];

  constructor(private firestore: AngularFirestore,public dialogRef: MatDialogRef<EditDialogComponent>) { }

  ngOnInit(): void {

    this.firestore.collection('todos').valueChanges({ idField: 'customIdName' }).subscribe((changes: any) => {
      console.log('recieved changes from DB', changes);
      this.todos = changes;
    })
  }

  saveTodo(todo:any) {
    this.firestore.collection('todos').doc(todo['customIdName']).update(this.todo.toJson()).then(() => {
    })
  }
}
