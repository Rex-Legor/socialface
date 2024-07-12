import { Directive } from '@angular/core';

/**
 * Directive used for projection purposes only in a <img> element,
 * it doesn't alter the content in any way.
 *
 * * @author Ricardo Legorreta Mendoza
 */
@Directive({ selector: '[sf-card-avatar]' })
export class CardAvatarDirective {}
