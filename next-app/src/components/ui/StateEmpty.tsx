type StateEmptyProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

const StateEmpty = ({
  title = "Nothing here yet",
  description,
  action,
}: StateEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
      <p className="text-lg font-medium">{title}</p>
      {description && <p className="muted max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default StateEmpty;
