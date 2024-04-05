import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  constructor(private todoService:TodoService) {}

  todos: any[] = []
  errorMess: string = ''

  ngOnInit():void {
    this.todoService.fireStoreCollection.valueChanges({ idField:'id' })
    .subscribe( item => {
      this.todos = item.sort((a:any,b:any) => a.isDone - b.isDone);
    })
  }

  onClick(title: HTMLInputElement) {
    if (title.value) {
      if (!this.todoService.isExist(title.value)) {
        this.todoService.addTodo(title.value);
      } else {
        this.errorMess = "title already exist"
      }
      title.value = ''
    }
  }

  changeStatus(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id,newStatus);
  }

  onDelete(id: string) {
    this.todoService.deleteToDo(id);
  }
}
