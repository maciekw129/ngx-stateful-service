import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StatefulServiceModule } from 'ngx-stateful-service';
import { DemoState } from './demo/demo.model';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DemoComponent,
    RouterOutlet,
    RouterModule.forRoot([
      {
        path: '',
        loadComponent: () =>
          import('./demo/demo.component').then((m) => m.DemoComponent),
        providers: [
          importProvidersFrom(
            StatefulServiceModule.withConfig<DemoState>({
              initialState: {
                todos: ['Vacuum the apartment'],
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
