'use client';
import { signOut } from 'next-auth/react';

export function LogoutBtn() {
  return (
    <button onClick={() => signOut()}>Logout</button>
  );
}