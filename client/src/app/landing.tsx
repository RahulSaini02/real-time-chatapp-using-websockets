import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-nunito-sans)] bg-[var(--primary)]/80 flex justify-center place-items-center">
      {/* Doodle */}
      <div className="flex flex-col flex-shrink-0 place-items-center justify-center space-y-4">
        <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 overflow-hidden rounded-full">
          <Image
            src='doodle_background.svg'
            alt='doodle background'
            fill
            sizes="(max-width: 1000px) 100vw, 50vw"
            placeholder = 'blur'
            blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMN7ldDwAENwHnfg9UxAAAAABJRU5ErkJggg=='
            objectFit="cover"
            priority
            className="bg-[var(--main)] mask mask-image"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold mt-10 text-center">Welcome to WhatsApp</h2>
          <p className="text-[var(--secondary)] font-bold">Message privately with friends and family using WhatsApp.</p>
        </div>

        <Link href="/signin" className="mt-10">
          <button  className="p-3 px-8 bg-[var(--main)]/90 hover:bg-[var(--main)]/70 transition-colors duration-150 ease-in-out w-[25rem] text-[var(--off-white)] font-semibold text-lg outline-none rounded-lg cursor-pointer">Get Started</button>
        </Link>

      </div>
    
    </div>
  );
}
