import { select } from "../helpers/_dom";

export default class ToggleSearch extends HTMLElement {
  constructor() {
    super();
    const toggleButton = select("[data-toggle-search]");
    const searchBtn = select("[data-search-btn]");
    const searchDialouge = select("[data-search-form]");
    const searchInModal = select("[data-search-input]");
    const modalSearchInput = select("[data-header-search-modal-input]");

    toggleButton.listen("click", function () {
      searchBtn.setAttribute("open", "true");
      searchDialouge.setAttribute("results", "false");
      searchInModal.focus();

      let textLength = searchInModal.value.length;

      if (searchInModal.setSelectionRange) {
        searchInModal.setSelectionRange(textLength, textLength);
      } else if (searchInModal.createTextRange) {
        let range = searchInModal.createTextRange();
        range.collapse(true);
        range.moveEnd("character", textLength);
        range.moveStart("character", textLength);
        range.select();
      }
    });

    searchBtn.listen('click', () => {
      setTimeout(() => {
        modalSearchInput.focus(); 
      }, 300);
    });

  }
}