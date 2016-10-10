/**
 * Soho Modal Dialog Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery modal dialog control.
 *
 * Only the public interface consumable by the Angular
 * Soho Component is included in this file.
 *
 * The corresponding Soho control can be found in js\modal.js.
 */

/**
 * Controls when the modal is opened, either:
 *
 * immediate - when 'modal' is called.
 * click - manual? # Not really sure what this option is.
 */
type SohoModalOptionsTriggerType = 'click' | 'immediate';

/**
 * Soho Modal Dialog configuration options
 *
 * See the jQuery control for the defaults.
 */
interface SohoModalOptions {
  /** The string used as the title for the dialog - not defaulted. */
  title?: string;

  // The content, can be 'html' or a selector.
  content?: JQuery | string;

  // Style to apply to the modal.
  cssClass?: string;

  /** The buttons to create. */
  buttons?: SohoModalButton[];

  /* Is this dialog searchable? */
  searchable?: boolean;

  /** When to close/open? */
  trigger?: SohoModalOptionsTriggerType;

  /** Is this an alert daialog? */
  isAlert?: boolean;

  /** Auto focus? */
  autoFocus?: boolean;

  /** Identifier for the dialog. */
  id?: string;

  // Extra frame height.
  frameHeight?: number;
}

interface SohoModalButton {
  /** Text for the button. */
  text: string;

  /** Validate */
  validate?: boolean;

  /** Is this the default button? */
  isDefault?: boolean;

  /** Icon for the button. */
  icon?: string;

  /** Click handler. */
  click?: SohoModalButtonClickFunction;
}

/**
 * Type of function required when handling the click.
 */
type SohoModalButtonClickFunction = (
  /** The event object. */
  e: any,

  /** The jQuery control.  */
  model: ModalStatic) => void;

/**
 * This interface represents the Api exposed by the
 * soho control.
 *
 * Only public members are exposed on this interface.
 */
interface ModalStatic {
  /** Existing configuration settings. */
  settings: SohoModalOptions;

  /**
   * A jQuery selector to the element in the DOM where the
   * modal dialog is placed after openning.
   */
  element: JQuery;

  /**
   * Close the modal dialog.
   *
   * @param destroy - destroy the html elements.
   */
  close(destroy?: boolean): void;

  /**
   * Releases all resources managed by the modal.
   */
  destroy(): void;
}

/**
 * Integration with jQuery
 */
interface JQuery {
  modal(options: SohoModalOptions): JQuery;
}

interface JQueryStatic {
  modal: ModalStatic;
}