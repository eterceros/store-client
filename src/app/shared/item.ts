import {Comment} from './comment';
import {Feature} from './feature';

export class Item {
  id: number;
  featured: boolean;
  name: string;
  identifier: string;
  version: number;
  price: number;
  image: string;
  category: string;
  label: string;
  itemInstanceState: string;
  description: string;
  comments: Comment[];
  feature: Feature[];
}
