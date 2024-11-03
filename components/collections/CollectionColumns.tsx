"use client"
import Delete from "@/components/custom ui/Delete"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import React from 'react'

export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "Collection",
      cell: ({ row }) => <Link href={`/collections/${row.original._id}`} className="hover: text-blue-400">{row.original.title}</Link>
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => <p>{row.original.products.length}</p>
    },
    {
      id: "actions",
      cell: ({ row }) => <Delete item="collection" id={row.original._id} />
    },
  ]

