import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

/**
 * Auto complete directive for inputs.
 * @author Ricardo Legorreta Mendoza
 */
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

  /**
   * Removes the autocomplete options content from the DOM.
   */
  removeAutocompleteDiv() {
    document.getElementById('sf-autocomplete-div')?.remove();
    this.showAutocompleteDiv = false;
  }

  /**
   * Creates and displays a list of autocomplete options below the <input>.
   * If there is no inputValue or there are not matches there won't render a list.
   * @param inputValue - <input> value used to filter autocomplete options.
   */
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

  /**
   * Listens for value changes on the <input> and updates the autocomplete options accordingly.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const inputValue = changes['inputValue'].currentValue;
    this.buildAutocompleteDiv(inputValue);
  }
}
