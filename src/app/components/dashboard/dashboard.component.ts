import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  properties: Property[] = [];
  property: Property = {} as Property;
  isEdit: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private propertyService: PropertyService,
    public authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe(data => this.properties = data);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    Object.keys(this.property).forEach(key => {
      formData.append(key, (this.property as any)[key]);
    });
    if (this.selectedFile) formData.append('image', this.selectedFile);

    if (this.isEdit) {
      this.propertyService.updateProperty(this.property._id!, formData).subscribe(() => {
        this.loadProperties();
        this.resetForm();
      });
    } else {
      this.propertyService.addProperty(formData).subscribe(() => {
        this.loadProperties();
        this.resetForm();
      });
    }
  }

  editProperty(p: Property) {
    this.property = { ...p };
    this.isEdit = true;
  }

  deleteProperty(id: string) {
    if (!confirm('Are you sure you want to delete this property?')) return;
    this.propertyService.deleteProperty(id).subscribe(() => this.loadProperties());
  }

  resetForm() {
    this.property = {} as Property;
    this.isEdit = false;
    this.selectedFile = null;
  }

  get isAdmin(): boolean {
    return this.authService.userRole === 'admin';
  }
}
