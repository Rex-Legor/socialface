import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Main presentation component that renders all the routes dynamically.
 *
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
