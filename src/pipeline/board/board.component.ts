import { Component, ViewChild } from '@angular/core';
import { BlockType } from '../sidebar/sidebar.component';
import { InnerBoardComponent } from '../inner-board/inner-board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  @ViewChild(InnerBoardComponent) innerBoard!: InnerBoardComponent

  handleEventAdd(blockName:BlockType): void{
    this.innerBoard.addBlock(blockName)
  }

  
  
}
