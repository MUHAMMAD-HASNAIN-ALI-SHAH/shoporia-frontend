import Links from "./Links";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full flex justify-center shadow-sm bg-white z-50">
      <nav className="flex justify-between w-[1200px] py-4">
        <Links />

        <div className="flex items-center gap-5 font-md text-lg text-black/90">
          <i className="ri-search-line cursor-pointer"></i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
