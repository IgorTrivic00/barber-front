export interface Photo {
  id: number,
  uuid: string,
  name: string,
  title: string,
  ownerUuid: string,
  width?: number,
  height?: number,
  size?: number,
  url?: string,
  contentType?: string,
  mediaType?: string
}
