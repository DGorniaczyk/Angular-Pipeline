import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlockType } from '../sidebar/sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';

export interface Block {
  id: number;
  name: BlockType;
  selected: boolean;
  params: {
    num: number;
    option: string;
    isOnline: boolean;
  };
}

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent {
  @Output() moveEventEmitter: EventEmitter<Block> = new EventEmitter();
  @Output() connectEventEmitter: EventEmitter<Block> = new EventEmitter();

  @Input() blockConfig!: Block;
  @Input() dragDisabled: boolean = false;
  blockTypes = BlockType;

  constructor(public dialog: MatDialog) {}

  handleMovedEvent(): void {
    this.moveEventEmitter.emit(this.blockConfig);
  }

  handleConnectEvent(): void {
    this.connectEventEmitter.emit(this.blockConfig);
  }

  onOpenConfig(): void {
    this.dialog.open(ConfigDialogComponent, {
      data: this.blockConfig
    });
  }
}
