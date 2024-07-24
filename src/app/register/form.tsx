"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  name: z.string().max(100, {
    message: "Name must be at maximum 100 characters.",
  }),
  jwc: z.string().max(3, {
    message: "JWC must be at least 6 characters.",
  }),
  ywc: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

export default function FormPage() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      jwc: "",
      ywc: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    const { username: email, password, name, jwc, ywc } = data;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, jwc, ywc }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Registration Successful", response);
      toast({ title: "Registration Successful" });
    } catch (error: any) {
      console.error("Registration Failed:", error);
      toast({ title: "Registration Failed", description: error.message });
    }
  };
  const jwc = Array.from({ length: 13 }, (_, index) => 13 - index);
  const ywc = Array.from({ length: 19 }, (_, index) => 19 - index);

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
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
                <Input placeholder="ชื่อเล่น" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jwc"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="รุ่น JWC (ถ้ามี)" />
                </SelectTrigger>
                <SelectContent {...field}>
                    {jwc.map((j) => (
                        <SelectItem key={j} value={j.toString()}>
                            JWC#{j}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          )}
        />
        <FormField
          control={form.control}
          name="ywc"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="รุ่น YWC (ถ้ามี)" />
                </SelectTrigger>
                <SelectContent {...field}>
                    {ywc.map((y) => (
                        <SelectItem key={y} value={y.toString()}>
                            YWC#{y}
                        </SelectItem>
                    ))}
                    <SelectItem key="0" value="0">
                        กรรมการสมาคมผู้ดูแลเว็บ
                    </SelectItem>
                </SelectContent>
            </Select>
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}