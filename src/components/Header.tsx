const Header = () => {
  return (
    <header className="bg-neutral-900 border-neutral-700 py-5 border-b-2 text-cyan-500">
      <div className="flex flex-col items-center">
        <h1 className="font-bold mb-2 md:text-5xl text-4xl">ToThePoint.io</h1>
        <h3 className="md:text-2xl italic text-italic text-sm">
          Get straight to the point
        </h3>
      </div>
    </header>
  );
};

export default Header;
