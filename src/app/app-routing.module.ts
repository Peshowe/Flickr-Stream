import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamComponent } from './stream/stream.component';

const routes: Routes = [
  { path: '', redirectTo: '/stream', pathMatch: 'full' },
  { path: 'stream', component: StreamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
