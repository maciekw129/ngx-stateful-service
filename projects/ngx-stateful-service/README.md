# Stateful Service :sparkles:

> Lightweight state management for Angular.

[Github repository](https://github.com/maciekw129/ngx-stateful-service)

## Compatibility with Angular Versions

Angular version `14.0.0` or higher is required."

## Table of contents

- [Installation](#installation)
- [Initial setup](#initial-setup)
  - [modules](#initializing-state-with-modules-approach)
  - [standalone components](#initializing-state-with-standalone-components-approach)
  - [accessing stateful service](#accessing-the-statefulservice)
  - [custom stateful service](#creating-custom-stateful-service)
- [State manipulation](#state-manipulation)
  - [extracting state](#extracting-state)
  - [updating state](#updating-state)
  - [reseting state](#reseting-state)
- [Example](#example)

## Installation

```
npm i ngx-stateful-service
```

## Initial setup

### Initializing state with modules approach

With the standard modules approach, all you have to do is <strong>import the
`StatefulServiceModule` and provide it with an initial state:</strong>

```ts
import { StatefulServiceModule } from "ngx-stateful-service";

interface ExampleState {
  firstName: string;
  todos: string[];
}

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    StatefulServiceModule.withConfig<ExampleState>({
      initialState: {
        firstName: "Maciej",
        todos: ["Vacuum the apartment"],
      },
    }),
  ],
  providers: [],
})
export class ExampleModule {}
```

### Initializing state with standalone components approach

The initialization of state in the standalone components approach resembles that of the module approach. However, in this case, <strong>you'll utilize the `importProvidersFrom` method to provide the `StatefulServiceModule`:</strong>

```ts
interface ExampleState {
  firstName: string;
  todos: string[];
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forRoot([
      {
        path: "",
        loadComponent: () => import("./example/example.component").then((m) => m.ExampleComponent),
        providers: [
          importProvidersFrom(
            StatefulServiceModule.withConfig<ExampleState>({
              initialState: {
                firstName: "Maciej",
                todos: ["Vacuum the apartment"],
              },
            })
          ),
        ],
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Accessing the StatefulService

In components declared within the proper module/route, <strong>you have access to the previously initialized instance of StatefulService</strong>:

```ts
import { StatefulService } from "ngx-stateful-service";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
})
export class ExampleComponent {
  private readonly exampleStatefulService = inject(StatefulService<ExampleState>);
}
```

### Creating custom stateful service

You can also create a custom stateful service that includes all the features of the default stateful service. To initialize an initial state within it, you should pass an object as an argument in the constructor:

```ts
import { CustomStatefulService } from "ngx-stateful-service";

@Injectable()
export class ExampleStatefulService extends CustomStatefulService<ExampleState> {
  constructor() {
    super({
      firstName: "Maciej",
      todos: ["Vacuum the apartment"],
    });
  }
}
```

## State manipulation

### Extracting state

The Stateful Service offers <strong>several methods</strong> through which you can extract data:

```ts
this.exampleStatefulService.getStateSlice$("todos"); // observable of ['Vacuum the apartment']

this.exampleStatefulService.getStateSliceValue("todos"); // ['Vacuum the apartment']

this.exampleStatefulService.getWholeState$(); // observable of {name: 'Maciej', todos: ['Vacuum the apartment']}

this.exampleStatefulService.getWholeStateValue(); // {name: 'Maciej', todos: ['Vacuum the apartment']}
```

### Updating state

To update data, you can use the <strong>`patchState` method</strong>, which accepts a `Partial` of the declared state interface:

```ts
this.exampleStatefulService.patchState({
  todos: [...this.exampleStatefulService.getStateSliceValue("todos"), "Cook dinner"],
}); // adds 'Cook dinner' to the todos array
```

### Reseting state

Last but not least, you can use <strong>`resetWholeState` and `resetStateSlice`</strong> to reset the state to its initial data:

```ts
this.exampleStatefulService.resetWholeState(); // sets whole state to initial value

this.exampleStatefulService.resetStateSlice("todos"); // sets todos property to its initial value
```

## Example

[Here](https://github.com/maciekw129/ngx-stateful-service/tree/main/src/app/demo) you can find `demo` component where an example of use is presented.
