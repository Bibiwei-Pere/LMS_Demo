import { ColumnDef } from "@tanstack/react-table";
import { Check, Pen, Trash2, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { formatDate, formatDateShort, shortenText } from "@/lib/helpers";
import Image from "next/image";
import PDF from "../assets/pdf.svg";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import Link from "next/link";

export const BillingCol: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className='border border-gray-300'
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className='border border-gray-300'
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reference",
    header: "Invoice",
    cell: ({ row }) => (
      <div className='flex gap-2 items-center'>
        <Image src={PDF} alt='Pdf' width={500} height={500} className='w-[40px] h-[40px]' />
        <div className='font-medium'>{row.getValue("reference")}</div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Billing date",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return <p className='text-sm'>{`${formatDate(createdAt)}`}</p>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filterVariant: "select",
    },
    cell: ({ row }) => (
      <div className='capitalize'>
        {["Successful"].includes(row.getValue("status")) ? (
          <p className='py-1 max-w-[80px] px-2 border bg-gray-50 rounded-full text-sm flex gap-1 items-center'>
            <Check className='text-green-600 w-4 h-4' /> Paid
          </p>
        ) : (
          <p className='py-1 max-w-[90px] px-2 border bg-gray-50 rounded-full text-sm flex gap-1 items-center'>
            <X className='text-red-600 w-4 h-4' /> Failed
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <p className='text-sm'>{`₦${row.original.amount.toLocaleString("en-NG")}`}</p>;
    },
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => {
      console.log(row.original);
      return <p className='text-sm'>{row.getValue("plan")} plan</p>;
    },
  },

  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const navigation = useRouter();
  //     return (
  //       <div>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <MoreVertical className='cursor-pointer hover:text-red-700 h-4 w-4 text-black' />
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align='end'>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem onClick={() => navigation.push(`orders/${row.original.id}`)}>
  //               View Order
  //             </DropdownMenuItem>
  //             {/* <DropdownMenuItem>
  //               <DeleteOrder id={row?.original?.id} />
  //             </DropdownMenuItem> */}
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //     );
  //   },
  // },
];
