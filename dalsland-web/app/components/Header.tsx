import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-stone-800 tracking-tight">
          Järbo Råberg 3
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-stone-600">
          <Link href="/explore" className="hover:text-stone-900 transition-colors">
            Explore
          </Link>
          <Link
            href="/booking"
            className="bg-stone-800 text-white px-4 py-2 rounded-full hover:bg-stone-700 transition-colors"
          >
            Book now
          </Link>
          <Link href="/login" className="hover:text-stone-900 transition-colors">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
