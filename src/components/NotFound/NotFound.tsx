const NotFound = () => {
  return (
    <section className="dark:bg-gray-900 dark">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Página no encontrada
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Lo sentimos, la página que estás buscando no existe. Aquí hay
            algunos enlaces de ayuda:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <a href="/">Ir al inicio</a>
            </button>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="/public/404.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
