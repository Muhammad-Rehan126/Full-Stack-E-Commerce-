const productImageAssets = import.meta.glob('./assets/img-*.png', {
  eager: true,
  import: 'default'
});

export function resolveProductImage(image, fallback = '') {
  if (!image) return fallback;
  const assetName = image.match(/(?:^|\/)(img-\d+\.png)$/i)?.[1];
  return assetName
    ? productImageAssets[`./assets/${assetName}`] || image
    : image;
}
