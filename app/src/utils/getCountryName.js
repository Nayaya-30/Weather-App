export function getCountryName(code) {
  if (!code) return '';
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNames.of(code);
}
