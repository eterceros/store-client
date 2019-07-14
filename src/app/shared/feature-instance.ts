import {Feature} from './feature';
import {Item} from './item';

export class FeatureInstance {
  id: number;
  feature: Feature;
  item: Item;
  value: number;
  version: number;
}
