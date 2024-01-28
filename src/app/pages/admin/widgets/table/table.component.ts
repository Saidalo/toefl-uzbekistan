import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AdminService} from "../../services/admin.service";
import {NotifierService} from "angular-notifier";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() items: any | undefined;
  @Input() itemType: any = {};
  @Input() additionalActionName: string | undefined;
  @Input() tableName: string | undefined;
  @Output() updateItems = new EventEmitter<any>();
  @Output() additionalAction : EventEmitter<any> = new EventEmitter<any>();
  keys: any;
  notifier: NotifierService;
  id_key: string = 'id';
  format = 'dd/MM/yyyy';
  locale = 'en-US';

  selectedItem: any;
  isAddNew = false;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    notifierService: NotifierService) {
    this.notifier = notifierService; }

  ngOnInit() {
    this.isAddNew = false;
    this.keys = Object.keys(this.items[0]);
    this.keys.forEach((key: any) => {
      if(key.includes('_id')){
        this.id_key = key;
      }
    });
  }

  open(content: any, item: any) {
    if(item === null){
      item = {};
      this.isAddNew = true;
    } else {
      this.isAddNew = false;
    }
    this.selectedItem = { ...item };
    this.modalService.open(content);
  }

  deleteItem(id: any){
    console.log(id);
    this.adminService.deleteAnyItem({tableName: this.tableName, id: id, id_key: this.id_key}).subscribe({
      next: (res: any) => {
        this.notifier.notify('success', 'Item deleted successfully');
        this.items = this.items.filter((item: any) => item.id !== id);
        this.modalService.dismissAll();
      },
      error: error => {
        this.notifier.notify('error', 'Item not deleted');
        console.log(error);
      }
    });
  }

  updateItem(selectedItem: any){
    this.keys.forEach((key: any) => {
      if(selectedItem[key] === null){
        selectedItem[key] = '';
      }
    });
    this.adminService.updateAnyItem({
      tableName: this.tableName,
      item: selectedItem,
      id: selectedItem[this.id_key]
    }).subscribe({
      next: (res: any) => {
        this.notifier.notify('success', 'Item updated successfully');
        this.modalService.dismissAll();
      },
      error: error => {
        this.notifier.notify('error', 'Item not updated');
        console.log(error);
      }
    });
  }

  addItem(selectedItem: any){
    this.keys.forEach((key: any) => {
      if(selectedItem[key] === null){
        selectedItem[key] = '';
      }
    });
    this.adminService.addAnyItem({tableName: this.tableName, item: selectedItem}).subscribe({
      next: (res: any) => {
        this.notifier.notify('success', 'Item created successfully');
        this.modalService.dismissAll();
      },
      error: error => {
        this.notifier.notify('error', 'Item not created');
        console.log(error);
      }
    });
  }

  protected readonly formatDate = formatDate;
}
