import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/models/todo.class';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  todo:Todo;

  constructor(private firestore: AngularFirestore,public dialogRef: MatDialogRef<EditDialogComponent>) { }

  ngOnInit(): void {

  }

  saveTodo(todo:any) {
    this.firestore.collection('todos').doc(todo['customIdName']).update(todo).then(() => {
    })
  }
}
