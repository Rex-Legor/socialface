import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[sfAutocomplete]',
})
export class AutocompleteDirective implements OnChanges {
  @Input() autocompleteOptions: string[] = [];
  @Input() inputValue = '';

  @Output()
  optionChange = new EventEmitter<string>();

  showAutocompleteDiv = false;

  constructor(private eleRef: ElementRef<HTMLInputElement>) {}

  removeAutocompleteDiv() {
    document.getElementById('sf-autocomplete-div')?.remove();
    this.showAutocompleteDiv = false;
  }

  buildAutocompleteDiv(inputValue: string) {
    const filteredOptions = this.autocompleteOptions.filter((option) =>
      option.toLocaleLowerCase().includes(inputValue.toLowerCase()),
    );

    if (inputValue == '' || filteredOptions.length == 0) {
      this.removeAutocompleteDiv();
      return;
    }

    this.showAutocompleteDiv = true;

    const autocompleteDiv =
      document.getElementById('sf-autocomplete-div') ||
      document.createElement('div');
    autocompleteDiv.id = 'sf-autocomplete-div';
    autocompleteDiv.innerHTML = '';

    const autocompleteList = document.createElement('ul');

    filteredOptions.forEach((option) => {
      const autocompleteItem = document.createElement('li');
      autocompleteItem.innerHTML = option;
      autocompleteItem.addEventListener('click', () => {
        this.optionChange.emit(option);
        // emitting the value will cause ngOnChanges to trigger so we wait a moment for removing the div
        setTimeout(() => {
          this.removeAutocompleteDiv();
        }, 100);
      });
      autocompleteList.appendChild(autocompleteItem);
    });

    autocompleteDiv.className = 'sf-autocomplete__list';
    autocompleteDiv.appendChild(autocompleteList);
    this.eleRef.nativeElement.parentElement?.appendChild(autocompleteDiv);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const inputValue = changes['inputValue'].currentValue;
    this.buildAutocompleteDiv(inputValue);
  }
}
