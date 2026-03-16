export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <span className="font-medium text-stone-300">Dalsland Cabin</span>
        <span>© {new Date().getFullYear()} — All rights reserved</span>
      </div>
    </footer>
  );
}
