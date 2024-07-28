import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge, Pagination, Link as TitleLink } from "../components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sort: "asc" | "desc";
    page: string;
  };
}

const pageSize = 9;
const validStatuses = Object.values(Status);
const validColumns = ["title", "status", "createdAt"];
const validSortDirections = ["asc", "desc"];
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created On",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = validColumns.includes(searchParams.orderBy)
    ? searchParams.orderBy
    : "createdAt";
  const sort = validSortDirections.includes(searchParams.sort)
    ? searchParams.sort
    : "desc";

  const page = parseInt(searchParams.page) || 1;

  const where = { status };

  const issues = await prisma.issue.findMany({
    where,
    orderBy: { [orderBy]: sort },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  const getNextSortDirection = (currentSort: "asc" | "desc") =>
    currentSort === "asc" ? "desc" : "asc";

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface" className="mb-5">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isActive = column.value === searchParams.orderBy;
              const nextSortDirection = isActive
                ? getNextSortDirection(searchParams.sort)
                : "asc";
              return (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        sort: nextSortDirection,
                      },
                    }}
                  >
                    {column.label}
                    {isActive &&
                      (searchParams.sort === "asc" ? (
                        <ArrowUpIcon className="inline ml-1" />
                      ) : (
                        <ArrowDownIcon className="inline ml-1" />
                      ))}
                  </Link>
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="truncate max-w-xs">
                <TitleLink href={`issues/${issue.id}`}>{issue.title}</TitleLink>
                <div className="block mt-2 md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
