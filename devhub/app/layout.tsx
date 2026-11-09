import type { Metadata } from 'next';
import './globals.css';
import { CursorFX } from '@/components/CursorFX';
export const metadata: Metadata = { title: 'Dev.Hub — Build. Share. Discover.', description: 'A home for developers, creators and projects.', icons: { icon: '/icon.png' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CursorFX />{children}</body></html>; }
