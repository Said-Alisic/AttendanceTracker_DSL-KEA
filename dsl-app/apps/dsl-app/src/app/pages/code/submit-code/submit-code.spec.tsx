import { render } from '@testing-library/react';

import SubmitCode from './submit-code';

describe('SubmitCode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubmitCode />);
    expect(baseElement).toBeTruthy();
  });
});
