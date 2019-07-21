import {Item} from './item';
import {Image} from './image';
import {ModelBase} from './model-base';

export class ItemInstance extends ModelBase {
  identifier: string;
  itemInstanceState: string;
  price: number;
  profit: number;
  featured: boolean;
  item: Item;
  images: Image[];
  featuredImage: string;
}
