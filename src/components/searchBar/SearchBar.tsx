import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

function SearchBar() {
  return (
    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 p-4">
      <form className="flex flex-1">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-1 h-full w-5 text-gray-500"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0  py-3 pl-8 pr-0 text-white focus:ring-0 sm:text-sm bg-neutral4 rounded-lg"
            placeholder="Search"
            type="search"
            name="search"
          />
        </div>
      </form>
    </div>
  );
}
export default SearchBar;
