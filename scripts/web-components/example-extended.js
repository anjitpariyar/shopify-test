import { select } from '../helpers/_dom';
import ExampleComponent from './example-component';

export default class ExampleExtended extends ExampleComponent {
  constructor() {
    super();
    this.colors = select('[data-color]', this);

    this.buttons.listen('click', ({ index }) => {
      this.colors.modifyClass('remove', 'active');
      this.colors[index].modifyClass('add', 'active');
    });
  }
}
