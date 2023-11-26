import TechnologiesGroup from "@/components/technologies-group";

export default function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  return (
    <div>
      <TechnologiesGroup searchParams={searchParams} />
      <div className="max-w-screen-md mx-auto"></div>
    </div>
  );
}