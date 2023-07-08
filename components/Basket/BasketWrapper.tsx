"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Basket from "./Basket";

export default function BasketWrapper({ sizes }: { sizes: number[] }) {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="fixed bottom-0 w-full bg-white py-4 font-semibold uppercase shadow-[0_0_1rem_#00000030] md:hidden"
      >
        View Basket
      </button>

      <aside
        className={`fixed bottom-0 right-0 top-0 z-20 w-5/6 max-w-[360px] transition-transform duration-300 md:z-0 md:w-full ${
          open ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <Basket sizes={sizes} />
      </aside>

      <Transition show={open} as={Fragment}>
        <Dialog onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/20 md:hidden"
              aria-hidden="true"
            />
          </Transition.Child>

          <Dialog.Panel>
            <button></button>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
}
