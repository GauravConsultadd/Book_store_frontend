import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,MenuComponent,RouterModule,SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
}
