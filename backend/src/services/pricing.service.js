export function getMarkupTier(price, tiers) {
  const tier = tiers.find((item) => price >= item.min && (item.max === null || price <= item.max));
  return tier || tiers[tiers.length - 1];
}

export function calculateSellPrice(basePrice, tiers) {
  const tier = getMarkupTier(basePrice, tiers);
  const markup = Math.round((basePrice * tier.percent) / 100);
  return {
    tier,
    basePrice,
    markup,
    sellPrice: basePrice + markup,
  };
}

export function calculateSellPriceBySetting(basePrice, markupSetting) {
  const numericBasePrice = Number(basePrice);
  if (!Number.isFinite(numericBasePrice) || numericBasePrice < 0) {
    const error = new Error('Harga dasar tidak valid');
    error.statusCode = 400;
    throw error;
  }

  const markup = Number(markupSetting?.markup || 0);
  if (!Number.isFinite(markup) || markup < 0) {
    const error = new Error('Markup tidak valid');
    error.statusCode = 400;
    throw error;
  }

  const type = markupSetting?.markup_type === 'fixed' ? 'fixed' : 'percent';
  const sellPrice = type === 'fixed' ? numericBasePrice + markup : numericBasePrice + Math.round((numericBasePrice * markup) / 100);
  return {
    basePrice: numericBasePrice,
    markup,
    markup_type: type,
    sellPrice,
  };
}
