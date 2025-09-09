// src/app/components/add-property/add-property.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  property: Property = { title: '', location: '', description: '', price: 0, phone: '' };
  isEdit = false;
  propertyId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    
    if (this.propertyId) {
      this.isEdit = true;
      this.propertyService.getPropertyById(this.propertyId).subscribe({
        next: (res) => {
          console.log('✅ Loaded property for edit:', res);
          this.property = res;
        },
        error: (err) => console.error('❌ Error loading property:', err)
      });
    }
  }

onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}


  submit(): void {
    console.log('Form submitted:', this.property);

    const formData = new FormData();
    formData.append('title', this.property.title);
    formData.append('location', this.property.location);
    formData.append('description', this.property.description);
    formData.append('price', this.property.price.toString());
    formData.append('phone', this.property.phone);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEdit && this.propertyId) {
      this.propertyService.updateProperty(this.propertyId, formData).subscribe({
        next: () => {
          console.log('✅ Property updated!');
          this.router.navigate(['/properties']);
        },
        error: (err) => console.error('❌ Error updating property:', err)
      });
    } else {
      this.propertyService.addProperty(formData).subscribe({
        next: () => {
          console.log('✅ Property added!');
          this.router.navigate(['/properties']);
        },
        error: (err) => console.error('❌ Error adding property:', err)
      });
    }
  }
}
