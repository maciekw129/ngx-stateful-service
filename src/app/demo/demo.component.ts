import { Component, inject } from '@angular/core';
import { StatefulService } from 'ngx-stateful-service';
import { DemoState } from './demo.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DemoComponent {
  private readonly demoStatefulService = inject(StatefulService<DemoState>);
  private readonly fb = inject(FormBuilder);

  public form = this.fb.group({ todo: [null, Validators.required] });
  public readonly todos$ = this.demoStatefulService.getStateSlice$('todos');

  public addTodo(todo: string): void {
    this.demoStatefulService.patchState({
      todos: [...this.demoStatefulService.getStateSliceValue('todos'), todo],
    });
  }

  public removeTodo(todoIndex: number): void {
    this.demoStatefulService.patchState({
      todos: this.demoStatefulService
        .getStateSliceValue('todos')
        .filter((_, index) => index !== todoIndex),
    });
  }

  public resetWholeState(): void {
    this.demoStatefulService.resetWholeState();
  }

  public submitForm(): void {
    const todoValue = this.form.controls.todo.value;

    if (todoValue !== null) {
      this.addTodo(todoValue);
      this.form.reset();
    }
  }
}
