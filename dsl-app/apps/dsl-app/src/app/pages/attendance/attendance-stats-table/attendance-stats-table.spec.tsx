import { render } from '@testing-library/react';

import AttendanceStatsTable from './attendance-stats-table';

describe('AttendanceStatsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AttendanceStatsTable />);
    expect(baseElement).toBeTruthy();
  });
});
