import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
// import { Toaster } from '@/components/ui/sonner';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export default function AppHeaderLayout({
	children,
	breadcrumbs,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
	return (
		<AppShell>
			<AppHeader breadcrumbs={breadcrumbs} />
			<AppContent>
				{children}
				{/* <div> */}
					{/* {children} */}
					<Toaster position="top-right" richColors />
				{/* </div> */}
			</AppContent>
		</AppShell>
	);
}
