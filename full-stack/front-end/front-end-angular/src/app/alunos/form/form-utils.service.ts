import { Injectable } from "@angular/core";
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor() {}

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
    return this.geterrorMessageFromField(field, fieldName);
  }

  geterrorMessageFromField(field: UntypedFormControl, fieldName: string) {
    if (field?.hasError('required')) {
      return '*Campo Obrigatório';
    }

    if (field?.hasError('minlength')) {
      const characters = field.errors?.['minlength']?.['requiredLength'] || 2;
      return `Tamanho mínimo de ${characters} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const characters = field.errors?.['maxlength']?.['requiredLength'] || 100;
      return `Tamanho máximo de ${characters} caracteres.`;
    }

    if (field?.value?.length !== undefined) {
      if (fieldName === 'cpf' && field.value.length !== 11) {
        return 'O CPF deve conter exatamente 11 caracteres.';
      }

      if (fieldName === 'cep' && field.value.length !== 8) {
        return 'O CEP deve conter exatamente 8 caracteres.';
      }
    }

    return 'Campo deve conter entre 3 e 100 caracteres.';
  }
}
