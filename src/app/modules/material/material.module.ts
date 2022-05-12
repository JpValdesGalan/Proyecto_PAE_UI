import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatFileInputModule  } from '@angular-material-components/file-input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxMatFileInputModule
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatFileInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
  ]
})

export class MaterialModule { }
