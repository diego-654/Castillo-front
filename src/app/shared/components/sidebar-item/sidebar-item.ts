import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from '../sidebar/sidebar.interfaces';

@Component({
  selector: 'app-sidebar-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.scss',
})
export class SidebarItem {

  private router = inject(Router);

  item = input.required<MenuItem>();


  handleItemClick(item: MenuItem) {
    if (item.url) {
      this.router.navigate([item.url]);
    }
  }

  isActive(item: MenuItem): boolean {
    if (item.url === this.router.url) {
      return true;
    }

    if (item.url && this.router.url.startsWith(item.url)) {
      return true;
    }

    return false;

  }

}
