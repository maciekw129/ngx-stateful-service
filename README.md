# Stateful Service :sparkles:
> Lightweight state management for Angular.

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Example](#example)

## Installation
```
npm i ngx-stateful-service
```

## Usage
<strong>Initializing state with modules approach:</strong>
```ts
import { StatefulServiceModule } from 'ngx-stateful-service';

interface ExampleState {
  firstName: string;
  todos: string[];
}

@NgModule({
  declarations: [
    ExampleComponent
  ],
  imports: [
    CommonModule,
    StatefulServiceModule.withConfig<ExampleState>({
      initialState: {
        firstName: 'Maciej',
        todos: ['Vacuum the apartment'],
      }
    })
  ],
  providers: []
})
export class ExampleModule { }
```

<strong>Initializing state with standalone components approach:</strong>
```ts
interface ExampleState {
  firstName: string;
  todos: string[];
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forRoot([
      {
        path: '',
        loadComponent: () => import('./example/example.component').then(m => m.ExampleComponent),
        providers: [
          importProvidersFrom(StatefulServiceModule.withConfig<ExampleState>({
            initialState: {
              firstName: 'Maciej',
              todos: ['Vacuum the apartment'],
            }
          }))
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

then, in components declared within this module, <strong>you have access to the previously initialized `StatefulService` instance</strong>:
```ts
import { StatefulService } from 'ngx-stateful-service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  private readonly exampleStatefulService = inject(StatefulService<ExampleState>);
}
```

`Stateful Service` has several methods by which we can extract data:
```ts
this.exampleStatefulService.getStateSlice$('todos'); // observable of ['Vacuum the apartment']

this.exampleStatefulService.getStateSliceValue('todos'); // ['Vacuum the apartment']

this.exampleStatefulService.getWholeState$() // observable of {name: 'Maciej', todos: ['Vacuum the apartment']}

this.exampleStatefulService.getWholeStateValue() // {name: 'Maciej', todos: ['Vacuum the apartment']}
```

and to update data you can use `patchState` method, which accepts `Partial` of your declared state interface:
```ts
this.exampleStatefulService.patchState({
  todos: [...this.exampleStatefulService.getStateSliceValue('todos'), 'Cook dinner']
})
```

## Example

In this repository you can find `demo` component where an example of use is presented.
