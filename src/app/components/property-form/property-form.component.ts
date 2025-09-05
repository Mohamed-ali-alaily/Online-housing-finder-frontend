import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/app/models/property.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  property: Property = { title: '', price: 0, location: '', description: '' };
  id?: string; // لحفظ id للـ property لو موجود
  successMessage: string = ''; // رسالة نجاح

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.propertyService.getPropertyById(this.id).subscribe({
        next: (data: Property) => {
          this.property = data; // نملأ الفورم بالبيانات الحالية
        },
        error: (err: any) => console.error('Error fetching property:', err)
      });
    }
  }

  submit(): void {
    if (this.id) {
      // تعديل property موجود
      this.propertyService.updateProperty(this.id, this.property).subscribe({
        next: (updatedProperty) => {
          this.successMessage = 'Property updated successfully!';
          this.clearForm();
        },
        error: (err: any) => console.error('Error updating property:', err)
      });
    } else {
      // إضافة property جديدة
      this.propertyService.createProperty(this.property).subscribe({
        next: (newProperty) => {
          this.successMessage = 'Property added successfully!';
          this.clearForm();
        },
        error: (err: any) => console.error('Error adding property:', err)
      });
    }
  }

  clearForm() {
    this.property = { title: '', price: 0, location: '', description: '' };
    this.id = undefined;
  }
}
