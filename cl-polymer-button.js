import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";

import { clDefaultTemplate } from "cl-polymer-element-helpers/cl-default-template.js";
import { clDefaultStyle } from "cl-polymer-element-helpers/cl-default-style.js";

import { property, observe, computed, customElement } from "@polymer/decorators";

import { __decorate, query } from "cl-polymer-element-helpers/cl-helpers.js";

import { dom } from "@polymer/polymer/lib/legacy/polymer.dom.js";

import "@polymer/paper-ripple/paper-ripple.js";
import "@polymer/iron-icon/iron-icon.js";

import "cl-polymer-element-helpers/ct-element-style.js";

let clPolymerButtonTemplate;
let clPolymerButtonTemplateDefault;
let clPolymerButtonBase = mixinBehaviors([], PolymerElement);
class clPolymerButton extends clPolymerButtonBase {
    constructor() {
        super();
        this.type = "primary";
        this.iconAlignment = "start";
        this.iconCompact = false;
        this.iconRtlFlip = false;
        this.inverted = false;
        this.disabled = false;
        this.tabindex = 0;
    }

    connectedCallback () {
        super.connectedCallback();
        this.addEventListener("mouseenter", this.onMouseEnterOrFocus.bind(this));
        this.addEventListener("focus", this.onMouseEnterOrFocus.bind(this));
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        this.removeEventListener("mouseenter", this.onMouseEnterOrFocus.bind(this));
        this.removeEventListener("focus", this.onMouseEnterOrFocus.bind(this));
    }

    createRipple () {
        let ripple = document.createElement("paper-ripple");
        ripple.initialOpacity = 1;
        ripple.noink = this.disabled;
        ripple.opacityDecayVelocity = 3.2;
        return ripple
    }

    onMouseEnterOrFocus ( event ) {
        this.ripple || (this.ripple = this.createRipple(),
        dom(this.root).appendChild(this.ripple));
    }
    
    onDisabledChanged () {
        this.ripple && (this.ripple.noink = this.disabled)
    }
    
    get iconRtlFlipClass () {
        return this.iconRtlFlip ? "rtl-flip" : ""
    }

