import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-tabset-width',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs.component.html',
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class TabsetWidthComponent {
}
