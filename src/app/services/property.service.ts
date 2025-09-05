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

  getPropertyById(id: string) {
  return this.http.get<Property>(`${this.apiUrl}/${id}`);
}
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

updateProperty(id: string, property: Property) {
  return this.http.put<Property>(`${this.apiUrl}/${id}`, property);
}

createProperty(property: Property) {
  return this.http.post<Property>(this.apiUrl, property);
}


  deleteProperty(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
