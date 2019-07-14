import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {Router} from '@angular/router';
import {SendBooleanService} from '../services/send-boolean.service';
import {Subscription} from 'rxjs';
import {Item} from '../shared/item';
import {SendItemService} from '../services/send-item.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public showButtonEdit: boolean;
  public hideImage: boolean;
  public item: Item;

  private sendBooleanSubscription: Subscription;
  private sendItemSubscription: Subscription;

  constructor(public dialog: MatDialog,
              private sendBooleanService: SendBooleanService,
              private sendItemService: SendItemService,
              private router: Router) {
    this.showButtonEdit = false;
    this.hideImage = true;
    this.sendBooleanSubscription = new Subscription();
    this.sendItemSubscription = new Subscription();
  }

  ngOnInit() {
    this._showButtonEdit();
    this.itemListener();
  }

  ngOnDestroy() {
    this.sendBooleanSubscription.unsubscribe();
    this.sendItemSubscription.unsubscribe();
  }

  private _showButtonEdit(): void {
    this.sendBooleanSubscription = this.sendBooleanService.onLoadBoolean()
      .subscribe((state: boolean) => {
        this.showButtonEdit = state;
      });
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }

  public itemListener(): void {
    this.sendItemSubscription = this.sendItemService.onLoadItem()
      .subscribe((item: Item) => {
        if (item) {
          this.item = item;
        }
      });
  }

}
