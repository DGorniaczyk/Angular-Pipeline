import { Component } from '@angular/core';
import { Block } from '../block/block.component';
import { BlockType } from '../sidebar/sidebar.component';
import * as LeaderLine from 'leader-line-new';

interface Connection {
  id: number;
  sourceId: number;
  targetId: number;
  connectLine: LeaderLine;
}

enum ConnectionKeyType {
  Source = 'sourceId',
  Target = 'targetId',
}

@Component({
  selector: 'app-inner-board',
  templateUrl: './inner-board.component.html',
  styleUrls: ['./inner-board.component.scss'],
})
export class InnerBoardComponent {
  currentBlocks: Block[] = [{ id: 1, name: BlockType.Start, selected: false, params:{num: 0, option: "one", isOnline: false }}];
  currentConnections: Connection[] = [];
  selectedBlock: Block | null = null;

  findLastId(listToSearch: Block[] | Connection[]): number {
    let maxNumber: number = 0;
    listToSearch.forEach((item: Block | Connection) => {
      if (maxNumber < item.id) {
        maxNumber = item.id;
      }
    });
    return maxNumber;
  }

  addBlock(blockName: BlockType): void {
    this.currentBlocks.push({
      id: this.findLastId(this.currentBlocks) + 1,
      name: blockName,
      selected: false,
      params:{num: 0, option: "one", isOnline: false }
    });
  }

  connect(currentBlock: Block): void {
    //Sprawdzenie czy jeden z bloków został już wybrany
    if (this.selectedBlock === null) {
      this.selectedBlock = currentBlock;
      currentBlock.selected = true;
    }
    //Sprawdzenie czy blok klikany jest już blokiem wybranym
    else if (this.selectedBlock === currentBlock) {
      this.selectedBlock = null;
      currentBlock.selected = false;
    }
    //Sprawdzenie czy blok klikany jest blokiem startowym
    else if (currentBlock.name === BlockType.Start) {
      this.selectedBlock.selected = false;
      this.selectedBlock = null;
    }
    //Sprawdzenie czy blok klikany ma już połączenie
    else if (
      (this.getConnectedLength(this.selectedBlock.id, ConnectionKeyType.Source) === 1 && this.getConnectedLength(currentBlock.id, ConnectionKeyType.Target) === 1) || (this.getConnectedLength(this.selectedBlock.id, ConnectionKeyType.Target) === 1 && this.getConnectedLength(currentBlock.id, ConnectionKeyType.Source) === 1)
    ) {
      this.selectedBlock.selected = false;
      this.selectedBlock = null;
    } else if (
      this.getConnectedLength(
        this.selectedBlock.id,
        ConnectionKeyType.Target
      ) > 2
    ) {
      this.selectedBlock.selected = false;
      this.selectedBlock = null;
    }  
    //Stworzenie Linii
    else {
      let newLine: LeaderLine | null = this.createLine(
        this.selectedBlock.id,
        currentBlock.id
      );
      if (newLine !== null) {
        this.connectPush(this.selectedBlock.id, currentBlock.id, newLine);
      }
      this.selectedBlock.selected = false;
      this.selectedBlock = null;
    }
  }

  isBlockConnected(id: number, key: ConnectionKeyType): boolean {
    let result: Connection | undefined = this.currentConnections.find(
      (connection: Connection) => id === connection[key]
    );
    if (result !== undefined) {
      return true;
    }
    return false;
  }

  getConnectedLength(id: number, key: ConnectionKeyType): number {
    return this.currentConnections.filter(
      (connection: Connection) => id === connection[key]
    ).length;
  }

  createLine(startId: number, endId: number): LeaderLine | null {
    let startElement: HTMLElement | null = document.getElementById(
      startId.toString()
    );
    let endElement: HTMLElement | null = document.getElementById(
      endId.toString()
    );

    if (startElement !== null && endElement !== null) {
      let startBlock: Block | undefined = this.currentBlocks.find(
        (block: Block) => block.id === 1
      );
      if (startBlock !== undefined) {
        let newLine = new LeaderLine(startElement, endElement);
        return newLine;
      }
    }
    return null;
  }

  connectPush(source: number, target: number, line: LeaderLine): void {
    this.currentConnections.push({
      id: this.findLastId(this.currentConnections) + 1,
      sourceId: source,
      targetId: target,
      connectLine: line,
    });
  }

  moveEvent(block: Block): void {
    let connections: Connection[] = this.currentConnections.filter(
      (connection: Connection) =>
        connection.sourceId === block.id || connection.targetId === block.id
    );
    connections.forEach((connection: Connection) => {
      connection.connectLine.remove();
      let newLine: LeaderLine | null = this.createLine(
        connection.sourceId,
        connection.targetId
      );
      if (newLine !== null) {
        connection.connectLine = newLine;
      }
    });
  }
}
