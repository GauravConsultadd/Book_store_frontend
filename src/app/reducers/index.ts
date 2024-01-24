import { ActionReducerMap } from '@ngrx/store';
import { userReducer, userState } from './users';
import { cartItemReducer, cartItemState } from './carts';
import { bookReducer, bookState } from './books';
import { inventoryReducer, inventoryState } from './inventory';

export interface AppState {
    user: userState
    cart: cartItemState,
    book: bookState,
    inventory: inventoryState
    // Add other feature states as needed
  }

export const rootReducer: ActionReducerMap<AppState> = {
    user: userReducer,
    cart: cartItemReducer,
    book: bookReducer,
    inventory: inventoryReducer
    // Add other feature reducers as needed
};