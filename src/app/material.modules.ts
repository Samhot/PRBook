import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule
  } from '@angular/material';

export function modules() {
  return [
      BrowserAnimationsModule,
      MatButtonModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatMenuModule,
      MatCardModule,
      MatToolbarModule,
      MatIconModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule
  ];
}

@NgModule({
  imports: modules(),
  exports: modules()
})
export class MaterialModule {}
