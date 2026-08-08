import * as React from 'react';

import type { Offer, OfferKind } from '@/types';

import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { OFFER_KIND_META } from '@/constants/shopping';
import { cn } from '@/lib/utils';

export interface OfferBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  kind: OfferKind;
  /** Adds the saving to the label, e.g. "Coupon · ₹2,500 off". */
  offer?: Pick<Offer, 'discountPercent' | 'flatDiscount'>;
  hideIcon?: boolean;
}

function formatSaving(offer: OfferBadgeProps['offer']): string | null {
  if (!offer) return null;
  if (offer.discountPercent !== undefined) return `${offer.discountPercent}% off`;
  if (offer.flatDiscount !== undefined) {
    return `${new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(offer.flatDiscount)} off`;
  }
  return null;
}

/**
 * Labels what kind of saving an offer is.
 *
 * The kind is always spelled out in text — a saffron badge means money, but it
 * never carries that meaning alone, because colour is not available to every
 * reader. Coupons and price drops use the reserved `deal` variant; bundles and
 * exchanges do not, since they are not a direct discount.
 */
function OfferBadge({ kind, offer, hideIcon = false, size, className, ...props }: OfferBadgeProps) {
  const meta = OFFER_KIND_META[kind];
  const saving = formatSaving(offer);

  return (
    <Badge variant={meta.variant} size={size} className={cn('gap-1', className)} {...props}>
      {hideIcon ? null : <Icon name={meta.icon} size="xs" />}
      {meta.label}
      {saving ? <span className="opacity-80">· {saving}</span> : null}
    </Badge>
  );
}

export { OfferBadge };
