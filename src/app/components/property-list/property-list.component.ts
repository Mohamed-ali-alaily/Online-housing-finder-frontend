// src/app/components/property-list/property-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.loadProperties();
  }
  

  loadProperties() {
    this.propertyService.getProperties().subscribe({
      next: (res) => this.properties = res,
      error: (err) => console.error(err)
    });
  }

  editProperty(id: string) {
    this.router.navigate(['/add', id]); // goes to AddPropertyComponent in edit mode
  }


  deleteProperty(id: string) {
    if (confirm("Are you sure you want to delete this property?")) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => this.loadProperties(),
        error: (err) => console.error(err)
      });
    }
  }
}
