import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent {
  @Input()
  public url!: String;

  @Input()
  public alt: string = '';

  public hasLoaded: Boolean = false;
  ngOnInit(): void {
    if (!this.url) throw new Error('Url Not Defined!');
  }
  public onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }
}
