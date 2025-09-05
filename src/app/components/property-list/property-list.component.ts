import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.getAllProperties();
  }

  getAllProperties(): void {
    this.propertyService.getProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  deleteProperty(id?: string): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p._id !== id);
        },
        error: (err) => {
          this.error = err;
        }
      });
    }
  }
}
