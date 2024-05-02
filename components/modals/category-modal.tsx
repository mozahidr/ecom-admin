"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Billboard, Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import prismadb from "@/lib/prismadb";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3),
  billboardId: z.string().min(3),
});

export const billboards = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const billboard = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
};

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryModal: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {
  const categoryModal = useCategoryModal();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      billboardId: "",
    },
  });

  // OnSubmit
  const OnSubmit = async (data: CategoryFormValues) => {
    console.log(data);
    // Create store

    try {
      setLoading(true);
      const response = await axios.post("/api/stores", data);

      window.location.assign(`/${response.data.id}`);

      //toast.success("Store Created Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //

  return (
    <Modal
      title="Create Categories"
      description="Add a new store to manage products and categories"
      isOpen={categoryModal.isOpen}
      onClose={categoryModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...field}
                        placeholder="Category Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billboardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billboard</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a Billboard"
                          />
                        </SelectTrigger>
                      </FormControl>
                        <SelectContent>
                          {billboards && billboards.map((billboard) => (
                            <SelectItem value={billboard.id} key={billboard.id}>{billboard.label}</SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={categoryModal.onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
