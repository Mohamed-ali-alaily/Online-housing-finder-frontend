// src/app/services/property.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:5000/api/properties';

  constructor(private http: HttpClient) {}

  // ✅ Get all properties
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  // ✅ Get property by ID
  getPropertyById(id: string) {
  return this.http.get<Property>(`${this.apiUrl}/${id}`);
}

  // ✅ Add new property
  addProperty(property: FormData): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  // ✅ Update property
  updateProperty(id: string, property: FormData): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, property);
  }

  // ✅ Delete property
  deleteProperty(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
