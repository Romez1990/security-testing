import Category from '../types/Category';

declare module './categories.json' {
  const categories: { [key: string]: Category };
  export default categories;
}
