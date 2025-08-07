"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type Props = {
  collection: CollectionType[];
};

export const CategoryMenu = ({ collection }: Props) => {
  const [open, setOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      timeoutRef.current = setTimeout(() => setOpen(false), 150);
    }
  };

  const handleClick = () => {
    if (isTouchDevice) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p
        className="cursor-pointer text-white hover:text-[#29465b]"
        onClick={handleClick}
      >
        Catégories
      </p>

      {open && (
        <div className="absolute top-full mt-2 right-0 flex flex-col gap-2 p-3 rounded-lg border bg-[#77c0bf] text-base-bold shadow-lg z-50 min-w-[180px]">
          {collection.length === 0 ? (
            <p className="text-white">No categories found</p>
          ) : (
            collection.map((coll) => (
              <Link
                key={coll._id}
                href={`/collections/${coll._id}`}
                className="text-white hover:text-[#29465b]"
              >
                {coll.title}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
