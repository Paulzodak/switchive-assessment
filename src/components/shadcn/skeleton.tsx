import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // <div className="p-2">
    <div
      className={cn("animate-pulse rounded-md bg-gray-200 ", className)}
      {...props}
    />
    // </div>
  );
}

export { Skeleton };
