import { Injectable } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  geterrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;

    return this.geterrorMessageFromField(field);
  }

  geterrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo Obrigatório';
    }

    if (field?.hasError('minLenght')) {
      const characters = field.errors
        ? field.errors['minlenght']['requiredlenght']
        : 2;
      return `Tamanho minimo de ${characters} caracteres.`;
    }

    if (field?.hasError('maxLenght')) {
      const characters = field.errors
        ? field.errors['maxlenght']['requiredlenght']
        : 100;
      return `Tamanho maximo de ${characters} caracteres.`;
    }

    return 'Campo de conter de 3 a 100 caracteres';
  }
}
