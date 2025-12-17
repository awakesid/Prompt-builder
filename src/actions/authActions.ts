'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/authConstants';

// If successful, it redirects. If failed, it returns an error object.
export async function loginAction(formData: FormData): Promise<{ error: string }> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials are not set in environment variables.');
    return { error: 'Server configuration error. Please contact support.' };
  }

  if (username === adminUsername && password === adminPassword) {
    cookies().set(AUTH_COOKIE_NAME, 'logged_in_admin_user', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    redirect('/admin/manage-prompts'); // Redirect on success
  } else {
    return { error: 'Invalid username or password.' };
  }
}

export async function logoutAction() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/admin/login');
}
