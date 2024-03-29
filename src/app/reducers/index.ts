import { ActionReducerMap } from '@ngrx/store';
import { userReducer, userState } from './users';
import { cartItemReducer, cartItemState } from './carts';
import { bookReducer, bookState } from './books';
import { inventoryReducer, inventoryState } from './inventory';
import { genreReducer, genreState } from './genre';
import { adminReducer, adminState } from './admin';
import { orderReducer, orderState } from './order';
import { searchReducer, searchState } from './search';

export interface AppState {
    user: userState
    cart: cartItemState,
    book: bookState,
    inventory: inventoryState
    genre: genreState,
    admin: adminState,
    order: orderState,
    search: searchState
    // Add other feature states as needed
  }

export const rootReducer: ActionReducerMap<AppState> = {
    user: userReducer,
    cart: cartItemReducer,
    book: bookReducer,
    inventory: inventoryReducer,
    genre: genreReducer,
    admin: adminReducer,
    order: orderReducer,
    search: searchReducer
    // Add other feature reducers as needed
};