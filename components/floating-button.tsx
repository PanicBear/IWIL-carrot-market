import Link from "next/link";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function Floating({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <a className="fixed hover:bg-orange-500 transition-colors cursor-pointer bottom-24 right-5 shadow-xl bg-orange-400 rounded-full p-4 text-white">
        {children}
      </a>
    </Link>
  );
}
