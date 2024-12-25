export const config = {
  isPreview: process.env.NEXT_PUBLIC_IS_PREVIEW === 'true',
  disableAuth: process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true'
}