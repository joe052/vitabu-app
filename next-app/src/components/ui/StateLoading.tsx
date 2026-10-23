import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

type StateLoadingProps = {
  label?: string;
  className?: string;
};

const StateLoading = ({
  label = "Loading...",
  className,
}: StateLoadingProps) => {
  return (
    <div
      className={cn(
        "muted flex flex-col items-center justify-center gap-3 py-16",
        className,
      )}
    >
      <Spinner size="lg" />
      <p>{label}</p>
    </div>
  );
};

export default StateLoading;
