import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { searchmovies } from '../model/search.js';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css',
})
export class SearchMovieComponent {
  searchForm: FormGroup;
  currentYear: number;

  constructor(private fb: FormBuilder) {
    this.currentYear = new Date().getFullYear();

    this.searchForm = this.fb.group({
      identifierGroup: this.fb.group(
        {
          id: [''],
          titre: [''],
        },
        { validator: this.isRequiredValidator('titre', 'id') }
      ),
      type: ['serie'],
      anneedesortie: [
        '',
        [Validators.required, this.rangeDateValidator(1900, this.currentYear)],
      ],
      fiche: [''],
    });

    // Set default values
    this.searchForm.patchValue({
      category: 'courte',
    });

    // Subscribe to value changes
    this.searchForm.valueChanges.subscribe((value) =>
      console.log('Form value changes:', value)
    );
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const identifierGroup = this.searchForm.get('identifierGroup');

      const identifierValue = identifierGroup?.get('id')?.value;
      const titleValue = identifierGroup?.get('titre')?.value;

      const formValue: searchmovies = {
        id:
          identifierValue !== null && identifierValue !== undefined
            ? identifierValue
            : '',
        titre:
          titleValue !== null && titleValue !== undefined ? titleValue : '',
        type: this.searchForm.get('type')?.value || '',
        anneedesortie: this.searchForm.get('anneedesortie')?.value || null,
        fiche: this.searchForm.get('fiche')?.value || '',
      };

      console.log('Form submitted:', formValue);
    }
  }

  isRequiredValidator(control1: string, control2: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const value1 = group.get(control1)?.value;
      const value2 = group.get(control2)?.value;

      if (!value1 && !value2) {
        return { isRequired: true };
      }

      return {};
    };
  }

  rangeDateValidator(minYear: number, maxYear: number) {
    return (control: any): { [key: string]: any } => {
      const year = control.value;
      if (isNaN(year) || year < minYear || year > maxYear) {
        return { min: { min: minYear, max: maxYear } };
      }

      return {};
    };
  }
}
