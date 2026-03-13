import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";

const fontSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "amber-pre-interview",
	description: "amber-pre-interview",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
