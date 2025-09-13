export const AvatarFormatExtensions = {
    jpg: 'jpeg',
    jpeg: 'jpeg',
    png: 'png',
    webp: 'webp',
    heic: 'heic',
} as const;

export type AvatarFormatExtensions = (typeof AvatarFormatExtensions)[keyof typeof AvatarFormatExtensions];