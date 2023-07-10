import { Component, EventEmitter, Output } from '@angular/core';
import { Block } from '../block/block.component';

export enum BlockType {
  Create = 'create',
  Update = 'update',
  Upload = 'upload',
  Start = 'Start'
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() addBlockEventEmitter: EventEmitter<BlockType> = new EventEmitter();
  blockList: Block[] = [
    { id: 1, name: BlockType.Create, selected: false, params:{num: 0, option: "one", isOnline: false } },
    { id: 2, name: BlockType.Update, selected: false, params:{num: 0, option: "one", isOnline: false } },
    { id: 3, name: BlockType.Upload, selected: false, params:{num: 0, option: "one", isOnline: false } },
  ];

  onClickBlock(blockName: BlockType): void {
    // console.log(blockName);
    this.addBlockEventEmitter.emit(blockName)
  }
}
