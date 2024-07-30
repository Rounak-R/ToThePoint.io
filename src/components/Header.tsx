const Header = () => {
  return (
    <header className="bg-orange-200 py-5 text-orange-500">
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
