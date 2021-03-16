export type Descriptors = {
  [x: string]: TypedPropertyDescriptor<any>;
} & {
  [x: string]: PropertyDescriptor;
};
