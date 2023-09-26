import { MediaType } from "./product";



export interface PostType {
  readonly _id: string;
  title: string;
  content: string;
  subContent: string;
  media: MediaType[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface PostTypeFromBE {
  data: PostType[];
  total: number;
  totalPage: number;
  currentPages: number;
}
