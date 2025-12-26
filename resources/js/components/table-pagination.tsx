import { Pagination } from "@/types/role_permission";
import { Link } from "@inertiajs/react";

export default function TablePagination({ pagination }: { pagination: Pagination }) {
  const { links, total, from, to } = pagination;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
      <span className="text-sm text-gray-700">
        Showing {from} to {to} of {total} results
      </span>

      <div className="flex space-x-2">
        {links.map((link, index) =>
          link.url === null ? (
            <span
              key={index}
              className="px-3 py-2 text-sm text-gray-400 border rounded cursor-not-allowed"
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ) : (
            <Link
              key={index}
              href={link.url}
              className={`px-3 py-2 text-sm rounded border ${
                link.active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          )
        )}
      </div>
    </div>
  );
}
