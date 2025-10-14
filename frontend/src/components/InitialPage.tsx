export default function InitialPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main content */}
      <div className="text-center z-10 px-4">
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x mb-4">
            Miko
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg"></div>
        </div>

        <p className="text-xl md:text-2xl text-gray-600 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          Your intelligent AI assistant ready to help with anything you need
        </p>

        <div className="flex justify-center space-x-2 opacity-70">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
}