  	static get template() {
    	if ( void 0 === clPolymerButtonTemplate || null === clPolymerButtonTemplate) {
            
            let template = document.createElement("template");
            template.innerHTML = `
            <style>
                :host {
                    --cl-polymer-button-icon-color: inherit;
                    --ct-call-to-action-raised-focused-background-border-radius: 4px;
                    display: inline-flex;
                    align-items: center;
                    text-align: center;
                    cursor: pointer;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    border-radius: 2px;
                    min-width: 36px;
                    height: 36px;
                    box-sizing: border-box;
                    padding: 0 8px;
                    margin: 0;
                    position: relative;
                    color: var(--ct-call-to-action);
                    font-family: "Roboto","Noto",sans-serif;
                    font-weight: 500;
                    -webkit-font-smoothing: antialiased;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-transform: uppercase;
                    letter-spacing: 0.01em;
                    font-size: 14px;
                    line-height: 20px;
                    transition: box-shadow 0.28s cubic-bezier(0.4,0,0.2,1);
                } 

                :host:focus {
                    outline: none;
                } 

                :host([type=filled]) {
                    padding-left: 16px;
                    padding-right: 16px;
                } 

                :host([type=filled][icon][icon-alignment=start]) {
                    padding-left: 12px;
                } 

                :host([type=filled][icon][icon-alignment=end]) {
                    padding-right: 12px;
                } 

                .label {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: block;
                    flex: 1 1;
                    padding: var(--cl-polymer-button-label-padding,8px 0 8px);
                } 

                iron-icon.inline {
                    flex: none;
                    display: block;
                    color: var(--cl-polymer-button-icon-color);
                    padding: 6px 0;
                } 

                iron-icon[compact].inline {
                    padding-top: 8px;
                    padding-bottom: 8px;
                } 

                :host([icon][icon-alignment=start]) .label {
                    padding-left: var(--cl-polymer-button-label-icon-padding,8px);
                } 

                :host([icon][icon-alignment=end]) .label {
                    padding-right: var(--cl-polymer-button-label-icon-padding,8px);
                } 

                :host([icon-alignment=end]) iron-icon {
                    order: 1;
                } 

                paper-ripple {
                    color: var(--ct-call-to-action-ripple);
                } 

                :host([keyboard-focus]) {
                    background-color: var(--ct-call-to-action-focused-background);
                } 

                :host([disabled]) {
                    background: transparent;
                    color: var(--ct-text-disabled);
                    cursor: default;
                } 

                :host([type=secondary]) {
                    color: var(--ct-text-secondary);
                } 

                :host([type=secondary]) paper-ripple {
                    color: var(--ct-call-to-action-secondary-ripple);
                } 

                :host([type=secondary][keyboard-focus]) {
                    background-color: var(--ct-call-to-action-secondary-focused-background);
                } 

                :host([type=secondary][disabled]) {
                    color: var(--ct-text-disabled);
                } 

                :host([type=filled]) {
                    color: var(--ct-text-primary-inverse);
                    background-color: var(--ct-call-to-action-raised-background);
                } 

                :host([type=filled]) paper-ripple {
                    color: var(--ct-call-to-action-raised-ripple);
                } 

                :host([type=filled][keyboard-focus]):after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 1;
                    background-color: var(--ct-call-to-action-raised-focused-background);
                    border-radius: var(--ct-call-to-action-raised-focused-background-border-radius);
                } 

                :host([type=filled][disabled]) {
                    color: var(--ct-call-to-action-raised-disabled);
                    background-color: var(--ct-call-to-action-raised-disabled-background);
                } 

                :host([inverted]) {
                    color: var(--ct-call-to-action-inverse);
                } 

                :host([inverted]) paper-ripple {
                    color: var(--ct-call-to-action-ripple-inverse);
                } 

                :host([inverted][keyboard-focus]) {
                    background-color: var(--ct-call-to-action-focused-background-inverse);
                } 

                :host([inverted][type=secondary]) {
                    color: var(--ct-text-secondary-inverse);
                } 

                :host([inverted][type=secondary]) paper-ripple {
                    color: var(--ct-call-to-action-secondary-ripple-inverse);
                } 

                :host([inverted][type=secondary][keyboard-focus]) {
                    background-color: var(--ct-call-to-action-secondary-focused-background-inverse);
                } 

                :host([inverted][disabled]),
                :host([inverted][type=secondary][disabled]) {
                    color: var(--ct-text-disabled-inverse);
                } 

                :host([inverted][type=filled]) {
                    color: var(--ct-text-primary);
                    background-color: var(--ct-call-to-action-raised-background-inverse);
                } 

                :host([inverted][type=filled]) paper-ripple {
                    color: var(--ct-call-to-action-raised-ripple-inverse);
                } 

                :host([inverted][type=filled][keyboard-focus]):after {
                    background-color: var(--ct-call-to-action-raised-focused-background-inverse);
                } 

                :host([inverted][type=filled][disabled]) {
                    color: var(--ct-call-to-action-raised-disabled-inverse);
                    background-color: var(--ct-call-to-action-raised-disabled-background-inverse);
                } 
            </style>
            <template is="dom-if" if="[[icon]]">
                <iron-icon class$="inline [[iconRtlFlipClass]]" compact$="[[iconCompact]]" icon="[[icon]]"></iron-icon>
            </template>
            <div class="label">[[label]]</div>
            `;
            template.content.insertBefore(clDefaultStyle().content.cloneNode(true), template.content.firstChild);
            let templateContent = template.content;
            let templateInsertBefore = templateContent.insertBefore;
            let defaultTemplate;
            if (void 0 == clPolymerButtonTemplateDefault || null == clPolymerButtonTemplateDefault) {
                defaultTemplate = clDefaultTemplate();
                clPolymerButtonTemplateDefault = defaultTemplate
            }
            defaultTemplate = clPolymerButtonTemplateDefault;
            templateInsertBefore.call(templateContent, defaultTemplate.content.cloneNode(true), template.content.firstChild);

            return clPolymerButtonTemplate = template;
        }

        return clPolymerButtonTemplate;
  	}
}

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerButton.prototype, 
    "label", 
    void 0
);

__decorate(
    [
        property({ type: String, reflectToAttribute: true })
    ], 
    clPolymerButton.prototype, 
    "icon", 
    void 0
);

__decorate(
    [
        property({ type: String, reflectToAttribute: true })
    ], 
    clPolymerButton.prototype, 
    "type", 
    void 0
);

__decorate(
    [
        property({ type: String, reflectToAttribute: true })
    ], 
    clPolymerButton.prototype, 
    "iconAlignment", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerButton.prototype, 
    "iconCompact", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerButton.prototype, 
    "iconRtlFlip", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerButton.prototype, 
    "inverted", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerButton.prototype, 
    "disabled", 
    void 0
);

__decorate(
    [
        property({ type: Object, reflectToAttribute: true })
    ], 
    clPolymerButton.prototype, 
    "tabindex", 
    void 0
);

__decorate(
    [
        property({ type: HTMLDivElement }),
        query(".label")
    ], 
    clPolymerButton.prototype, 
    "labelElement", 
    void 0
);

__decorate(
    [
        property({ type: String }),
        computed("iconRtlFlip")
    ], 
    clPolymerButton.prototype, 
    "iconRtlFlipClass", 
    void 0
);

__decorate(
    [
        property({ type: Function }),
        observe("disabled")
    ], 
    clPolymerButton.prototype, 
    "onDisabledChanged", 
    void 0
);

clPolymerButton = __decorate([
    customElement("cl-polymer-button")
], clPolymerButton);

export { clPolymerButton };