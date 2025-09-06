import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html'
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  error = '';

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe({
      next: data => this.properties = data,
      error: err => this.error = 'Failed to load properties'
    });
  }

  editProperty(id: string) {
    this.router.navigate(['/add', id]);
  }

  deleteProperty(id: string) {
    if (!confirm('Are you sure you want to delete this property?')) return;

    this.propertyService.deleteProperty(id).subscribe({
      next: () => this.loadProperties(),
      error: err => this.error = 'Failed to delete property'
    });
  }
}
