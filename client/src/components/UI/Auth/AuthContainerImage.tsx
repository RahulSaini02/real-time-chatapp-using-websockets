import Image from "next/image";
import React from "react";

export const AuthContainerImage = () => {
  return (
    <div className="flex flex-col flex-shrink-0 place-items-center justify-center space-y-4">
      <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 overflow-hidden rounded-full">
        <Image
          src="/backgrounds/doodle_background.svg"
          alt="doodle background"
          fill
          sizes="(max-width: 1000px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMN7ldDwAENwHnfg9UxAAAAABJRU5ErkJggg=="
          objectFit="cover"
          priority
          className="bg-primary mask mask-image"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-bold mt-10 text-center text-secondary">
          Welcome to WhatsApp
        </h2>
        <p className="text-accent font-bold">
          Message privately with friends and family using WhatsApp.
        </p>
      </div>
    </div>
  );
};
