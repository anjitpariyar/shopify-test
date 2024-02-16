import { select } from '../helpers/_dom';

export default class MainHeader extends HTMLElement {
  constructor() {
    super();

    const $dropdownMenus = select('[data-dropdown-menu', this);
    const $closeMenu = select('[data-close-button', this);
    const $body = select('[data-body]');
    $dropdownMenus.listen('mouseenter', ({ $node }) => { 
      $node.setAttribute("open", "true");
    });
    $dropdownMenus.listen('mouseleave', ({ $node }) => { 
      $node.removeAttribute("open");
    });
    $closeMenu.listen('click', ({ $node }) => { 
      $body.modifyClass('remove', 'overflow-hidden-tablet');
    });
  }
} 