import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatSnackBarModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatButtonModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatSnackBarModule,
        MatListModule,
        MatChipsModule,
        MatAutocompleteModule
    ],

    exports: [
        MatButtonModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatListModule,
        MatChipsModule,
        MatAutocompleteModule
    ],
})

export class MaterialModule {

}
