const ProgramVisualizer = () => {
  return (
    <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
      <div className="w-full h-full relative p-8 bg-[#1A1A2E] border border-white/10 rounded-xl overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#00BFFF]/30 rounded-full blur-3xl"></div>
        </div>

        {/* Geometric representation */}
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-2.5">
          <div className="w-1/2 h-8 bg-white/10 border border-white/20 rounded-lg"></div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="w-3/4 h-8 bg-white/10 border border-white/20 rounded-lg"></div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="w-3/4 h-8 bg-white/10 border border-white/20 rounded-lg"></div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="w-1/2 h-8 bg-white/10 border border-white/20 rounded-lg"></div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="w-3/4 h-8 bg-white/10 border border-white/20 rounded-lg"></div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="w-full h-8 bg-white/10 border border-white/20 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgramVisualizer;
