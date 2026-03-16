import Link from "next/link";
import Image from "next/image";
import { BedDouble, Waves, Trees, Flame, MapPin, Droplets } from "lucide-react";
import MapSection from "./components/MapSection";

const HIGHLIGHTS = [
  { icon: BedDouble, label: "4 beds", detail: "Sleeps up to 6 guests" },
  { icon: Waves, label: "Lake access", detail: "Private dock, 50 m from the cabin" },
  { icon: Trees, label: "Forest setting", detail: "Surrounded by old-growth pine forest" },
  { icon: Flame, label: "Wood sauna", detail: "Traditional Swedish sauna on site" },
  { icon: MapPin, label: "Åmål nearby", detail: "Nearest town ~20 km away" },
  { icon: Droplets, label: "Outdoor pool", detail: "Heated pool open in summer" },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white min-h-[70vh] flex items-center justify-center px-6 text-center overflow-hidden">
        <Image
          src="/gallery/raberg_sunset.jpg"
          alt="Cabin by the lake in Dalsland"
          fill
          className="object-cover object-[center_50%]"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Your retreat in the heart of Dalsland
          </h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto mb-8">
            A private cabin by the lake — forest, fresh air, and silence. Exactly what you need.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-stone-800 font-semibold px-8 py-3 rounded-full hover:bg-stone-100 transition-colors"
          >
            Book your stay
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-6">About the cabin</h2>
        <div className="space-y-4 text-stone-600 leading-relaxed">
          <p>
            Nestled between ancient pine forests and the still waters of a Dalsland lake, this cabin
            offers a genuine escape from everyday life. Wake up to birdsong, spend your days kayaking
            or swimming, and end your evenings in the wood-fired sauna watching the sunset.
          </p>
          <p>
            The cabin comfortably sleeps up to six guests across two bedrooms and a sleeping loft.
            The fully equipped kitchen and cosy living room with a fireplace make it easy to settle
            in for longer stays. Fast Wi-Fi is available for those who cannot fully unplug.
          </p>
          <p>
            Dalsland is one of Sweden&apos;s best-kept secrets — a landscape of a thousand lakes, dramatic
            canal routes, and unhurried villages. Whether you come for the nature, the peace, or just
            to recharge, this is the right place.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-stone-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">What&apos;s included</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="mb-3 text-stone-600"><h.icon size={22} strokeWidth={1.5} /></div>
                <div className="font-semibold text-stone-800">{h.label}</div>
                <div className="text-sm text-stone-500 mt-1">{h.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-8">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        </div>
        <p className="text-xs text-stone-400 mt-4">Placeholder images — real photos coming soon.</p>
      </section>

      {/* Map */}
      <section className="bg-stone-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-2">Location</h2>
          <p className="text-stone-500 mb-6">Dalsland, Västra Götaland, Sweden</p>
          <MapSection />
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to book?</h2>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">
          Check availability and send a booking request in a few minutes.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-stone-800 text-white font-semibold px-10 py-3 rounded-full hover:bg-stone-700 transition-colors"
        >
          See availability
        </Link>
      </section>
    </main>
  );
}
