import { Status } from '@/generated/prisma/enums';
import { Badge } from '@radix-ui/themes';
import React from 'react';

/**
 * This interface definition can be omitted because
 * the props in the arguments is just one line, so the code is simpler to understand
 */
// interface Props {
//   status: Status
// }


  const statusMap: Record<
  Status, 
  { label: string, color: 'red' | 'violet' | 'green'}
> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' }
  };
  
const IssueStatusBadge = ( { status }:  { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}</Badge>
  );
}

export default IssueStatusBadge;