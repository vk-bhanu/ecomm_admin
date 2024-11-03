"use client"
import Delete from "@/components/custom ui/Delete"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import React from 'react'

export const columns: ColumnDef<OrderColumnType>[] = [
    {
      accessorKey: "_id",
      header: "Order",
      cell: ({ row }) => <Link href={`/orders/${row.original._id}`} className="hover: text-blue-400">{row.original._id}</Link>
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "totalAmmount",
        header: "Total Amount(₹)",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
  ]

