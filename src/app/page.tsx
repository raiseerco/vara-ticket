"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "@gear-js/ui";

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @keyframes colorChange {
          0%,
          100% {
            color: #e7e5e4;
          }
          25%,
          75% {
            color: #a8a29e;
          }
          50% {
            color: #1c1917;
          }
        }
      `}</style>

      <div
        id="logo"
        className="flex-shrink-0 w-full bg-black  fixed z-20 px-12 py-2  "
      >
        <span className="font-blacks text-xl text-rose-400 font-mono">
          <i>vticket🎟️</i>
        </span>
      </div>

      <div className="relative flex items-center z-0 bg-opacity-75 justify-center min-h-screen text-white w-full bg-stone-900">
        <Image
          src="/555.webp"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="absolute mt-10 mix-blend-darken  blur-sm  inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 justify-between items-center max-w-7xl px-6">
          <div className="w-full lg:w-2/3 flex flex-col gap-y-8 lg:ml-14 lg:mt-16">
            <p
              id="heroTextRight"
              className="text-xl sm:text-sm md:text-2xl lg:text-7xl text-rose-300 font-semibold tracking-tighter text-left"
              style={{
                animation: "colorChange 6s ease-in-out infinite",
              }}
            >
              Your gateway to
              <br />
              unforgettable experiences
            </p>
            <p
              id="subheroRight"
              className="text-lg md:text-xl md:pr-40 font-mono text-right"
            >
              Secure your spot at the hottest shows with cutting-edge
              decentralized technology. <br />
              Embrace the security: Your tickets - your control, say goodbye to
              scalpers and fraud 🔑
            </p>
            <div
              id="subheroButton"
              className="flex justify-center lg:justify-end"
            >
              <Link
                href="/events"
                className="px-6 py-3 font-mono rounded-md bg-rose-400 hover:bg-rose-400 text-black transition-colors"
              >
                Start your journey →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main>
        <section className="bg-background py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover the Best Concerts in Town
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Our platform connects you with the hottest concert tickets in
                  your area. Find your next unforgettable experience with ease.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button>Buy Tickets</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <img
                src="/heroes.png"
                width="600"
                height="400"
                alt="Concert"
                className="mx-auto rounded-xl object-cover"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
        <section id="features" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features That Make Your Life Easier
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our platform offers a seamless experience for finding and
                  purchasing concert tickets. Discover the key features that set
                  us apart.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">
                    Personalized Recommendations
                  </h3>
                  <p className="text-muted-foreground">
                    Our algorithm suggests concerts based on your preferences
                    and past purchases, ensuring you never miss out on your
                    favorite artists.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">Secure Payments</h3>
                  <p className="text-muted-foreground">
                    Rest assured that your transactions are safe and secure with
                    our cutting-edge payment processing system.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">
                    Mobile-Friendly Experience
                  </h3>
                  <p className="text-muted-foreground">
                    Our responsive design ensures you can browse and purchase
                    tickets on-the-go, making it easy to plan your next concert
                    adventure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="bg-background py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Have a question or feedback? Fill out the form below and we
                  will get back to you as soon as possible.
                </p>
              </div>
              <form className="grid gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md border border-input bg-muted px-4 py-2 text-foreground focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-input bg-muted px-4 py-2 text-foreground focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <Textarea
                  placeholder="Message"
                  className="w-full rounded-md border border-input bg-muted px-4 py-2 text-foreground focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </section>
        <section id="about" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About vticket
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  vticket is a leading concert tickets marketplace that connects
                  music lovers with the best live experiences in their area. Our
                  mission is to make it easy for everyone to discover and
                  purchase tickets to the concerts they love.
                </p>
                <p className="text-muted-foreground md:text-xl">
                  With a user-friendly platform, secure payments, and
                  personalized recommendations, we strive to provide an
                  exceptional experience for our customers. Join us on this
                  musical journey and let us help you find your next
                  unforgettable concert.
                </p>
              </div>
              <img
                src="/placeholder.svg"
                width="600"
                height="400"
                alt="About"
                className="mx-auto rounded-xl object-cover"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background text-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:py-8">
          <div className="flex items-center gap-2">
            <span className="font-blacks text-xl text-rose-400 font-mono">
              <i>vticket🎟️</i>
            </span>
          </div>
          <nav className="flex gap-4">
            <Link href="#" className="hover:text-rose-400" prefetch={false}>
              Features
            </Link>
            <Link href="#" className="hover:text-rose-400" prefetch={false}>
              Contact
            </Link>
            <Link href="#" className="hover:text-rose-400" prefetch={false}>
              About
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            &copy; 2024 vticket. All rights reserved.
          </p>
        </div>
      </footer>

      {/* hero bottom  */}
      <div className="relative flex items-center justify-center h-80 text-white w-full bg-stone-900">
        <Image
          src="/555.webp"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-30 z-0"
        />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <p className="text-4xl font-semibold  my-8">
            Ready to revolutionize your event experience?
          </p>
          <Link
            href="/events"
            className="px-6 py-3 font-mono rounded-md bg-rose-400 hover:bg-rose-400 text-black transition-colors"
          >
            Join the future of ticketing
          </Link>
        </div>
      </div>
    </>
  );
}
