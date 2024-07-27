import { Pagination } from "./components";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <Pagination
        currentPage={parseInt(searchParams.page)}
        itemCount={1000}
        pageSize={6}
      />
    </div>
  );
}
