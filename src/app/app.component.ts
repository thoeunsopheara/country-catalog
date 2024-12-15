import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryResponse } from './types/response';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'country_catalog';
  countries!: CountryResponse[];
  pagination = {
    start: 0,
    end: 25
  };
  search = new FormControl();
  sort!: string;

  constructor(private appService: AppService) {
    this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(search => this.appService.getAllCountries(search))
    ).subscribe({ next: countries => this.countries = countries });
  }

  ngOnInit(): void {
    this.appService.getAllCountries().subscribe({
      next: countries => this.countries = countries
    });
  }

  sortAscending() {
    this.countries = this.countries.sort((a, b) => a.name.official.localeCompare(b.name.official));
    console.log(this.countries.slice(this.pagination.start, this.pagination.end));
  }

  sortDecending() {
    this.countries = this.countries.sort((a, b) => b.name.official.localeCompare(a.name.official));
  }

  previous() {
    if (this.pagination.start > 0) {
      this.pagination.end -= 25;
      this.pagination.start -= 25;
    }
  }

  next() {
    if (this.pagination.end < this.countries.length) {
      this.pagination.end += 25;
      this.pagination.start += 25;
    }
  }
}
