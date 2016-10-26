import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  // ViewChild
} from '@angular/core';

/**
 * Internal component to support the tab list items
 */
@Component({
  selector: 'li[soho-tab]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabComponent {
  @HostBinding('class.tab') get isTab() { return true; };

  @HostBinding('class.dismissible')   @Input() dismissible:  boolean = false;
  @HostBinding('class.is-selected')   @Input() selected:     boolean = false;
  @HostBinding('class.is-disabled')   @Input() disabled:     boolean = false;
  @HostBinding('class.hidden')        @Input() hidden:       boolean = false;
  @HostBinding('class.has-popupmenu') @Input() hasPopupMenu: boolean = false;
}

/**
 * Internal component to support the tab title
 */
@Component({
  selector: 'a[soho-tab-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabTitleComponent {
  @HostBinding('attr.href') get hrefAttr() { return '#' + this.tabId; };
  @Input() tabId: string;
}

/**
 * Internal component to support the tab with a 'count' on it.
 */
@Component({
  selector: 'span[soho-tab-count]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabCountComponent {
  @HostBinding('class.count') get isTabCount() { return true; };
}

/**
 * Internal component to support menu/dropdown tabs
 */
@Component({
  selector: 'li[soho-tab-separator]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabSeparatorComponent {
  @HostBinding('class.separator') get isSeparator() { return true; };
}

/**
 * Internal component to support tab panel content.
 */
@Component({
  selector: 'div[soho-tab-panel]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabPanelComponent {
  @HostBinding('class.tab-panel') get isTabPanel() { return true; };
  @HostBinding('attr.id')        @Input() tabId: string;
  @HostBinding('attr.contained') @Input() contained: string;
}

/**
 * Main tabset header component
 */
@Component({
  selector: 'ul[soho-tab-list]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabsListComponent {
  @HostBinding('class.tab-list') get isTabList() { return true; };
}

/**
 * The main soho-tabs component
 */
@Component({
  selector: 'div[soho-tabs]', // tslint:disable-line
  templateUrl: './soho-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTabsComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.tab-container') get isTabContainer() { return true; };
  @HostBinding('class.vertical')      get isVertical()     { return this.vertical; };
  @HostBinding('class.horizonal')     get isHorizontal()   { return this.horizontal; };
  @HostBinding('class.module-tabs')   get isModuleTabs()   { return this.moduleTabs; };
  @HostBinding('class.header-tabs')   get isHeaderTabs()   { return this.headerTabs; };
  @HostBinding('attr.alternate')      get isAlternate()    { return this.alternate; };

  // ------------------------------------------------------------------------
  // @Inputs
  // ------------------------------------------------------------------------

  /**
   * set to true to show a secondary style for the tabs
   * @type {boolean}
   */
  @Input() horizontal = false;

  /**
   * set to true to show a secondary style for the tabs
   * @type {boolean}
   */
  @Input() alternate = false;

  /**
   * set to true to display the tabs vertically to the left of the tab-panel
   * @type {boolean}
   */
  @Input() vertical = false;

  /**
   * set to true to display the tabs as module tabs
   * @type {boolean}
   */
  @Input() moduleTabs = false;

  /**
   * set to true to display the tabs as header tabs
   * @type {boolean}
   */
  @Input() headerTabs = false;

  @Input() set tabsOptions(tabsOptions: SohoTabsOptions) {
    this._tabsOptions = tabsOptions;
    if (this.jQueryElement) {
      this.tabs.settings = tabsOptions;
      this.updated();
    }
  }
  /**
   * If set to true, creates a button at the end of the tab list that can be used to add an empty tab and panel.
   * @type {boolean}
   */
  @Input() set addTabButton(addTabButton: boolean) {
    this._tabsOptions.addTabButton = addTabButton;
    if (this.jQueryElement) {
      this.tabs.settings.addTabButton = addTabButton;
      this.updated();
    }
  }

  /**
   * if defined as a function, will be used in-place of the default Tab Adding method
   * TODO: how to handle call back function?
   */
  @Input() set addTabButtonCallback(addTabButtonCallback: Function) {
    this._tabsOptions.addTabButtonCallback = addTabButtonCallback;
    if (this.jQueryElement) {
      this.tabs.settings.addTabButtonCallback = addTabButtonCallback;
      this.updated();
    }
  }

  /**
   * Defines a separate element to be used for containing the tab panels.  Defaults to the Tab Container itself
   */
  @Input() set containerElement(containerElement: string) {
    this._tabsOptions.containerElement = containerElement;
    if (this.jQueryElement) {
      this.tabs.settings.containerElement = containerElement;
      this.updated();
    }
  }

  /**
   * If true, will change the selected tab on invocation based on the URL that exists after the hash
   * @type {boolean}
   */
  @Input() set changeTabOnHashChange(changeTabOnHashChange: boolean) {
    this._tabsOptions.changeTabOnHashChange = changeTabOnHashChange;
    if (this.jQueryElement) {
      this.tabs.settings.changeTabOnHashChange = changeTabOnHashChange;
      this.updated();
    }
  }

  /**
   * If defined as a function, provides an external method for adjusting the current page hash used by these tabs
   * TODO: how to handle call back function?
   */
  @Input() set hashChangeCallback(hashChangeCallback: Function) {
    this._tabsOptions.hashChangeCallback = hashChangeCallback;
    if (this.jQueryElement) {
      this.tabs.settings.hashChangeCallback = hashChangeCallback;
      this.updated();
    }
  }

  /**
   * set to true to allow tab count markup <span class=tabcount>#</span>.
   * @type {boolean}
   */
  @Input() set tabCounts(tabCounts: boolean) {
    this._tabsOptions.tabCounts = tabCounts;
    if (this.jQueryElement) {
      this.tabs.settings.tabCounts = tabCounts;
      this.updated();
    }
  }

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  /**
   * The beforeactivate event is fired whenever a tab is selected giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeactivate = new EventEmitter<Object>();

  /**
   * The activated event is fired whenever a tab is selected (or "activated");
   * @type {EventEmitter<Object>}
   */
  @Output() activated = new EventEmitter<Object>();

  /**
   * The afteractivate event is fired after the has been activated.
   * @type {EventEmitter<Object>}
   */
  @Output() afteractivate = new EventEmitter<Object>();

  /**
   * fired when a tab closes
   * @type {EventEmitter<Object>}
   */
  @Output() close = new EventEmitter<Object>();

  /**
   * fired after a tab closes
   * @type {EventEmitter<Object>}
   */
  @Output() afterClose = new EventEmitter<Object>();

  /**
   * fire when a new tab is added.
   * @type {EventEmitter<Object>}
   */
  @Output() tabAdded = new EventEmitter<Object>();

  // ------------------------------------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: any;

  // Reference to the soho tabs control api.
  private tabs: SohoTabsStatic;

  // An internal tabsOptions object that gets updated by using
  // the component's Inputs()
  private _tabsOptions: SohoTabsOptions = <SohoTabsOptions> {};

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    // assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);

    // bind to jquery events and emit as angular events
    this.jQueryElement.bind('beforeactivate', ((event: SohoTabsEvent, tab) => {this.beforeactivate.emit(tab[0]); }));
    this.jQueryElement.bind('activated', ((event: SohoTabsEvent, tab) => {this.activated.emit(tab[0]); }));
    this.jQueryElement.bind('afteractivate', ((event: SohoTabsEvent, tab) => {this.afteractivate.emit(tab[0]); }));
    this.jQueryElement.bind('close', ((event: SohoTabsEvent, tab) => {this.close.emit(tab[0]); }));
    this.jQueryElement.bind('afterclose', ((event: SohoTabsEvent, tab) => {this.afterClose.emit(tab[0]); }));
    this.jQueryElement.bind('tab-added', ((event: SohoTabsEvent, tab) => {this.tabAdded.emit(tab[0]); }));

    // initialize the tabs plugin
    this.jQueryElement.tabs(this._tabsOptions);
    this.tabs = this.jQueryElement.data('tabs');
  }

  ngOnDestroy() {
    this.tabs.destroy();
  }

  /**
   * Causes the tabs component view to be rebuilt
   */
  public updated(): void {
    this.tabs.updated();
  }

  /**
   * Adds a new tab into the tab component
   * @param tabId The tabId of the tab to be added
   * @param options ?
   * @param atIndex The index location where the tab is to be added.
   */
  public add(tabId: string, options: any, atIndex: number): void {
    this.tabs.add(tabId, options, atIndex);
  }

  /**
   * Removes a tab
   * @param tabId The tabId of the tab to be removed.
   */
  remove(tabId: string): void {
    this.tabs.remove(tabId);
  }

  /**
   * Hides a tab for the given tabId
   * @param tabId The id of the tab to hide
   */
  hide(tabId: string): void {
    this.tabs.hide(tabId);
  }

  show(tabId: string) {
    this.tabs.hide(tabId);
  }

  disableTab(tabId: number) {
    this.tabs.disableTab(tabId);
  }

  enableTab(tabId: number) {
    this.tabs.enableTab(tabId);
  }

  rename(tabId: string, name: string): void {
    this.tabs.rename(tabId, name);
  }

  /**
   * Gets a tab given either an event or a tabId
   * @param event And event from a tab that will allow tab retrieval
   * @param tabId The tabId of the tab to be retrieved.
   */
  getTab(event: SohoTabsEvent, tabId: string): any {
    // TODO: getTab seems to return a jQuery object, what to return instead?
    return this.tabs.getTab(event, tabId);
  }

  /**
   * Return the the currenlty active/selected tab.
   * @returns {JQuery} A JQuery object of the active tab element.
   */
  getActiveTab(): JQuery {
    // TODO: getActiveTab seems to return a jQuery object, what to return instead?
    return this.tabs.getActiveTab();
  }

  /**
   * Returns the visible tabs
   * @returns {Array<JQuery>} An array of JQuery objects of the visible tab elements
   */
  getVisibleTabs(): Array<JQuery> {
    // TODO: getVisibleTabs seems to return a jQuery array, what to return instead?
    return this.tabs.getVisibleTabs();
  }

  /**
   * Returns the overflow tabs
   * @returns {Array<JQuery>} An array of JQuery objects of the overflow tab elements
   */
  getOverflowTabs(): Array<JQuery> {
    // TODO: getVisibleTabs seems to return a jQuery array, what to return instead?
   return this.tabs.getOverflowTabs();
  }

  /**
   * Selects the tab given an href
   * @param href an href used to find the tab to select
   */
  select(href: string): void {
    this.tabs.select(href);
  }

  /**
   * Disables the entire tab component
   */
  disable(): void {
    this.tabs.disable();
  }

  /**
   * enables the entire tab component
   */
  enable(): void {
    this.tabs.enable();
  }
}
