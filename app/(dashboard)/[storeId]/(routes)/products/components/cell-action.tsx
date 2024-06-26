"use client";

import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product Id copied to clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/products/${data.id}`
      );
      router.refresh();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="bg-white w-28 text-black shadow-md pl-3 space-y-2 py-3">
            <div>Actions</div>
            <div
              onClick={() => onCopy(data.id)}
              className="flex items-center cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </div>
            <div
              onClick={() =>
                router.push(`/${params.storeId}/products/${data.id}`)
              }
              className="flex items-center cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Update
            </div>
            <div
              onClick={() => setOpen(true)}
              className="flex items-center cursor-pointer"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
