import { render } from '@testing-library/react';

import PopUpMessage from './pop-up-message';

describe('PopUpMessage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PopUpMessage />);
    expect(baseElement).toBeTruthy();
  });
});
