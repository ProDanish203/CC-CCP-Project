"use client";
import { Search } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export const SearchBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const ref = useRef<HTMLDivElement>(null);

  const query = useDebounce(search, 700);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const currentQuery = searchParams.get("search") || "";

    // Reset page to 1 only when the search query changes
    if (query !== currentQuery) {
      router.push(`${pathname}?${createQueryString("search", query)}`);
    }
  }, [query, router, pathname, searchParams, createQueryString]);

  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 w-fit px-3 py-2 rounded-md flex items-center gap-x-1 border border-neutral-200 dark:border-neutral-700 max-sm:w-full">
      <input
        type="text"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="outline-none text-sm bg-transparent text-foreground dark:text-darkText placeholder:text-muted-foreground max-sm:w-full"
        placeholder="Search..."
      />
      <button>
        <Search className="size-4 text-foreground dark:text-darkText" />
      </button>
    </div>
  );
};
