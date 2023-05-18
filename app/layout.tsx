import './globals.css';
import { Karla } from 'next/font/google';
import Navbar from './components/Navbar';

// NEXTAUTH: GETTING SESSION INFORMATION ⭐️
// Here we use `getServerSession` to get the session information from the server
// and pass it down to a Navbar component. Function `next-auth/next` allows you
// to fetch the session information directly from the server/route api.
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { ReactNode } from 'react';

// ZUSTAND: HYDRATE COMPONENT TO HANDLE CLIENT-SIDE RENDERING (STEP 4) ⭐️
// This component prevents client-specific code from running on the server and
// causing a mismatch between pre-rendered server-rendered and client-rendered
// markup. It does this by rendering its `children` (client-specific code) only
// after the component has "mounted" on the client (i.e. after hydration).
import Hydration from './components/Hydration';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const karla = Karla({
  subsets: ['latin-ext'],
});

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  // console.log('RootLayout > getServerSession: ', session);
  return (
    <html lang="en">
      <body className={`${karla.className} mx-4 lg:mx-64`}>
        <Hydration>
          <Navbar user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydration>
      </body>
    </html>
  );
}
