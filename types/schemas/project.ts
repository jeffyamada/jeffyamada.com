export default interface Project {
  mainImage: MainImage;
  _createdAt: Date;
  body: Body[];
  _updatedAt: Date;
  title: string;
  slug: Slug;
  _rev: string;
  _type: string;
  client: Client;
  _id: string;
}

interface Body {
  markDefs: any[];
  children: Child[];
  _type: string;
  style: string;
  _key: string;
}

interface Child {
  marks: any[];
  text: string;
  _key: string;
  _type: string;
}

interface Client {
  _ref: string;
  _type: string;
}

interface MainImage {
  _type: string;
  asset: Client;
}

interface Slug {
  current: string;
  _type: string;
}
