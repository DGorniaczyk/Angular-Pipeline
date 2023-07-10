import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';

import { PipelineRoutingModule } from './pipeline-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlockComponent } from './block/block.component';
import { BoardComponent } from './board/board.component';
import { InnerBoardComponent } from './inner-board/inner-board.component';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    BlockComponent,
    BoardComponent,
    InnerBoardComponent,
    ConfigDialogComponent
  ],
  imports: [
    CommonModule,
    PipelineRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class PipelineModule { }
