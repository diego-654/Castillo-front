import { Component } from '@angular/core';
import { MenuItem } from './sidebar.interfaces';
import { SIDEBAR_ITEMS } from './sidebar.data';
import { SidebarItem } from '../sidebar-item/sidebar-item';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarItem],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  menuItems: MenuItem[] = SIDEBAR_ITEMS;


}
