import React, {
  FunctionComponent,
  ComponentClass,
  Component,
  ReactNode,
} from 'react';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import { createStore, AnyAction, Action, Store } from 'redux';
import { Provider } from 'react-redux';
import reducer, {
  initialState as reducerInitialState,
} from '../store/reducers/toDoList';

interface IState {
  [key: string]: any;
}

interface RenderWithRedux<
  S = any,
  A extends Action = AnyAction,
  I extends S = any
> {
  (
    ui: ReactNode,
    reduxOptions?: {
      store?: Store<S, A>;
      initialState?: I;
    }
  ): RenderResult & {
    store: Store<S, A>;
  };
}

// function render(
//   ui: any,
//   {
//     initialState = reducerInitialState,
//     store = createStore(reducer, initialState),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

export const renderWithRedux: RenderWithRedux = (
  ui,
  { store = createStore(reducer, reducerInitialState) } = {}
) => {
  return {
    ...rtlRender(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithRedux as render };
