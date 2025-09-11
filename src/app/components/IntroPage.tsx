import Link from "next/link";
import Image from "next/image";
import Footer from "./Footer";

export default function IntroPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 text-white">
      <div className="text-center">
        <h1 className="font-logo text-6xl tracking-wide text-white mb-20">
          QUIZZ GAME
        </h1>
        <div className="flex flex-col items-center justify-center">
          <Image src="/avatar-quizz.png" alt="logo" width={200} height={200} />
        </div>
        <div className="flex justify-center mt-20">
          <Link href="/frontend/login">
            <button className=" w-[300px] bg-primary hover:bg-secondary-foreground hover:text-primary text-primary-foreground font-medium py-3 rounded-2xl">
              Start
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </section>
  );
}
