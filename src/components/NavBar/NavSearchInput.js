import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid'

export default function SearchInput({classes}) {
  return (
    <div className='flex items-center'>
      <div className="mt-2 flex rounded-md  shadow-sm">
        <div className="relative flex flex-grow items-stretch  focus-within:z-10">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="John Smith"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 duration-200"
        >
          <BarsArrowUpIcon aria-hidden="true" className="-ml-0.5 h-5 w-5 text-gray-400" />
          Filter
        </button>
      </div>
    </div>
  )
  }