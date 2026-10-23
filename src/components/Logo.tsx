const assetPathPrefix = "/assets";
const imgGroup = `${assetPathPrefix}/35659.svg`;
const imgGroup1 = `${assetPathPrefix}/234bd.svg`;
const imgGroup2 = `${assetPathPrefix}/c2759.svg`;
const imgGroup6 = `${assetPathPrefix}/6978c.svg`;

export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  // Source artwork has a white wordmark; on light surfaces it is darkened.
  const wordmarkFilter = tone === "light" ? "brightness(0)" : undefined;
  return (
    <div className="flex items-center gap-3" aria-label="Credence">
      <div className="relative size-[33px] shrink-0 overflow-clip">
        <div className="absolute inset-[10.04%_8.59%_13.33%_59.16%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
        </div>
        <div className="absolute inset-[9.71%_23.91%_53.97%_8.59%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
        </div>
        <div className="absolute inset-[42.2%_24.14%_9.71%_8.81%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
        </div>
      </div>
      <div className="relative h-[18px] w-[109px] shrink-0 overflow-clip">
        <div className="absolute inset-[0_-0.01%_-0.02%_0]">
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGroup6}
            style={{ filter: wordmarkFilter }}
          />
        </div>
      </div>
    </div>
  )
}
