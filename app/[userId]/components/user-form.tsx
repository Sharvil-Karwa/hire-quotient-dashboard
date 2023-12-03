"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { User } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { useOrigin } from "@/hooks/use-origin"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  id: z.string(),
  role: z.string(),
});

type UsersFormValues = z.infer<typeof formSchema>

interface UsersFormProps {
  initialData: User | any;
};

export const UsersForm: React.FC<UsersFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const title = initialData ? 'Edit user' : 'Create user';
  const description = initialData ? 'Edit a user.' : 'Add a new user';
  const toastMessage = initialData ? 'User updated.' : 'User created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<UsersFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: initialData?.name,
        email: initialData?.email,
        id: initialData?.id,
        role: initialData?.role
    },
  });
  

  const onSubmit = async (data: UsersFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.userId}`, {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role
        });
      } else {
        await axios.post(`/api/${params.userId}`, {
            id: data.id,
            email: data.email,
            name: data.name,
            role: data.role
        });
      }
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error('User already exists');
    } finally {
      setLoading(false);
      router.push(`/`)
    }
  };
  
  

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.userId}`);
      toast.success('User deleted.');
    } catch (error: any) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
      router.push(`/`);
    }
  }

  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="User name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="User name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="User name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="User name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};