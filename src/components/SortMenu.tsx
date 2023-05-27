import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export enum SortMethod {
  Points = "Points",
  Time = "Time",
  Comments = "Comments",
  None = "None",
}

interface Props {
  onClick: (sortMethod: SortMethod) => void;
}

export default function SortMenu({ onClick }: Props) {
  const [sortMethod, setSortMethod] = useState(SortMethod.None);

  const onClickHandler = (sortMethod: SortMethod) => {
    return () => {
      setSortMethod(sortMethod);
      onClick(sortMethod);
    };
  };

  return (
    <Menu as="div" className="relative inline-block text-left text-sm">
      <div>
        <Menu.Button className="flex items-center space-x-1 border border-slate-400 px-2 py-1 rounded-sm hover:border-slate-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
          <span>{getButtonText(sortMethod)}</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-32 origin-top-left divide-y divide-slate-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#ff6600] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={onClickHandler(SortMethod.Points)}
                >
                  Points
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#ff6600] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={onClickHandler(SortMethod.Time)}
                >
                  Time
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#ff6600] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={onClickHandler(SortMethod.Comments)}
                >
                  Comments
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function getButtonText(sortMethod: SortMethod) {
  if (sortMethod === SortMethod.None) {
    return "Sort By";
  }

  return `Sort By: ${sortMethod}`;
}
