import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html'
})
export class AddPropertyComponent implements OnInit {
  property: Property = { title: '', description: '', price: 0, location: '' };
  isEdit = false;
  error = '';

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.propertyService.getProperty(id).subscribe({
        next: prop => this.property = prop,
        error: err => this.error = 'Failed to load property'
      });
    }
  }

  submit() {
    if (this.isEdit) {
      this.propertyService.updateProperty(this.property._id!, this.property).subscribe({
        next: () => this.router.navigate(['/properties']),
        error: err => this.error = 'Failed to update property'
      });
    } else {
      this.propertyService.addProperty(this.property).subscribe({
        next: () => this.router.navigate(['/properties']),
        error: err => this.error = 'Failed to add property'
      });
    }
  }
}
