import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-internal-layout',
  imports: [Sidebar, RouterModule, RouterOutlet],
  templateUrl: './internal-layout.html',
  styleUrl: './internal-layout.scss',
})
export class InternalLayout {

}
