import Card from "@/components/ui/Card";

type StatCardProps = {
  label: string;
  value: number;
  caption?: string;
  isLoading?: boolean;
};

const StatCard = ({ label, value, caption, isLoading }: StatCardProps) => {
  /**COMPONENT */
  return (
    <Card>
      <p className="muted text-sm">{label}</p>
      {isLoading ? (
        <div className="mt-2 h-8 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      ) : (
        <p className="mt-1 text-3xl font-semibold">{value}</p>
      )}
      {caption && <p className="muted mt-1 text-xs">{caption}</p>}
    </Card>
  );
};

export default StatCard;
