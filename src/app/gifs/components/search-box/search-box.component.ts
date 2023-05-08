import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs.."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
//El #txtTagInput es un referente local, es decir es como una variable que localmente escuchara a donde se asgine en el htmol del componente local
export class SearchBoxComponent {
  //Con viewchild vemos la referencia local y se la podemos aplicar a una propiedad para manipularla mejor
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
