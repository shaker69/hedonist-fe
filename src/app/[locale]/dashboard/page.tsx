import { getServerSession } from 'next-auth';

import auth from '@app/auth';

import Dashboard from './Dashboard';

export default async function DashboardPage() {
  const session = await getServerSession(auth);

  return (
    <Dashboard session={session} />
  )
}
