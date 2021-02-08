import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Country } from '../../models';

@Component({
  selector: 'app-smart-select',
  templateUrl: './smart-select.component.html',
  styleUrls: ['./smart-select.component.scss'],
})
export class SmartSelectComponent implements OnChanges {
  selectedLocation: string = null;
  isOpen = false;
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  filteredCount = 0;
  inputElem: HTMLInputElement;
  pageNo = 1;
  timer = null;
  search = '';

  @Input('privilege') privilege: boolean;
  @Input('noOfItems') noOfItems: number;
  @Input('addAndSelectHandler') addAndSelectHandler: any;
  @Input('list') list: any[];

  constructor(private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.list) {
      if(!changes.list.firstChange) {
        this.countries = changes.list.currentValue as Country[]
        this.applyFilter()
      }
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.inputElem = (this.elRef.nativeElement as HTMLElement).querySelector(
        '.search-input'
      );
      this.inputElem.focus();
    } else {
      this.search = '';
      this.pageNo = 1;
      this.applyFilter();
    }
  }

  inputHandle(event: Event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.applyFilter();
    }, 300);
  }

  applyFilter() {
    let filtered: Country[] = [];
    if (this.search === '') {
      filtered = [...this.countries];
    } else {
      this.pageNo = 1;
      filtered = this.countries.filter((country) =>
        country.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
    this.filteredCount = filtered.length;
    this.filteredCountries = [...filtered].slice(
      this.noOfItems * (this.pageNo - 1),
      this.pageNo * this.noOfItems
    );
  }

  getFormatted(name: string) {
    if (this.search.length) {
      return name.replace(new RegExp(`${this.search}`, 'gi'), (x) => {
        return `<span class="highlight">${x}</span>`;
      });
    }
    return name;
  }

  selectCountry(name: string) {
    if (name !== this.selectedLocation) {
      this.selectedLocation = name;
      this.toggleDropdown();
    }
  }

  nextPage() {
    this.pageNo = this.pageNo + 1;
    this.applyFilter();
  }

  getMoreCount() {
    return this.filteredCount % (this.pageNo * this.noOfItems);
  }

  async addNewLocation(newLoc: string) {
    if (this.privilege) {
      const matches = this.countries.filter(
        (country) => country.name.toLowerCase() === newLoc.toLowerCase()
      );
      if (matches.length) {
        console.log('Location already exists!');
      } else {
        let charArr = newLoc.split('');
        charArr[0] = charArr[0].toUpperCase();
        let newLocation = [...charArr].join('');
        const result = await this.addAndSelectHandler(newLocation);
        this.selectCountry(newLocation);
      }
    } else {
      console.log('You do not have enough permissions!');
    }
  }
}
