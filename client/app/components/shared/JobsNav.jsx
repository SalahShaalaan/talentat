export default function JobsNav() {
  return (
    <div className="bg-[var(--mainGreen)] rounded-md p-6 text-white">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">UI Designer in Egypt</h1>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-sm px-3 py-1 rounded-full">
            70 job positions
          </span>

          <div className="flex items-center gap-2">
            <span className="text-base">Set Alert</span>
            <label
              htmlFor="alert-toggle"
              className="inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="alert-toggle"
                className="sr-only peer"
              />
              <div className="relative w-10 h-5 bg-white/30 peer-checked:bg-white rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:bg-[var(--mainGreen)]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
