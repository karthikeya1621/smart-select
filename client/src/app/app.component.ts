import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { ApiResponse } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Smart Select';
  countries = []

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.fetchCountries()
  }

  addLocationHandler = async (loc: string) => {
    const body = new HttpParams().set('name',loc)
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const result = await this.http.post('http://localhost:3000/add', body.toString(), {headers}).toPromise()
    await this.fetchCountries()
    return result;
  }

  async fetchCountries() {
    try {
      const result = await this.http
        .get<ApiResponse>('http://localhost:3000/listcountries')
        .toPromise();
      if (result.message === 'success') {
        this.countries = result.data;
      }
    } catch (error) {
      console.log('Failed fetching countries list!');
    }
  }
}

