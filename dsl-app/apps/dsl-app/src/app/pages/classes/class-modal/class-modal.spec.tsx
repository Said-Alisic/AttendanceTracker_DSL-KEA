import { render } from '@testing-library/react';

import ClassModal from './class-modal';

describe('ClassModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassModal />);
    expect(baseElement).toBeTruthy();
  });
});
