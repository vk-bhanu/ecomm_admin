"use client"
import Delete from "@/components/custom ui/Delete"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import React from 'react'

export const columns: ColumnDef<OrderItemType>[] = [
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => <Link href={`/products/${row.original.product._id}`} className="hover: text-blue-400">{row.original.product.title}</Link>
    },
    {
      accessorKey: "color",
      header: "Size",
    },
    {
        accessorKey: "size",
        header: "Color",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
  ]

