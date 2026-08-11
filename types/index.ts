export interface ProductType {
  id: string;
  title: string;
  price: number;
}

export interface CartListType {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error?: string; fieldErrors?: Record<string, string[]> };
