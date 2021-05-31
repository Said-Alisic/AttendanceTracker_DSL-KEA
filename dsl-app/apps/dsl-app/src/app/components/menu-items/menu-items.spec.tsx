import { render } from '@testing-library/react';

import MenuItems from './menu-items';

describe('MenuItems', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MenuItems />);
    expect(baseElement).toBeTruthy();
  });
});
