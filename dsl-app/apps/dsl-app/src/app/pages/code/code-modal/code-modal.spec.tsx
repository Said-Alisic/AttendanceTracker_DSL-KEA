import { render } from '@testing-library/react';

import CodeModal from './code-modal';

describe('CodeModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CodeModal />);
    expect(baseElement).toBeTruthy();
  });
});
